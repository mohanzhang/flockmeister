// Common webpack configuration used by webpack.hot.config and webpack.rails.config.

var path = require("path");

module.exports = {
  context: __dirname, // the project dir
  entry: [ "./assets/javascripts/app" ],
  // In case you wanted to load jQuery from the CDN, this is how you would do it:
  // externals: {
  //   jquery: "var jQuery"
  // },
  resolve: {
    root: [path.join(__dirname, "scripts"),
           path.join(__dirname, "assets/javascripts")],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", "config.js"]
  },
  module: {
    loaders: []
  }
};
