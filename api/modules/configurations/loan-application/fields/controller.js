var coreQueryBuilderService = require('../../../core/query-builder.js');
var fieldService = require('./service.js');

module.exports = {
  get: function(req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    fieldService.get(query, function(err, fields) {
      if (err) return res.status(400).send(err);
      return res.send(fields);
    });
  },
  dataTable: function(req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    fieldService.dataTable(query, function(
      err,
      fields
    ) {
      if (err) return res.status(400).send(err);
      return res.send(fields);
    });
  },
  add: function(req, res) {
    fieldService.add(req.body, function(
      err,
      field
    ) {
      if (err) return res.status(400).send(err);
      return res.send(field);
    });
  },
  update: function(req, res) {
    fieldService.update(req.body, function(
      err,
      field
    ) {
      if (err) return res.status(400).send(err);
      return res.send(field);
    });
  },
  remove: function(req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    fieldService.remove(query, function(
      err,
      field
    ) {
      if (err) return res.status(400).send(err);
      return res.send(field);
    });
  }
};
