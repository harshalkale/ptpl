// CONFIG
var config = require('../../config.json')[process.env.NODE_ENV || 'development'],
  // JWT
  jwt = require('jsonwebtoken'),
  userService = require('../security/users/service'),
  Access = require('../core/logs/access/service'),
  Exception = require('../core/logs/exception/service');

module.exports = {
  login: function ({
    username,
    password
  }, callback) {
    userService.get({
      _where: {
        'auth.username': username,
        'auth.password': password,
        active: true
      },
      _lean: true
    }, (err, users) => {
      if (err) {
        console.log(err);
        Exception.log(
          'USER',
          'LOGIN',
          'User Login Error',
          err,
          null,
          function (err) {
            if (err) console.log(err);
          }
        );
        return callback(err);
      }
      if (!users || !users.length) return callback(null, null, 'Incorrect username and/or password');
      var user = users[0],
        token = jwt.sign({}, config.SECRET, {
          subject: user._id.toString(),
          expiresIn: '2w'
        });
      callback(null, {
        token,
        user
      });
      Access.log(user._id,
        'LOGIN',
        function (err) {
          console.log(err);
          Exception.log(
            'ACCESS',
            'LOG',
            'Access Log Error',
            err,
            null,
            function (err) {
              if (err) console.log(err);
            }
          );
        })
    });
  }
};
