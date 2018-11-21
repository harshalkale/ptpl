var express = require('express'),
  roles = express.Router(),
  roleController = require('./controller');

roles.get('/', roleController.get);
roles.post('/search', roleController.get);
roles.post('/data-table', roleController.dataTable);
roles.post('/', roleController.add);
roles.put('/', roleController.update);
roles.delete('/', roleController.remove);

module.exports = roles;
