var coreQueryBuilderService = require('../../../core/query-builder.js');
var sectionService = require('./service.js');

module.exports = {
  get: function(req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    sectionService.get(query, function(err, sections) {
      if (err) return res.status(400).send(err);
      return res.send(sections);
    });
  },
  dataTable: function(req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    sectionService.dataTable(query, function(
      err,
      sections
    ) {
      if (err) return res.status(400).send(err);
      return res.send(sections);
    });
  },
  add: function(req, res) {
    sectionService.add(req.body, function(
      err,
      section
    ) {
      if (err) return res.status(400).send(err);
      return res.send(section);
    });
  },
  update: function(req, res) {
    sectionService.update(req.body, function(
      err,
      section
    ) {
      if (err) return res.status(400).send(err);
      return res.send(section);
    });
  },
  remove: function(req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    sectionService.remove(query, function(
      err,
      section
    ) {
      if (err) return res.status(400).send(err);
      return res.send(section);
    });
  }
};
