var coreQueryBuilderService = require('../../core/query-builder.js');
var userService = require('./service.js');

module.exports = {
  get: function (req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    userService.get(query, function (err, users) {
      if (err) return res.status(400).send(err);
      return res.send(users);
    });
  },
  dataTable: function (req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    userService.dataTable(query, function (
      err,
      users
    ) {
      if (err) return res.status(400).send(err);
      return res.send(users);
    });
  },
  add: function (req, res) {
    userService.add(req.body, function (
      err,
      user
    ) {
      if (err) return res.status(400).send(err);
      return res.send(user);
    });
  },
  update: function (req, res) {
    userService.update(req.body, function (
      err,
      user
    ) {
      if (err) return res.status(400).send(err);
      return res.send(user);
    });
  },
  remove: function (req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    userService.remove(query, function (
      err,
      user
    ) {
      if (err) return res.status(400).send(err);
      return res.send(user);
    });
  }
};
