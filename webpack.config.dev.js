import webpack from 'webpack';
import path from 'path';

export default {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill', // necessary for hot reloading with IE
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client/src'),
         loaders: ['babel-loader']},
      {
        test: /\.css?$/,
        loaders: ['style-loader', 'css-loader'],
        include: __dirname
      },
    ]
  }
};
