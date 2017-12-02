import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const app = express();

const compiler = webpack(config);

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static(path.join(__dirname, 'public')));

if(process.env.NODE_ENV === 'production'){
  app.use('/static', express.static(path.resolve(__dirname, '..', 'client/dist')));
  console.log('running on production dev server!!!!');
}
app.use('/api/v1', routes);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../client/index.html'));
  console.log('running on development dev server!!!!');
});

module.exports = app;
