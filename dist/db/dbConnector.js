'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dbConfig = require('./dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connector = {
  connect: function connect() {
    _mongoose2.default.Promise = global.Promise;
    _mongoose2.default.connect(_dbConfig2.default.url);
  }
};

module.exports = connector;