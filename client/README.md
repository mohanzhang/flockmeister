# flockmeister front-end

_Be sure to read the README in the root as well for more context. This document talks only about the javascript front-end._

---

This directory contains all the code in the react/flux front-end of the application. The structure follows that of [Justin Gordon's tutorial](https://github.com/justin808/react-webpack-rails-tutorial) on webpack, rails, and react.

To get started, if you haven't already run `npm install` in the root directory, you can run `npm install` in this directory to install all the node dependencies. If everything worked, you should be able to run `node server.js` to start the server on `localhost:4000`. This server will use the `webpack.hot.config.js` file to provide hot loading for react components. I chose to leave out support for css in the hot server because it wasn't obviously saving me very much time (sass recompiles were very slow).

If you want to follow the execution path for the hot server, start by looking at `index.html`, which provides an entry point. You'll notice that `express-bundle.js` is the output of the hot webpack config.


## Rails integration

The front-end integrates with rails via `client-bundle.js`, which is the output of the rails webpack config. This file is placed in `../app/assets/javascripts`, which can then be pulled in by rails.


## React and flux

The client entry point is `mount.jsx`, which uses jquery to render the root `<App />` element into the document at `#mount-app`. From there `<App />` just composes `Flock`, `PeckSelector`, and `Flockchart`.

I use marty.js for the flux implementation with the new ES6 features. There is nothing too controversial here, though you may be interested in knowing that the junction point with the Rails API lives in `sources/FlockchartAPI.jsx`.