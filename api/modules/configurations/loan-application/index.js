var express = require('express'),
  loanApplication = express.Router(),
  loanApplicationTypes = require('./loan-application-types'),
  sections = require('./sections');

loanApplication.use('/loan-application-types', loanApplicationTypes);
loanApplication.use('/sections', sections);

module.exports = loanApplication;
