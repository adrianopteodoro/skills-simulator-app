const webpack = require('webpack'); //eslint-disable-line
const webpackConfig = require('../../../webpack.config.js');
const webpackDev = require('webpack-dev-middleware'); //eslint-disable-line
const webpackHot = require('webpack-hot-middleware'); //eslint-disable-line

const compiler = webpack(webpackConfig);
const options = {
  noInfo: true,
  stats: 'minimal',
  publicPath: webpackConfig.output.publicPath,
};

const WebpackMiddleware = (app) => {
  const middlewareDev = webpackDev(compiler, options);
  const middlewareHot = webpackHot(compiler);
  app.use(middlewareDev);
  app.use(middlewareHot);
};

module.exports = WebpackMiddleware;
