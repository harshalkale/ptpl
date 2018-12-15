var isProd = process.env.NODE_ENV === 'prod';

// CONFIG
var config = require('./config.json')[isProd ? 'prod' : 'development'];

// MONGOOSE
var mongoose = require('mongoose');

var connectionUrl = config.DB.USER ?
  'mongodb://' +
  encodeURIComponent(config.DB.USER) +
  ':' +
  encodeURIComponent(config.DB.PASS) +
  '@' +
  encodeURIComponent(config.DB.HOST) +
  ':' +
  encodeURIComponent(config.DB.PORT) +
  '/' +
  encodeURIComponent(config.DB.NAME) :
  'mongodb://' +
  encodeURIComponent(config.DB.HOST) +
  ':' +
  encodeURIComponent(config.DB.PORT) +
  '/' +
  encodeURIComponent(config.DB.NAME);

mongoose.connect(
  connectionUrl, {
    useNewUrlParser: true
  }
);

// MONGOOSE DATATABLE
var DataTable = require('mongoose-datatable');
var mongooseDataTablesConditionHandlers = require('./modules/core/condition-handlers.js');
DataTable.configure(config.MONGOOSE_DATATABLE.OPTIONS);

DataTable.HANDLERS.String = mongooseDataTablesConditionHandlers.myStringHandler;
DataTable.HANDLERS.Boolean =
  mongooseDataTablesConditionHandlers.myBooleanHandler;
mongoose.plugin(DataTable.init);

// EXPRESS
var express = require('express'),
  bodyParser = require('body-parser'),
  app = express();

// CORS
app.use(require('cors')());
app.use(bodyParser.raw({
  limit: '50mb'
}));
app.use(bodyParser.text({
  limit: '50mb'
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

// WEB PROD
if (isProd) {
  // Allowed extensions list can be extended depending on your own needs
  const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
  ];

  // Redirect all the other resquests
  app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
      res.sendFile(path.resolve(`public/${req.url}`));
    } else {
      res.sendFile(path.resolve('public/index.html'));
    }
  });

  // var fs = require('fs');
  // app.get(/^((?!(\/api\/)).)*$/, (req, res, next) => {
  //   if (fs.existsSync(__dirname + '/public' + req.url)) {
  //     return next();
  //   }
  //   res.sendFile(__dirname + '/public/index.html');
  // }, express.static(__dirname + '/public'));
}

// API
var api = require('./routes');
app.use('/api', api);

// START
app.listen(config.PORT, function () {
  console.log(`Listening on ${config.PORT}...`);

  console.log('Finding role "System Administrator"...');
  var Role = require('./modules/security/roles/service');
  Role.get({
    name: 'System Administrator',
    active: true,
    deleted: false
  }, (err, roles) => {
    if (err) {
      console.log('Error finding role: ', err);
      return;
    }
    if (!roles || !roles.length) {
      console.log('No role found. Creating one now...');
      Role.add({
        name: 'System Administrator',
        canModify: true
      }, (err, role) => {
        if (err) {
          console.log('Error saving role: ', err);
          return;
        }
        console.log('Role created... Checking to see if user account available...');
        checkForUserAccount(role._id);
      })
    } else {
      console.log('Role found... Checking to see if user account available...');
      checkForUserAccount(roles[0]._id);
    }
  });
});

checkForUserAccount = (roleId) => {
  var User = require('./modules/security/users/service');
  User.get({
    role: roleId,
    active: true,
    deleted: false
  }, (err, users) => {
    if (err) {
      console.log('Error finding user: ', err);
      return;
    }
    if (!users || !users.length) {
      console.log('No user found. Creating one now...');
      User.add({
        auth: {
          username: 'sysadmin',
          password: 'sysadmin'
        },
        role: roleId
      }, (err, user) => {
        if (err) {
          console.log('Error saving user: ', err);
          return;
        }
        console.log('User created...');
      })
    } else {
      console.log('User found...');
    }
  })
}
