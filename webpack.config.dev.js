import webpack from 'webpack';
import path from 'path';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

export default {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, './client/src/index.js')
  ],
  output: {
    path: __dirname + 'client/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'client/src')
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client/src'),
        loaders: ['babel-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader','css-loader', 'sass-loader']
      }
    ]
  }
};
