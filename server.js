/* eslint-disable no-var, strict */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var devServer = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
});


devServer.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});
