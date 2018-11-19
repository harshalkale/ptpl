var express = require('express'),
  configurations = express.Router(),
  loanApplication = require('./loan-application');

configurations.use('/loan-application', loanApplication);

module.exports = configurations;
