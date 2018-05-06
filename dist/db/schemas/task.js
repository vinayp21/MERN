'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var taskModel = _mongoose2.default.model('Task', {
	_id: String,
	taskName: String,
	taskDescription: String,
	createdOn: Date,
	dueDate: String,
	createdBy: String,
	assignee: String,
	status: String,
	project: String,
	team: String,
	isCritical: Boolean
});

module.exports = taskModel;