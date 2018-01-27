const express = require('express');
const logger = require('../logger');

const router = express.Router();

const handleRequest = async ({ input, res, method }) => {
  try {
    const result = await method(input);
    if (!result) {
      res.status(404);
      return;
    }
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.json({ error: 'internal_server_error' });
  }
};

const createRoute = (endpoint) => {
  const { route, http } = endpoint;

  // As delete is a special world in javascript let's we are using deleteHttp instead.
  // Notice that at the moment we are strictly working just with get and post verbs, so no further implementation was done.
  const { get, post } = http;

  if (get) {
    const getHandler = (req, res) =>
      handleRequest({
        // keep in mind that if any parameter named session, it will be overwritten.
        input: Object.assign({}, req.query, req.params, { session: req.user }),
        res,
        method: get,
      });
    router.get(route, getHandler);
  }

  if (post) {
    const getHandler = (req, res) =>
      handleRequest({
        input: Object.assign({}, req.body, { session: req.user }),
        res,
        method: post,
      });
    router.post(route, getHandler);
  }
};

module.exports = {
  initializeUsing: endpoints => endpoints.forEach(createRoute),
  get: () => router,
};
