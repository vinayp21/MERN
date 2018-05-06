'use strict';

var _express = require('express');

var _task = require('../db/schemas/task');

var _task2 = _interopRequireDefault(_task);

var _apiResponseGenerator = require('../utilities/apiResponseGenerator');

var _apiResponseGenerator2 = _interopRequireDefault(_apiResponseGenerator);

var _dbConnector = require('../db/dbConnector');

var _dbConnector2 = _interopRequireDefault(_dbConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.post('/', function (req, res) {
	var taskId = req.body.taskId;
	if (req.body.filterObj.project !== undefined) {
		_task2.default.find(req.body.filterObj).sort(req.body.sortData).exec(function (err, data) {
			if (err) {
				res.json(_apiResponseGenerator2.default.generate(true, 'error in retrieving task'));
			} else {
				res.json(_apiResponseGenerator2.default.generate(false, data));
			}
		});
	} else {
		res.json(_apiResponseGenerator2.default.generate(false, []));
	}
});

routes.post('/create', function (req, res) {
	var taskData = {
		_id: req.body.taskId,
		taskName: req.body.taskName,
		taskDescription: req.body.taskDescription,
		dueDate: req.body.dueDate,
		assignee: req.body.assignee,
		status: req.body.status,
		project: req.body.project,
		team: req.body.team,
		createdOn: new Date(),
		createdBy: req.body.createdBy,
		isCritical: req.body.isCritical
	};
	_task2.default.create(taskData, function (err, data) {
		if (err) {
			res.json(_apiResponseGenerator2.default.generate(true, 'error in creating task'));
		} else {
			res.json(_apiResponseGenerator2.default.generate(false, data));
		}
	});
});

routes.post('/delete', function (req, res) {
	console.log(req.body.id);
	_task2.default.remove({ '_id': req.body.id }, function (err, data) {
		if (err) {
			res.json(_apiResponseGenerator2.default.generate(true, 'error in deleting the task'));
		} else {
			res.json(_apiResponseGenerator2.default.generate(false, data));
		}
	});
});

routes.post('/update', function (req, res) {
	var updatedData = {
		taskName: req.body.taskName,
		taskDescription: req.body.taskDescription,
		dueDate: req.body.dueDate,
		assignee: req.body.assignee,
		status: req.body.status,
		team: req.body.team,
		isCritical: req.body.isCritical
	};
	console.log(updatedData);
	console.log(req.body.taskId);
	_task2.default.update({ '_id': req.body.taskId }, updatedData, function (err, data) {
		if (err) {
			res.json(_apiResponseGenerator2.default.generate(true, 'error in updating the task'));
		} else {
			res.json(_apiResponseGenerator2.default.generate(false, data));
		}
	});
});

module.exports = routes;