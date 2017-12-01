let path = require('path');
let webpack = require('webpack');

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
      test: /\.styl$/,
      include: path.join(__dirname, 'client/src'),
      loader: 'style-loader!css-loader!stylus-loader'
    }
    ]
  }
};
