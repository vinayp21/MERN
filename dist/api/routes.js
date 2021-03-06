'use strict';

var _express = require('express');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _task = require('./task');

var _task2 = _interopRequireDefault(_task);

var _project = require('./project');

var _project2 = _interopRequireDefault(_project);

var _userAuthenticator = require('../utilities/userAuthenticator');

var _userAuthenticator2 = _interopRequireDefault(_userAuthenticator);

var _mailConfig = require('../mailConfig');

var _mailConfig2 = _interopRequireDefault(_mailConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import User from '../db/schemas/user';
// import passwordEncoder from '../utilities/passwordEncoder';
// import apiResponseGenerator from '../utilities/apiResponseGenerator';
var routes = new _express.Router();
// routes.use('/mail',function(req, res, next){
//   mailConfig();
//   next();
// });
routes.use(_userAuthenticator2.default.authenticate);
routes.use('/user', _user2.default);
routes.use('/task', _task2.default);
routes.use('/project', _project2.default);

module.exports = routes;