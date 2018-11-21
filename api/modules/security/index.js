var express = require('express'),
  security = express.Router(),
  roles = require('./roles'),
  users = require('./users');

security.use('/roles', roles);
security.use('/users', users);

module.exports = security;
