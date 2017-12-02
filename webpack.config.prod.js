let path = require('path');
let webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './client/src/index.js')
  ],
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '\'production\'',
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        warnings: false
      }
    })

  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      include: path.join(__dirname, 'client/src'),
      loaders: ['babel-loader']
    },
    // CSS
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
      }),
    }
    ]
  }
};
