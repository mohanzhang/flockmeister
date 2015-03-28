{-# LANGUAGE OverloadedStrings, DeriveGeneric #-}

import qualified Data.Map as M
import Data.Maybe

import Data.Aeson

import Data.Graph.Inductive.Graph
import Data.Graph.Inductive.PatriciaTree
import Data.GraphViz

data PeckData =
  PeckData { name :: String
           , pecks :: [String] }

peckingOrder =
  [
    PeckData { name = "Ella", pecks = [] }
  , PeckData { name = "Buff", pecks = ["Ella"] }
  ]

nodeLookup :: M.Map String Node
nodeLookup = M.fromList $ zip (map name peckingOrder) [0..]

-- fromJust is generally dangerous, but since we construct our own node lookup
-- map with self-assigned integers, we can be sure that the lookups will
-- succeed
contexts :: [Context String ()]
contexts = map mkContext peckingOrder
  where
    adjFromPecks pecks =
      zip (repeat ()) (map (fromJust . (flip M.lookup nodeLookup)) pecks)

    mkContext (PeckData { name=name, pecks=pecks }) =
      ([], fromJust $ M.lookup name nodeLookup, name, adjFromPecks pecks)

graph :: Gr String ()
graph = foldr (&) empty contexts

main :: IO ()
main = do
  canGraphviz <- isGraphvizInstalled
  if canGraphviz
    then putStrLn "hello"
    else quitWithoutGraphviz "It appears you do not have graphviz installed"
