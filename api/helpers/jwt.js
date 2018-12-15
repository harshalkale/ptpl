const expressJwt = require('express-jwt');

// CONFIG
var config = require('../config.json')[process.env.NODE_ENV || 'development'];

module.exports = jwt;

function jwt() {
  const {
    SECRET
  } = config;
  return expressJwt({
    secret: SECRET
  }).unless({
    path: [
      '/api/auth/login'
    ]
  });
}
