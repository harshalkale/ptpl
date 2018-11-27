var express = require('express'),
  loanApplication = express.Router(),
  loanApplicationTypes = require('./loan-application-types'),
  sections = require('./sections'),
  fields = require('./fields');

loanApplication.use('/loan-application-types', loanApplicationTypes);
loanApplication.use('/sections', sections);
loanApplication.use('/fields', fields);

module.exports = loanApplication;
