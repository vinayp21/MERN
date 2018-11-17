'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./api/routes');

var _routes2 = _interopRequireDefault(_routes);

var _dbConnector = require('./db/dbConnector');

var _dbConnector2 = _interopRequireDefault(_dbConnector);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('./db/schemas/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compression = require('compression');
var app = (0, _express2.default)();
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({
  secret: "secret Key!",
  httpOnly: false,
  cookie: { secure: false }
}));

// dbConnector.connect();
// app.use(express.static('public'));
app.set('superSecret', _config2.default.secret);
app.use(compression());
app.use(_bodyParser2.default.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// app.use(express.static(__dirname +'/assets'));


app.use('/task-tracker/api', _routes2.default);
var PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello!!! The API is at ' + PORT);
});
app.listen(PORT, function (err) {
  if (err) console.error('Error on port: ' + PORT);else console.log('Listening on port: ' + PORT + '-' + process.env.NODE_ENV + ' mode');
});