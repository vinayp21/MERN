'use strict';

var _express = require('express');

var _project = require('../db/schemas/project');

var _project2 = _interopRequireDefault(_project);

var _apiResponseGenerator = require('../utilities/apiResponseGenerator');

var _apiResponseGenerator2 = _interopRequireDefault(_apiResponseGenerator);

var _dbConnector = require('../db/dbConnector');

var _dbConnector2 = _interopRequireDefault(_dbConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.post('/create', function (req, res) {
	var projectData = {
		_id: req.body.projectId,
		projectName: req.body.projectName,
		projectDesc: req.body.projectDesc,
		teams: req.body.projectTeams
	};

	_project2.default.create(projectData, function (err, data) {
		if (err) {
			res.json(_apiResponseGenerator2.default.generate(true, 'error in creating a project'));
		} else {
			res.json(_apiResponseGenerator2.default.generate(false, data));
		}
	});
});

routes.post('/delete', function (req, res) {
	_project2.default.remove({ '_id': req.body.projectId }, function (err, data) {
		if (err) {
			res.json(_apiResponseGenerator2.default.generate(true, 'error in deleting the project'));
		} else {
			res.json(_apiResponseGenerator2.default.generate(false, data));
		}
	});
});

routes.post('/update', function (req, res) {
	var updatedData = {
		projectName: req.body.projectName,
		projectDesc: req.body.projectDesc,
		teams: req.body.projectTeams
	};
	_project2.default.update({ '_id': req.body.projectId }, updatedData, function (err, data) {
		if (err) {
			res.json(_apiResponseGenerator2.default.generate(true, 'error in updating the project'));
		} else {
			res.json(_apiResponseGenerator2.default.generate(false, data));
		}
	});
});

routes.post('/', function (req, res) {
	var filter = {};
	if (req.body.filterKey) {
		filter[req.body.filterKey] = req.body.filterData;
	}
	_project2.default.find(filter).exec(function (err, data) {
		if (err) {
			res.json(_apiResponseGenerator2.default.generate(true, 'error in retrieving projects'));
		} else {
			res.json(_apiResponseGenerator2.default.generate(false, data));
		}
	});
});

module.exports = routes;