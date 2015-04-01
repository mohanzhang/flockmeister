var bodyParser = require('body-parser');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.hot.config');
var sleep = require('sleep');

var server = new WebpackDevServer(webpack(config), {
  //contentBase: "/public",
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  stats: {colors: true}
});

server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended: true}));

server.listen(3000, 'localhost', function(err, result) {
  if (err) { console.log(err); }
  console.log('Listening at localhost:3000...');
});
