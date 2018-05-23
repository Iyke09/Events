import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import swaggerJSDoc from 'swagger-jsdoc';

/* eslint-disable no-console */

const app = express();

const compiler = webpack(config);

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

if(process.env.NODE_ENV === 'production'){
  app.use('/static', express.static(path.resolve(__dirname, '..', 'client/dist')));
}
app.use('/api/v1', routes);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/api/v1/*', function(req, res) {
  res.status(404).send({message: 'what the???'});
});

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../client/index.html'));
});

module.exports = app;
