// CONFIG
var config = require('./config.json')[process.env.NODE_ENV || 'development'];

// MONGOOSE
var mongoose = require('mongoose');
// mongoose.connect('mongodb://192.168.10.96:27017/loan-scorecard');

var connectionUrl = config.DB.USER
  ? 'mongodb://' +
    encodeURIComponent(config.DB.USER) +
    ':' +
    encodeURIComponent(config.DB.PASS) +
    '@' +
    encodeURIComponent(config.DB.HOST) +
    ':' +
    encodeURIComponent(config.DB.PORT) +
    '/' +
    encodeURIComponent(config.DB.NAME)
  : 'mongodb://' +
    encodeURIComponent(config.DB.HOST) +
    ':' +
    encodeURIComponent(config.DB.PORT) +
    '/' +
    encodeURIComponent(config.DB.NAME);

mongoose.connect(
  connectionUrl,
  { useNewUrlParser: true }
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
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// CORS
app.use(require('cors')());

// BODY PARSER
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
);

// MODULES
var configurations = require('./modules/configurations');
app.use('/configurations', configurations);

var security = require('./modules/security');
app.use('/security', security);

var user = require('./modules/loan-applications');
app.use('/loan-applications', user);

// API START
app.listen(3000, function() {
  console.log('Listening...');
});
