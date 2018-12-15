// EXPRESS
var express = require('express'),
  api = express.Router();

// JWT
var jwt = require('./helpers/jwt');
api.use(jwt());

// MODULES
var auth = require('./modules/auth');
api.use('/auth', auth);

var configurations = require('./modules/configurations');
api.use('/configurations', configurations);

var security = require('./modules/security');
api.use('/security', security);

var loanApplications = require('./modules/loan-applications');
api.use('/loan-applications', loanApplications);

module.exports = api;
