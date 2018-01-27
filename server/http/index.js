const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const http = apiEndpoints => {
  const app = express();
  const publicPath = express.static(path.join(__dirname, '../../public'));
  const nodeModules = express.static(
    path.join(__dirname, '../../node_modules')
  );

  app.use('/', publicPath);
  app.use('/libs', nodeModules);
  app.use(bodyParser.json());
  app.use(cors());
  return app;
};

module.exports = http;