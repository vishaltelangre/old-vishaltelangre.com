/* eslint-disable no-var */

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle-[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './static/index.ejs',
      // Inject any JavaScript into the bottom of the page, just before the closing </body> tag
      inject: 'body'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
