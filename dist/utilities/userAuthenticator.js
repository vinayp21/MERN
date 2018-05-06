'use strict';

var _user = require('../db/schemas/user');

var _user2 = _interopRequireDefault(_user);

var _apiResponseGenerator = require('./apiResponseGenerator');

var _apiResponseGenerator2 = _interopRequireDefault(_apiResponseGenerator);

var _passwordEncoder = require('./passwordEncoder');

var _passwordEncoder2 = _interopRequireDefault(_passwordEncoder);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var isUserPresent = function isUserPresent(userName, callback) {
  _user2.default.findOne({
    'userName': userName
  }, function (err, user) {
    if (err) {
      callback(_apiResponseGenerator2.default.generate(true, 'error in retriving information'));
      return;
    }
    callback(null, user);
  });
};

var isPasswordCorrect = function isPasswordCorrect(password, encodedPassword, callback) {
  _passwordEncoder2.default.compare(password, encodedPassword, function (err, isAuthenticated) {
    if (!isAuthenticated) {
      callback(_apiResponseGenerator2.default.generate(true, 'user-name or password is wrong'));
      return;
    }
    callback(null, true);
  });
};

var authenticateUser = function authenticateUser(userName, password, callback) {
  isUserPresent(userName, function (err, user) {
    if (err) {
      callback(err);
      return;
    } else if (!user) {
      callback(_apiResponseGenerator2.default.generate(true, 'user doesnt exist'));
      return;
    }
    isPasswordCorrect(password, user.password, function (err, isAuthenticated) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, user);
    });
  });
};

var verifyUser = function verifyUser(req, callback) {

  _jsonwebtoken2.default.verify(token, _config2.default.secret, function (err, decoded) {
    if (err) {
      callback(_apiResponseGenerator2.default.generate(true, 'Failed to authenticate the token'));
      return;
    }
    req.decoded = decoded;
    callback(null, token);
  });
};

var userAuthenticator = {
  authenticate: function authenticate(req, res, next) {
    if (req.path === '/user/register' || req.path === '/user/profileImage' || req.path === '/user/authenticate' || req.path === '/project/' || req.method === 'OPTIONS') {
      next();
      return;
    }

    var token = req.headers['authorization'];
    if (!token) {
      res.json(_apiResponseGenerator2.default.generate(true, 'No token provided'));
    }
    _jsonwebtoken2.default.verify(token, _config2.default.secret, function (err, decoded) {
      if (err) {
        res.json(_apiResponseGenerator2.default.generate(true, 'Invalid token'));
        return;
      }
      if (req.session.userInfo) {
        next();
      } else {
        res.json(_apiResponseGenerator2.default.generate(true, 'Session Logout'));
      }
      //console.log();
    });
  },

  'isUserPresent': isUserPresent,
  'authenticateUser': authenticateUser,
  'verifyUser': verifyUser
};

module.exports = userAuthenticator;