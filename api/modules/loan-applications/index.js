var express = require('express'),
  loanApplications = express.Router(),
  loanApplicationController = require('./controller');

loanApplications.get('/', loanApplicationController.get);
loanApplications.post('/search', loanApplicationController.get);
loanApplications.post('/data-table', loanApplicationController.dataTable);
loanApplications.post('/', loanApplicationController.add);
loanApplications.put('/', loanApplicationController.update);
loanApplications.delete('/', loanApplicationController.remove);

module.exports = loanApplications;
