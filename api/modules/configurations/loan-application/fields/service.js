var ObjectId = require('mongoose').Types.ObjectId;
var Fields = require('./model.js');
var Audit = require('../../../core/logs/audit/service.js');
var Exception = require('../../../core/logs/exception/service.js');

var populates = [{
  path: 'section',
  match: {
    active: true,
    deleted: false
  },
  populate: {
    path: 'loanApplicationTypes',
    match: {
      active: true,
      deleted: false
    }
  }
}, {
  path: 'loanApplicationTypes',
  match: {
    active: true,
    deleted: false
  }
}, {
  path: 'options.scores.loanApplicationType',
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
    var dbQuery = Fields.find(query);
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
  add: function (fieldData, callback) {
    var by = {
      by: undefined
    };
    if (fieldData.created) by.by = fieldData.created.by || undefined;
    Fields.create(fieldData, function (err, field) {
      if (err) {
        console.log(err);
        Exception.log(
          'FIELD',
          'ADD',
          'Field add Error',
          err,
          by.by,
          function (err) {
            if (err) console.log(err);
          }
        );
        return callback(err);
      }
      if (!field)
        return callback(null, false, {
          message: 'Field not found'
        });
      Audit.log('FIELD', 'ADD', 'Field added', field, by.by, function (
        err
      ) {
        if (err) console.log(err);
      });
      return callback(null, field);
    });
  },
  dataTable: function (query, callback) {
    var options = {
      conditions: query.conditions || {}
    };

    // loan application types filter
    var colLoanApplicationTypeIds = query.columns.find(function (column) {
      return column.data === 'loanApplicationTypes._id';
    });
    if (
      colLoanApplicationTypeIds &&
      colLoanApplicationTypeIds.search &&
      colLoanApplicationTypeIds.search.value !== ''
    ) {
      options.conditions['loanApplicationTypes'] = {
        $in: colLoanApplicationTypeIds.search.value
          .split(',')
          .map(id => ObjectId(id))
      };
    }

    // section filter
    var colSection = query.columns.find(function (column) {
      return column.data === 'section._id';
    });
    if (
      colSection &&
      colSection.search &&
      colSection.search.value !== ''
    ) {
      options.conditions['section'] = {
        $in: colSection.search.value
          .split(',')
          .map(id => ObjectId(id))
      };
    }

    if (!options.conditions.deleted) options.conditions.deleted = false;
    Fields.dataTable(query, options, callback);
  },
  update: function (fieldData, callback) {
    var by = {
      by: undefined
    };
    if (fieldData.updated) by.by = fieldData.updated.by || undefined;
    Fields.findByIdAndUpdate(fieldData._id, fieldData, function (
      err,
      field
    ) {
      if (err) {
        console.log(err);
        Exception.log(
          'FIELD',
          'UPDATE',
          'Field Update Error',
          err,
          by.by,
          function (err) {
            if (err) console.log(err);
          }
        );
        return callback(err);
      }
      Audit.log(
        'FIELD',
        'UPDATE',
        'Field Updated',
        field,
        by.by,
        function (err) {
          if (err) console.log(err);
        }
      );
      return callback(null, field);
    });
  },
  remove: function (fieldData, callback) {
    var by = {
      by: undefined
    };
    if (fieldData.updated) by.by = fieldData.updated.by || undefined;
    fieldData.deleted = true;
    Fields.findByIdAndUpdate(
      fieldData._id, {
        $set: {
          deleted: true
        }
      },
      function (err, field) {
        if (err) {
          console.log(err);
          Exception.log(
            'FIELD',
            'DELETE',
            'Field Delete Error',
            err,
            by.by,
            function (err) {
              if (err) console.log(err);
            }
          );
          return callback(err);
        }
        Audit.log(
          'FIELD',
          'DELETE',
          'Field Deleted',
          field,
          by.by,
          function (err) {
            if (err) console.log(err);
          }
        );
        return callback(null, field);
      }
    );
  }
};
