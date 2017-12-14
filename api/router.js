const server = require('server');
const { get, post } = server.router;
const { render, json } = server.reply;
const tweelings = require('./tweelings/tweelings');

const router = [
  get('/', render('../public/index.html')),
  ...tweelings
]

module.exports = router;