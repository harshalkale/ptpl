var ObjectId = require('mongoose').Types.ObjectId;
var Roles = require('./model.js');
var Audit = require('../../core/logs/audit/service.js');
var Exception = require('../../core/logs/exception/service.js');

var populates = [];

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
    var dbQuery = Roles.find(query);
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
  add: function(roleData, callback) {
    var by = { by: undefined };
    if (roleData.created) by.by = roleData.created.by || undefined;
    Roles.create(roleData, function(err, role) {
      if (err) {
        console.log(err);
        Exception.log(
          'ROLE',
          'ADD',
          'Role add Error',
          err,
          by.by,
          function(err) {
            if (err) console.log(err);
          }
        );
        return callback(err);
      }
      if (!role)
        return callback(null, false, {
          message: 'Role not found'
        });
      Audit.log('ROLE', 'ADD', 'Role added', role, by.by, function(
        err
      ) {
        if (err) console.log(err);
      });
      return callback(null, role);
    });
  },
  dataTable: function(query, callback) {
    var options = { conditions: query.conditions || {} };
    if (!options.conditions.deleted) options.conditions.deleted = false;
    Roles.dataTable(query, options, callback);
  },
  update: function(roleData, callback) {
    var by = { by: undefined };
    if (roleData.updated) by.by = roleData.updated.by || undefined;
    Roles.findByIdAndUpdate(roleData._id, roleData, function(
      err,
      role
    ) {
      if (err) {
        console.log(err);
        Exception.log(
          'ROLE',
          'UPDATE',
          'Role Update Error',
          err,
          by.by,
          function(err) {
            if (err) console.log(err);
          }
        );
        return callback(err);
      }
      Audit.log(
        'ROLE',
        'UPDATE',
        'Role Updated',
        role,
        by.by,
        function(err) {
          if (err) console.log(err);
        }
      );
      return callback(null, role);
    });
  },
  remove: function(roleData, callback) {
    var by = { by: undefined };
    if (roleData.updated) by.by = roleData.updated.by || undefined;
    roleData.deleted = true;
    Roles.findByIdAndUpdate(
      roleData._id,
      { $set: { deleted: true } },
      function(err, role) {
        if (err) {
          console.log(err);
          Exception.log(
            'ROLE',
            'DELETE',
            'Role Delete Error',
            err,
            by.by,
            function(err) {
              if (err) console.log(err);
            }
          );
          return callback(err);
        }
        Audit.log(
          'ROLE',
          'DELETE',
          'Role Deleted',
          role,
          by.by,
          function(err) {
            if (err) console.log(err);
          }
        );
        return callback(null, role);
      }
    );
  }
};
