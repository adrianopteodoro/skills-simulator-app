const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const isInProduction = process.env.NODE_ENV === 'production';

const addApiHandlingTo = ({ app, endpoints }) => {
  router.initializeUsing(endpoints);
  app.use('/api/v1', router.get());
};

const publicDir = path.join(__dirname, '../../public');
const appDir = path.join(__dirname, '../../app');

const http = (apiEndpoints) => {
  const app = express();
  const publicPath = express.static(publicDir);
  const nodeMods = express.static(path.join(__dirname, '../../node_modules'));

  app.use('/', publicPath);
  app.use('/libs', nodeMods);
  app.use(bodyParser.json());

  app.set('view engine', 'pug');
  const viewsProd = path.join(publicDir, 'views');
  const viewsDev = path.join(appDir, 'views/development');
  const viewsPath = (isInProduction) ? viewsProd : viewsDev;
  app.set('views', viewsPath);
  app.set('views', viewsPath);

  // Handling apis request
  addApiHandlingTo({
    app,
    endpoints: apiEndpoints,
  });

  // Adding webpack middleware dev mode only
  if (!isInProduction) {
    require('../middlewares/webpack')(app); //eslint-disable-line
  }

  app.get('/:page?', (_, res) => res.render('index'));

  return app;
};

module.exports = http;
