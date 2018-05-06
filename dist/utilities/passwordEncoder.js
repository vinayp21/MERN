'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saltRounds = 10;

var passwordEncoder = {
  encode: function encode(unEncodedPassword, callback) {
    _bcrypt2.default.hash(unEncodedPassword, saltRounds, function (err, encodedPassword) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, encodedPassword);
    });
  },

  compare: function compare(password, encodedPassword, callback) {
    _bcrypt2.default.compare(password, encodedPassword, function (err, isAuthenticated) {
      if (!isAuthenticated) {
        callback(err);return;
      }
      callback(null, isAuthenticated);
    });
  }
};

module.exports = passwordEncoder;