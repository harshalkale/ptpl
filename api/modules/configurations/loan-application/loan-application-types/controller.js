var coreQueryBuilderService = require('../../../core/query-builder.js');
var loanApplicationTypeService = require('./service.js');

module.exports = {
  get: function(req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    loanApplicationTypeService.get(query, function(err, loanApplicationTypes) {
      if (err) return res.status(400).send(err);
      return res.send(loanApplicationTypes);
    });
  },
  dataTable: function(req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    loanApplicationTypeService.dataTable(query, function(
      err,
      loanApplicationTypes
    ) {
      if (err) return res.status(400).send(err);
      return res.send(loanApplicationTypes);
    });
  },
  add: function(req, res) {
    loanApplicationTypeService.add(req.body, function(
      err,
      loanApplicationType
    ) {
      if (err) return res.status(400).send(err);
      return res.send(loanApplicationType);
    });
  },
  update: function(req, res) {
    loanApplicationTypeService.update(req.body, function(
      err,
      loanApplicationType
    ) {
      if (err) return res.status(400).send(err);
      return res.send(loanApplicationType);
    });
  },
  remove: function(req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    loanApplicationTypeService.remove(query, function(
      err,
      loanApplicationType
    ) {
      if (err) return res.status(400).send(err);
      return res.send(loanApplicationType);
    });
  }
};
