var express = require('express'),
  fields = express.Router(),
  fieldController = require('./controller');

fields.get('/', fieldController.get);
fields.post('/search', fieldController.get);
fields.post('/data-table', fieldController.dataTable);
fields.post('/', fieldController.add);
fields.put('/', fieldController.update);
fields.delete('/', fieldController.remove);

module.exports = fields;
