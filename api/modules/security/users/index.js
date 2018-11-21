var express = require('express'),
  users = express.Router(),
  userController = require('./controller');

users.get('/', userController.get);
users.post('/search', userController.get);
users.post('/data-table', userController.dataTable);
users.post('/', userController.add);
users.put('/', userController.update);
users.delete('/', userController.remove);

module.exports = users;
