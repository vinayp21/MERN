'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var projectModel = _mongoose2.default.model('Project', {
	_id: String,
	projectName: String,
	projectDesc: String,
	teams: Array
});

module.exports = projectModel;