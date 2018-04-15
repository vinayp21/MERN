import {Router} from 'express';
import Task from '../db/schemas/task';
import ApiResponseGenerator from '../utilities/apiResponseGenerator';
import dbConnector from '../db/dbConnector'


const routes = new Router;

routes.post('/',(req , res) => {
	let taskId = req.body.taskId;
	if(req.body.filterObj.project!== undefined){
		Task.find(req.body.filterObj).sort(req.body.sortData).exec((err, data) => {
			if(err){
				res.json(ApiResponseGenerator.generate(true, 'error in retrieving task'));
	        }else{
				res.json(ApiResponseGenerator.generate(false, data));
			}
		})
	}else{
		res.json(ApiResponseGenerator.generate(false, []));
	}
});

routes.post('/create',(req , res) => {
	let taskData={
		_id:req.body.taskId,
		taskName: req.body.taskName,
		taskDescription: req.body.taskDescription,
		dueDate: req.body.dueDate,
		assignee: req.body.assignee,
		status: req.body.status,
		project: req.body.project,
		team:req.body.team,
		createdOn: new Date(),
		createdBy: req.body.createdBy,
		isCritical:req.body.isCritical
	};
	Task.create(taskData, (err, data) => {
		if (err) {
          	res.json(ApiResponseGenerator.generate(true, 'error in creating task'));
        }else{
        	res.json(ApiResponseGenerator.generate(false,data));
        }
	});

});

routes.post('/delete',(req, res) => {
	console.log(req.body.id);
	Task.remove({'_id':req.body.id}, (err, data) => {
		if(err){
			res.json(ApiResponseGenerator.generate(true, 'error in deleting the task'));
		}else{
			res.json(ApiResponseGenerator.generate(false,data));
		}
	});
});

routes.post('/update',(req, res) => {
	let updatedData={
		taskName: req.body.taskName,
		taskDescription: req.body.taskDescription,
		dueDate: req.body.dueDate,
		assignee: req.body.assignee,
		status: req.body.status,
		team:req.body.team,
		isCritical:req.body.isCritical
		};
		console.log(updatedData);
		console.log(req.body.taskId);
	Task.update({'_id':req.body.taskId},updatedData, (err, data) => {
		if(err){
			res.json(ApiResponseGenerator.generate(true, 'error in updating the task'));
		}else{
			res.json(ApiResponseGenerator.generate(false,data));
		}
	});
});

module.exports = routes;
