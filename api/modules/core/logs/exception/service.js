var Exception = require('./model.js');

module.exports = {
  log: function(object, action, description, exception, by, callback) {
    Exception.create(
      {
        object: object,
        action: action,
        description: description,
        exception: exception,
        created: {
          by: by
        }
      },
      function(err, log) {
        if (err) {
          console.log(err);
          return callback(err);
        }
        return callback(false);
      }
    );
  }
};
