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

let swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '2.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
};

// options for the swagger docs
let options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/adminRouter.js'],
};

// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc(options);

const compiler = webpack(config);

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

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

// app.get('/swagger.json', function(req, res){
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerSpec);
// });

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../client/index.html'));
  console.log('running on development dev server!!!!');
});

module.exports = app;
