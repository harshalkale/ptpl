var LoanApplicationTypes = require('./model.js');
var Audit = require('../../../core/logs/audit/service.js');
var Exception = require('../../../core/logs/exception/service.js');

module.exports = {
  get: function(query, callback) {
    var select,
      limit,
      skip,
      sort = { name: 1, _id: 1 },
      lean = false;
    if (query._select) select = query._select;
    if (query._limit) limit = query._limit;
    if (query._skip) skip = query._skip;
    if (query._sort) sort = query._sort;
    if (query._lean) lean = query._lean;
    if (query._where) query = query._where;
    if (typeof query.deleted == 'undefined') query.deleted = false;
    var dbQuery = LoanApplicationTypes.find(query);
    if (select) dbQuery.select(select);
    if (sort) dbQuery.sort(sort);
    if (limit) dbQuery.limit(limit);
    if (skip) dbQuery.skip(skip);
    if (lean) dbQuery = dbQuery.lean();
    dbQuery.exec(callback);
  },
  add: function(loanApplicationTypeData, callback) {
    var by = { by: undefined };
    if (loanApplicationTypeData.created)
      by.by = loanApplicationTypeData.created.by || undefined;
    LoanApplicationTypes.create(loanApplicationTypeData, function(
      err,
      loanApplicationType
    ) {
      if (err) {
        console.log(err);
        Exception.log(
          'LOAN_APPLICATION_TYPE',
          'ADD',
          'Loan Application Type add Error',
          err,
          by.by,
          function(err) {
            if (err) console.log(err);
          }
        );
        return callback(err);
      }
      if (!loanApplicationType)
        return callback(null, false, {
          message: 'Loan Application Type not found'
        });
      Audit.log(
        'LOAN_APPLICATION_TYPE',
        'ADD',
        'Loan Application Type added',
        loanApplicationType,
        by.by,
        function(err) {
          if (err) console.log(err);
        }
      );
      return callback(null, loanApplicationType);
    });
  },
  dataTable: function(query, callback) {
    var options = { conditions: query.conditions || {} };
    if (!options.conditions.deleted) options.conditions.deleted = false;
    LoanApplicationTypes.dataTable(query, options, callback);
  },
  update: function(loanApplicationTypeData, callback) {
    var by = { by: undefined };
    if (loanApplicationTypeData.updated)
      by.by = loanApplicationTypeData.updated.by || undefined;
    LoanApplicationTypes.findByIdAndUpdate(
      loanApplicationTypeData._id,
      loanApplicationTypeData,
      function(err, loanApplicationType) {
        if (err) {
          console.log(err);
          Exception.log(
            'LOAN_APPLICATION_TYPE',
            'UPDATE',
            'Loan Application Type Update Error',
            err,
            by.by,
            function(err) {
              if (err) console.log(err);
            }
          );
          return callback(err);
        }
        Audit.log(
          'LOAN_APPLICATION_TYPE',
          'UPDATE',
          'Loan Application Type Updated',
          loanApplicationType,
          by.by,
          function(err) {
            if (err) console.log(err);
          }
        );
        return callback(null, loanApplicationType);
      }
    );
  },
  remove: function(loanApplicationTypeData, callback) {
    var by = { by: undefined };
    if (loanApplicationTypeData.updated)
      by.by = loanApplicationTypeData.updated.by || undefined;
    loanApplicationTypeData.deleted = true;
    LoanApplicationTypes.findByIdAndUpdate(
      loanApplicationTypeData._id,
      { $set: { deleted: true } },
      function(err, loanApplicationType) {
        if (err) {
          console.log(err);
          Exception.log(
            'LOAN_APPLICATION_TYPE',
            'DELETE',
            'Loan Application Type Delete Error',
            err,
            by.by,
            function(err) {
              if (err) console.log(err);
            }
          );
          return callback(err);
        }
        Audit.log(
          'LOAN_APPLICATION_TYPE',
          'DELETE',
          'Loan Application Type Deleted',
          loanApplicationType,
          by.by,
          function(err) {
            if (err) console.log(err);
          }
        );
        return callback(null, loanApplicationType);
      }
    );
  }
};
