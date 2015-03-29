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
-- you're on mac), which will render the graph we made as a png. And that's it!


import qualified Data.Map as M
import Data.Maybe
import Data.Text.Lazy (Text, pack, unpack)

import Data.Aeson

import Data.Graph.Inductive.Graph
import Data.Graph.Inductive.PatriciaTree
import Data.GraphViz
import Data.GraphViz.Printing (toDot, renderDot)

import System.FilePath

data PeckData =
  PeckData { name :: Text
           , pecks :: [Text] }

peckingOrder =
  [
    PeckData { name = "Ella", pecks = [] }
  , PeckData { name = "Buff", pecks = ["Ella"] }
  ]

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
      let dotGraph = graphToDot params graph
      createImageInDir "/Users/mohanzhang/tmp" "output" Png dotGraph
      return ()
    else quitWithoutGraphviz "It appears you do not have graphviz installed"


-- Thanks to http://haroldcarr.com/posts/2014-02-28-using-graphviz-via-haskell.html
params :: GraphvizParams n Text () () Text
params = nonClusteredParams { fmtNode = simpleNodeLabel }
  where simpleNodeLabel (_,l) = [textLabel l]

createImageInDir :: PrintDotRepr dg n => FilePath -> FilePath -> GraphvizOutput -> dg n -> IO FilePath
createImageInDir d n o g = Data.GraphViz.addExtension (runGraphvizCommand Dot g) o (combine d n)
