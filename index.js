const server = require('server');
require('dotenv').config();
const middleware = require('./middleware')
const router = require('./api/router');

server(
  middleware,
  router
);