# flockmeister
---

Have you ever heard the phrase "pecking order"? It's a real thing! Chickens are extremely sensitive
to their social order, and now you can make heads and tails of their sassy attitudes with
flockmeister, the only app of its kind, guaranteed!

Basically, this app takes as input some observational data about which chickens have pecked other
chickens, and then builds you a directed graph of their social hierarchy. In other words, it will
help you inductively identify the social order of your flock. See this demo:

![Screenshot of flockmeister in action](/../screenshots/screenshots/demo.gif?raw=true)

Poor Feathers! :(

---

## Code

Ok, so you didn't really come here to uncover the mysteries of the poultry world---you probably came
here to learn about the code. This app is a little fun project to keep the outer edges of my
full-stack toolset honest; namely, the latest and greatest in front-end technology, and some more
academic stuff written in haskell.

I don't get enough use of these skills during an average work day since I spend most of my time in
server-side ruby/rails. For the same reason, this app also stops just short of the database, since
databases are only really fun when you are dealing with hundreds of millions of rows (and even then
they are not that much fun).

From top to bottom, it features:

- Web and graphics design (incidentally, I do wear the main designer hat at my current job)
- A front-end written in React and Flux (via marty.js); also a chance to practice ES6 since I've
  spent most of my time in coffeescript
- Twitter bootstrap (sass-flavored, since we're dealing with chickens that have attitude!)
- Webpack, node, and friends (many thanks to [Justin Gordon's tutorial](https://github.com/justin808/react-webpack-rails-tutorial)
  for helping me transition from browserify and make sense of webpack in short order. I ended up
  enjoying the React Hot Loading, but passed on getting CSS to go through webpack as well---the
  sass ecosystem on node doesn't really feel like a first-class citizen)
- Ruby on Rails used as web server "glue"
- Haskell for [fgl](https://hackage.haskell.org/package/fgl) and [graphviz integration](https://hackage.haskell.org/package/graphviz)
  (see the `flockcharter/` dir for more info)


## Setup

This project is essentially a rails application with a front-end (`client/`) and a command-line
program (`flockcharter/`). Before you start, make sure you have all the dependencies:

1. Graphviz: `brew install graphviz`
2. [Haskell Platform](https://www.haskell.org/platform/)

To get running, do the usual package-manager incantations:

`bundle install`

`npm install`

This will let you get the rails server up and running via `rails s`. If you are doing development,
you may be interested in the react hot loader. `foreman start -f Procfile.dev` may be of use to you
in that case. It will put the react hot loader on localhost:4000 for rapid iteration (pretty bare
bones since it doesn't load CSS) and then you can see it come together at the usual `localhost:3000`
rails server.

To build the flockcharter binary, you need to compile from source. This should be pretty
straightforward if you know a bit of `cabal`. I usually work in a sandbox, so it looks like,

1. `cabal sandbox init`
2. `cabal install --only-dependencies` (this may take a while)
3. `cabal build` (this will put a compiled binary inside `dist/`)
4. cat your favorite json file (see `sample_input.json` for the format)
