var express = require('express'),
  auth = express.Router(),
  authController = require('./controller');

auth.post('/login', authController.login);

module.exports = auth;
