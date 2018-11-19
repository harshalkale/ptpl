var coreQueryBuilderService = require('../core/query-builder.js');
var loanApplicationService = require('./service.js');

module.exports = {
    get: function(req, res) {
        var query = coreQueryBuilderService.buildQuery(req);
        loanApplicationService.get(query, function(err, loanApplications) {
            if (err) return res.status(400).send(err);
            return res.send(loanApplications);
        });
    },
    dataTable: function(req, res) {
        var query = coreQueryBuilderService.buildQuery(req);
        loanApplicationService.dataTable(query, function(err, loanApplications) {
            if (err) return res.status(400).send(err);
            return res.send(loanApplications);
        });
    },
    add: function(req, res) {
        loanApplicationService.add(req.body, function(err, loanApplication) {
            if (err) return res.status(400).send(err);
            return res.send(loanApplication);
        });
    },
    update: function(req, res) {
        loanApplicationService.update(req.body, function(err, loanApplication) {
            if (err) return res.status(400).send(err);
            return res.send(loanApplication);
        });
    },
    remove: function(req, res) {
        loanApplicationService.remove(req.body, function(err, loanApplication) {
            if (err) return res.status(400).send(err);
            return res.send(loanApplication);
        });
    }
};
