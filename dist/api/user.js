'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../db/schemas/user');

var _user2 = _interopRequireDefault(_user);

var _passwordEncoder = require('../utilities/passwordEncoder');

var _passwordEncoder2 = _interopRequireDefault(_passwordEncoder);

var _apiResponseGenerator = require('../utilities/apiResponseGenerator');

var _apiResponseGenerator2 = _interopRequireDefault(_apiResponseGenerator);

var _userAuthenticator = require('../utilities/userAuthenticator');

var _userAuthenticator2 = _interopRequireDefault(_userAuthenticator);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();
var app = (0, _express2.default)();
var path = require('path');
var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'server/assets/profile/');
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
var upload = (0, _multer2.default)({ storage: storage });

routes.post('/getAssignee', function (req, res) {
  var filter = {
    project: req.body.projectId,
    name: { $regex: ".*" + req.body.value + ".*" }
  };
  _user2.default.find(filter, { "name": 1, "userName": 1 }).exec(function (err, data) {
    res.json(data);
  });
});
routes.post('/profileImage', upload.single('profile'), function (req, res, next) {
  //console.log(req.file);
  res.json(req.file);
});

routes.post('/getProjectUsersByTeam', function (req, res) {
  _user2.default.find(req.body.teamDetails, { "name": 1, "userName": 1 }).exec(function (err, data) {
    if (err) {
      res.json(_apiResponseGenerator2.default.generate(true, 'Unable to retrieve users'));
      return;
    }
    res.json(_apiResponseGenerator2.default.generate(false, data));
  });
});
routes.post('/register', function (req, res) {
  console.log(req.body.registrationDetails);
  var registrationDetails = req.body.registrationDetails,
      userName = registrationDetails.userName;
  _userAuthenticator2.default.isUserPresent(userName, function (err, user) {
    if (err) {
      res.json(err);
      return;
    } else if (user) {
      res.json(_apiResponseGenerator2.default.generate(true, 'user already registered'));
      return;
    }

    _passwordEncoder2.default.encode(registrationDetails.password, function (err, encodedPassword) {
      var newUser = new _user2.default();
      newUser.userName = userName;
      newUser.password = encodedPassword;
      newUser.name = registrationDetails.name;
      newUser.project = registrationDetails.project;
      newUser.team = registrationDetails.team;
      newUser.isAdmin = registrationDetails.isAdmin;
      newUser.image = registrationDetails.image;
      newUser.save(function (err, user) {
        if (err) {
          res.json(_apiResponseGenerator2.default.generate(true, 'error in creating user'));
          return;
        }
        res.json(_apiResponseGenerator2.default.generate(false, user));
      });
    });
  });
});

routes.post('/authenticate', function (req, res) {

  var credentials = req.body.credentials,
      userName = credentials.userName,
      password = credentials.password;
  _userAuthenticator2.default.authenticateUser(userName, password, function (err, user) {
    if (err) {
      res.json(err);
      return;
    }
    req.session.userInfo = user;
    console.log(req.sessionID);
    res.cookie('session-id', req.sessionID, { httpOnly: false });
    var token = _jsonwebtoken2.default.sign({ userName: userName }, _config2.default.secret, { expiresIn: 60 * 60 });
    res.json(_apiResponseGenerator2.default.generate(false, { 'token': token, 'user': user }));
  });
});
routes.post('/logout', function (req, res) {
  req.session.destroy();
  res.clearCookie('session-id');
  res.json(_apiResponseGenerator2.default.generate(false, 'Logout Success'));
});
routes.post('/delete', function (req, res) {
  var newUser = new _user2.default();
  var credentials = req.body.credentials;

  _user2.default.deleteOne({
    userName: credentials.userName
  }, function (err) {
    if (err) {
      res.json(_apiResponseGenerator2.default.generate(true, 'error occured while deleting user'));
      return;
    }
    res.json(_apiResponseGenerator2.default.generate(false));
  });
});

routes.post('/update', function (req, res) {
  var userData = req.body.credentials,
      update = req.body.update;
  _user2.default.findOneAndUpdate({
    userName: userData.userName
  }, update, function (err) {
    if (err) {
      res.json(_apiResponseGenerator2.default.generate(true, 'something went wrong while updating'));
      return;
    }
    res.json(_apiResponseGenerator2.default.generate(false));
  });
});

routes.post('/logout', function (req, res) {
  req.session.authenticate = false;
  res.json(_apiResponseGenerator2.default.generate(false, 'logged out!'));
});

module.exports = routes;