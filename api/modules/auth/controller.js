var coreQueryBuilderService = require('../core/query-builder');
var authService = require('./service');

module.exports = {
  login: function (req, res) {
    var query = coreQueryBuilderService.buildQuery(req);
    authService.login(query, function (err, auth, info) {
      if (err) return res.status(400).send(err);
      if (info) return res.status(401).send({
        message: info
      });
      return res.send(auth);
    });
  }
};
