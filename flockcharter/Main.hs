{-# LANGUAGE OverloadedStrings, DeriveGeneric #-}

-- If you're new to haskell, here's a brief run-down of how this simple program works:
--
-- The input is expected to be some JSON string passed in on the commandline. The structure of this
-- JSON should look something like
-- [
--  {"name": "chicken name", "pecks": ["chicken name 2", "chicken name 3"]},
--  ..
-- ]
--
-- aeson is a library that takes care of this for us, and with a bit of magic, PeckData will be
-- generated from this JSON input.
--
-- Next, the excellent graph library 'fgl' helps us transform this data into a graph representation
-- (I have chosen to build the graph inductively) by folding a merge function over what fgl calls
-- "Contexts" (the documentation is excellent, so just read that if you're fully intent on
-- understanding how this bit works).
--
-- Finally, the graphviz package provides an interface to dot (which you can install via homebrew if
-- you're on mac), which will render the graph we made as a png and write its base64 encoded value
-- on stdout. And that's it!

import Control.Applicative((<$>))
import GHC.Generics

import qualified Data.Map as M
import Data.Maybe
import Data.Text.Lazy (Text, pack, unpack)
import qualified Data.ByteString.Char8 as BS
import qualified Data.ByteString.Base64 as BS64

import Data.Aeson

import Data.Graph.Inductive.Graph
import Data.Graph.Inductive.PatriciaTree
import Data.GraphViz
import Data.GraphViz.Printing (toDot, renderDot)

import System.Environment (getArgs)
import System.FilePath
import System.IO.Temp (withSystemTempDirectory)
import System.FilePath ((</>))
import System.Exit

data PeckData =
  PeckData { name :: Text
           , pecks :: [Text] } deriving (Show, Generic)

instance FromJSON PeckData
instance ToJSON PeckData

buildGraph :: [PeckData] -> Gr Text ()
buildGraph peckingOrder = graph
  where
    nodeLookup :: M.Map Text Node
    nodeLookup = M.fromList $ zip (map name peckingOrder) [0..]

    -- fromJust is generally dangerous, but since we construct our own node lookup map with
    -- self-assigned integers, we can be sure that the lookups will succeed
    contexts :: [Context Text ()]
    contexts = map mkContext peckingOrder
      where
        adjFromPecks pecks = zip (repeat ()) (map (fromJust . (flip M.lookup nodeLookup)) pecks)

        mkContext (PeckData { name=name, pecks=pecks }) =
          ([], fromJust $ M.lookup name nodeLookup, name, adjFromPecks pecks)

    graph :: Gr Text ()
    graph = foldr (&) empty contexts


main :: IO ()
main = do
  canGraphviz <- isGraphvizInstalled
  if canGraphviz
    then do
      inputString <- BS.getContents
      case eitherDecodeStrict inputString of
        Left err -> do
          putStrLn "Error reading input:"
          BS.putStrLn inputString
          putStrLn err
          exitFailure
        Right peckingOrder -> do
          let dotGraph = graphToDot params $ buildGraph peckingOrder
          base64Data <- base64ImageData dotGraph
          BS.putStr base64Data
          exitSuccess
    else quitWithoutGraphviz "It appears you do not have graphviz installed"

base64ImageData :: PrintDotRepr dg n => dg n -> IO BS.ByteString
base64ImageData dotGraph =
  withSystemTempDirectory "flockcharter" (\dir -> do
    createImageInDir dir "output" Png dotGraph
    binData <- BS.readFile (dir </> "output.png")
    return $ BS64.encode binData
  )

params :: GraphvizParams n Text () () Text
params = nonClusteredParams { fmtNode = simpleNodeLabel }
  where simpleNodeLabel (_,l) = [textLabel l]

-- Thanks to http://haroldcarr.com/posts/2014-02-28-using-graphviz-via-haskell.html
createImageInDir :: PrintDotRepr dg n => FilePath -> FilePath -> GraphvizOutput -> dg n -> IO FilePath
createImageInDir d n o g = Data.GraphViz.addExtension (runGraphvizCommand Dot g) o (combine d n)
