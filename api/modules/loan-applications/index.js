var express = require('express'),
  loanApplications = express.Router(),
  loanApplicationController = require('./controller');

loanApplications.get('/', loanApplicationController.get);
loanApplications.post('/', loanApplicationController.add);
loanApplications.put('/', loanApplicationController.update);

module.exports = loanApplications;
