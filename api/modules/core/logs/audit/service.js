var Audit = require('./model.js');

module.exports = {
  log: function(object, action, description, document, by, callback) {
    Audit.create(
      {
        object: object,
        action: action,
        description: description,
        document: document,
        created: {
          by: by
        }
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
