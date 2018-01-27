// app.js
const port = process.env.PORT || 8080;
const endpoints = require('./endpoints');

const httpEndpoints = endpoints.filter(endpoint => endpoint.http);

const httpServer = require('./server/http')(httpEndpoints);

httpServer.listen(port, () => {
  console.log(`HTTP SERVER => Listening at http://localhost:${port}`);
});
