const port = process.env.PORT || 8080;
const endpoints = require('./endpoints')();
const logger = require('./logger');
const chalk = require('chalk');

const httpEndpoints = endpoints.filter(endpoint => endpoint.http);

const httpServer = require('./http')(httpEndpoints);

httpServer.listen(port, () => {
  const host = chalk.yellow(`http://localhost:${port}`);
  const type = chalk.red('HTTP SERVER');
  logger.info(`${type} => Listening at ${host}`);
});
