var express = require('express'),
  loanApplicationTypes = express.Router(),
  loanApplicationTypeController = require('./controller');

loanApplicationTypes.get('/', loanApplicationTypeController.get);
loanApplicationTypes.post('/search', loanApplicationTypeController.get);
loanApplicationTypes.post('/data-table', loanApplicationTypeController.dataTable);
loanApplicationTypes.post('/', loanApplicationTypeController.add);
loanApplicationTypes.put('/', loanApplicationTypeController.update);
loanApplicationTypes.delete('/', loanApplicationTypeController.remove);

module.exports = loanApplicationTypes;
