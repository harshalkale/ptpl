var ObjectId = require('mongoose').Types.ObjectId;
var Sections = require('./model.js');
var Audit = require('../../../core/logs/audit/service.js');
var Exception = require('../../../core/logs/exception/service.js');

var populates = [
  {
    path: 'loanApplicationTypes',
    match: {
      active: true,
      deleted: false
    }
  }
];

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
    var dbQuery = Sections.find(query);
    if (select) dbQuery.select(select);
    if (sort) dbQuery.sort(sort);
    if (limit) dbQuery.limit(limit);
    if (skip) dbQuery.skip(skip);
    if (lean) dbQuery = dbQuery.lean();

    if (populates && populates.length) {
      populates.forEach(function(populate) {
        dbQuery.populate(populate);
      });
    }

    dbQuery.exec(callback);
  },
  add: function(sectionData, callback) {
    var by = { by: undefined };
    if (sectionData.created) by.by = sectionData.created.by || undefined;
    Sections.create(sectionData, function(err, section) {
      if (err) {
        console.log(err);
        Exception.log(
          'SECTION',
          'ADD',
          'Section add Error',
          err,
          by.by,
          function(err) {
            if (err) console.log(err);
          }
        );
        return callback(err);
      }
      if (!section)
        return callback(null, false, {
          message: 'Section not found'
        });
      Audit.log('SECTION', 'ADD', 'Section added', section, by.by, function(
        err
      ) {
        if (err) console.log(err);
      });
      return callback(null, section);
    });
  },
  dataTable: function(query, callback) {
    var options = { conditions: query.conditions || {} };
    var colLoanApplicationTypeIds = query.columns.find(function(column) {
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
    if (!options.conditions.deleted) options.conditions.deleted = false;
    Sections.dataTable(query, options, callback);
  },
  update: function(sectionData, callback) {
    var by = { by: undefined };
    if (sectionData.updated) by.by = sectionData.updated.by || undefined;
    Sections.findByIdAndUpdate(sectionData._id, sectionData, function(
      err,
      section
    ) {
      if (err) {
        console.log(err);
        Exception.log(
          'SECTION',
          'UPDATE',
          'Section Update Error',
          err,
          by.by,
          function(err) {
            if (err) console.log(err);
          }
        );
        return callback(err);
      }
      Audit.log(
        'SECTION',
        'UPDATE',
        'Section Updated',
        section,
        by.by,
        function(err) {
          if (err) console.log(err);
        }
      );
      return callback(null, section);
    });
  },
  remove: function(sectionData, callback) {
    var by = { by: undefined };
    if (sectionData.updated) by.by = sectionData.updated.by || undefined;
    sectionData.deleted = true;
    Sections.findByIdAndUpdate(
      sectionData._id,
      { $set: { deleted: true } },
      function(err, section) {
        if (err) {
          console.log(err);
          Exception.log(
            'SECTION',
            'DELETE',
            'Section Delete Error',
            err,
            by.by,
            function(err) {
              if (err) console.log(err);
            }
          );
          return callback(err);
        }
        Audit.log(
          'SECTION',
          'DELETE',
          'Section Deleted',
          section,
          by.by,
          function(err) {
            if (err) console.log(err);
          }
        );
        return callback(null, section);
      }
    );
  }
};
