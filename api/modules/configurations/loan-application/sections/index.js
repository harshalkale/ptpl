var express = require('express'),
  sections = express.Router(),
  sectionController = require('./controller');

sections.get('/', sectionController.get);
sections.post('/search', sectionController.get);
sections.post('/data-table', sectionController.dataTable);
sections.post('/', sectionController.add);
sections.put('/', sectionController.update);
sections.delete('/', sectionController.remove);

module.exports = sections;
