const fs = require('fs');
const logger = require('../logger');

const loadEndpointFromFile = (filename) => {
  try {
    const fileEndpoints = require(`./${filename}`); //eslint-disable-line
    return fileEndpoints;
  } catch (error) {
    logger.error(error);
    return [];
  }
};

const getEndpoints = () => {
  const flattenBase = (array, endpoint) => array.concat(endpoint);
  try {
    const files = fs.readdirSync(__dirname);
    const filesWithNoIndex = files.filter(file => file !== 'index.js');

    const endpoints = filesWithNoIndex
      .map(loadEndpointFromFile)
      .reduce(flattenBase, []);

    return endpoints;
  } catch (error) {
    logger.error(error);
    return [];
  }
};

module.exports = getEndpoints;
