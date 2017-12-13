const server = require('server');
const { modern } = server.utils;

module.exports = [
  modern(require('cors')()),
  
];