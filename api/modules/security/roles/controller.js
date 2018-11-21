var coreQueryBuilderService = require('../../core/query-builder.js');
var roleService = require('./service.js');

module.exports = {
  get: function(req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    roleService.get(query, function(err, roles) {
      if (err) return res.status(400).send(err);
      return res.send(roles);
    });
  },
  dataTable: function(req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    roleService.dataTable(query, function(
      err,
      roles
    ) {
      if (err) return res.status(400).send(err);
      return res.send(roles);
    });
  },
  add: function(req, res) {
    roleService.add(req.body, function(
      err,
      role
    ) {
      if (err) return res.status(400).send(err);
      return res.send(role);
    });
  },
  update: function(req, res) {
    roleService.update(req.body, function(
      err,
      role
    ) {
      if (err) return res.status(400).send(err);
      return res.send(role);
    });
  },
  remove: function(req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    roleService.remove(query, function(
      err,
      role
    ) {
      if (err) return res.status(400).send(err);
      return res.send(role);
    });
  }
};
