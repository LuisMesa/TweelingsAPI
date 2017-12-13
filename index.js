const server = require('server');
const middleware = require('./middleware')
const router= require('./api/router');

server(
  middleware,
  router
);