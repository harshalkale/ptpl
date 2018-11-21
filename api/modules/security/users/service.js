var ObjectId = require('mongoose').Types.ObjectId;
var Users = require('./model.js');
var Audit = require('../../core/logs/audit/service.js');
var Exception = require('../../core/logs/exception/service.js');

var populates = [{
  path: 'role',
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
    var dbQuery = Users.find(query);
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
  add: function (userData, callback) {
    var by = {
      by: undefined
    };
    if (userData.created) by.by = userData.created.by || undefined;
    Users.create(userData, function (err, user) {
      if (err) {
        console.log(err);
        Exception.log(
          'USER',
          'ADD',
          'User add Error',
          err,
          by.by,
          function (err) {
            if (err) console.log(err);
          }
        );
        return callback(err);
      }
      if (!user)
        return callback(null, false, {
          message: 'User not found'
        });
      Audit.log('USER', 'ADD', 'User added', user, by.by, function (
        err
      ) {
        if (err) console.log(err);
      });
      return callback(null, user);
    });
  },
  dataTable: function (query, callback) {
    var options = {
      conditions: query.conditions || {}
    };
    var colRoles = query.columns.find(function (column) {
      return column.data === 'role._id';
    });
    if (
      colRoles &&
      colRoles.search &&
      colRoles.search.value !== ''
    ) {
      options.conditions['role'] = {
        $in: colRoles.search.value
          .split(',')
          .map(id => ObjectId(id))
      };
    }
    if (!options.conditions.deleted) options.conditions.deleted = false;
    Users.dataTable(query, options, callback);
  },
  update: function (userData, callback) {
    var by = {
      by: undefined
    };
    if (userData.updated) by.by = userData.updated.by || undefined;
    Users.findByIdAndUpdate(userData._id, userData, function (
      err,
      user
    ) {
      if (err) {
        console.log(err);
        Exception.log(
          'USER',
          'UPDATE',
          'User Update Error',
          err,
          by.by,
          function (err) {
            if (err) console.log(err);
          }
        );
        return callback(err);
      }
      Audit.log(
        'USER',
        'UPDATE',
        'User Updated',
        user,
        by.by,
        function (err) {
          if (err) console.log(err);
        }
      );
      return callback(null, user);
    });
  },
  remove: function (userData, callback) {
    var by = {
      by: undefined
    };
    if (userData.updated) by.by = userData.updated.by || undefined;
    userData.deleted = true;
    Users.findByIdAndUpdate(
      userData._id, {
        $set: {
          deleted: true
        }
      },
      function (err, user) {
        if (err) {
          console.log(err);
          Exception.log(
            'USER',
            'DELETE',
            'User Delete Error',
            err,
            by.by,
            function (err) {
              if (err) console.log(err);
            }
          );
          return callback(err);
        }
        Audit.log(
          'USER',
          'DELETE',
          'User Deleted',
          user,
          by.by,
          function (err) {
            if (err) console.log(err);
          }
        );
        return callback(null, user);
      }
    );
  }
};
