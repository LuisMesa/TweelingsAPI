const server = require('server');
const { get, post } = server.router;
const { render, json } = server.reply;
const thing1 = require('./tweelings/tweelings');

const router = [
  get('/', render('../public/index.html')),
  thing1.all
]

module.exports = router;