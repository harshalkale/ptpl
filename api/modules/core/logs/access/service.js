var Access = require('./model.js');

module.exports = {
  get: function(query, callback) {
    Access.find(query)
      .populate({
        path: 'user',
        match: {
          active: true,
          deleted: false
        }
      })
      .exec(callback);
  },
  log: function(user, action, callback) {
    Access.create(
      {
        user: user,
        action: action
      },
      function(err, log) {
        if (err) {
          console.log(err);
          return callback(err);
        }
        callback(false);
      }
    );
  }
};
