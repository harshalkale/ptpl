var ObjectId = require('mongoose').Types.ObjectId;
var LoanApplications = require('./model.js');
var Audit = require('../core/logs/audit/service.js');
var Exception = require('../core/logs/exception/service.js');

var populates = [{
  path: 'loanApplicationType',
  match: {
    active: true,
    deleted: false
  }
}];

module.exports = {
  get: function (query, callback) {
    var select,
      limit,
      skip,
      sort = {
        name: 1,
        _id: 1
      },
      lean = false;
    if (query._select) select = query._select;
    if (query._limit) limit = query._limit;
    if (query._skip) skip = query._skip;
    if (query._sort) sort = query._sort;
    if (query._lean) lean = query._lean;
    if (query._where) query = query._where;
    if (typeof query.deleted == 'undefined') query.deleted = false;
    var dbQuery = LoanApplications.find(query);
    if (select) dbQuery.select(select);
    if (sort) dbQuery.sort(sort);
    if (limit) dbQuery.limit(limit);
    if (skip) dbQuery.skip(skip);
    if (lean) dbQuery = dbQuery.lean();

    if (populates && populates.length) {
      populates.forEach(function (populate) {
        dbQuery.populate(populate);
      });
    }

    dbQuery.exec(callback);
  },
  add: function (loanApplicationData, callback) {
    var by = {
      by: undefined
    };
    if (loanApplicationData.created) by.by = loanApplicationData.created.by || undefined;
    LoanApplications.create(loanApplicationData, function (err, loanApplication) {
      if (err) {
        console.log(err);
        Exception.log(
          'LOAN APPLICATION',
          'ADD',
          'Loan Application add Error',
          err,
          by.by,
          function (err) {
            if (err) console.log(err);
          }
        );
        return callback(err);
      }
      if (!loanApplication)
        return callback(null, false, {
          message: 'Loan Application not found'
        });
      Audit.log('LOAN APPLICATION', 'ADD', 'Loan Application added', loanApplication, by.by, function (
        err
      ) {
        if (err) console.log(err);
      });
      return callback(null, loanApplication);
    });
  },
  dataTable: function (query, callback) {
    var options = {
      conditions: query.conditions || {}
    };
    var colLoanApplicationType = query.columns.find(function (column) {
      return column.data === 'loanApplicationType._id';
    });
    if (
      colLoanApplicationType &&
      colLoanApplicationType.search &&
      colLoanApplicationType.search.value !== ''
    ) {
      options.conditions['loanApplicationType'] = {
        $in: colLoanApplicationType.search.value
          .split(',')
          .map(id => ObjectId(id))
      };
    }
    if (!options.conditions.deleted) options.conditions.deleted = false;
    LoanApplications.dataTable(query, options, callback);
  },
  update: function (loanApplicationData, callback) {
    var by = {
      by: undefined
    };
    if (loanApplicationData.updated) by.by = loanApplicationData.updated.by || undefined;
    LoanApplications.findByIdAndUpdate(loanApplicationData._id, loanApplicationData, function (
      err,
      loanApplication
    ) {
      if (err) {
        console.log(err);
        Exception.log(
          'LOAN APPLICATION',
          'UPDATE',
          'Loan Application Update Error',
          err,
          by.by,
          function (err) {
            if (err) console.log(err);
          }
        );
        return callback(err);
      }
      Audit.log(
        'LOAN APPLICATION',
        'UPDATE',
        'Loan Application Updated',
        loanApplication,
        by.by,
        function (err) {
          if (err) console.log(err);
        }
      );
      return callback(null, loanApplication);
    });
  },
  remove: function (loanApplicationData, callback) {
    var by = {
      by: undefined
    };
    if (loanApplicationData.updated) by.by = loanApplicationData.updated.by || undefined;
    loanApplicationData.deleted = true;
    LoanApplications.findByIdAndUpdate(
      loanApplicationData._id, {
        $set: {
          deleted: true
        }
      },
      function (err, loanApplication) {
        if (err) {
          console.log(err);
          Exception.log(
            'LOAN APPLICATION',
            'DELETE',
            'Loan Application Delete Error',
            err,
            by.by,
            function (err) {
              if (err) console.log(err);
            }
          );
          return callback(err);
        }
        Audit.log(
          'LOAN APPLICATION',
          'DELETE',
          'Loan Application Deleted',
          loanApplication,
          by.by,
          function (err) {
            if (err) console.log(err);
          }
        );
        return callback(null, loanApplication);
      }
    );
  }
};
