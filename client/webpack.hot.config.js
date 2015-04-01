// Run like this:
// cd client && node server.js

var path = require("path");
var config = require("./webpack.common.config");
var webpack = require("webpack");

// We're using the bootstrap-sass loader.
// See: https://github.com/justin808/bootstrap-sass-loader
config.entry.push("webpack-dev-server/client?http://localhost:4000",
                  "webpack/hot/dev-server"); // custom bootstrap
config.output = { filename: "express-bundle.js", // this file is served directly by webpack
                  path: __dirname };
config.plugins = [ new webpack.HotModuleReplacementPlugin() ];
config.devtool = "eval-source-map";

// All the styling loaders only apply to hot-reload, not rails
config.module.loaders.push(
  { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ }
);

module.exports = config;
