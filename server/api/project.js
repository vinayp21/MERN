import {Router} from 'express';
import Project from '../db/schemas/project';
import ApiResponseGenerator from '../utilities/apiResponseGenerator';
import dbConnector from '../db/dbConnector'

const routes = new Router;

routes.post('/create',(req , res) => {
	let projectData={
		_id: req.body.projectId,
		projectName: req.body.projectName,
		projectDesc: req.body.projectDesc,
		teams:req.body.projectTeams
  };

	Project.create(projectData, (err, data) => {
		if (err) {
          	res.json(ApiResponseGenerator.generate(true, 'error in creating a project'));
        }else{
        	res.json(ApiResponseGenerator.generate(false,data));
        }
	});

});

routes.post('/delete',(req, res) => {
	Project.remove({'_id':req.body.projectId}, (err, data) => {
		if(err){
			res.json(ApiResponseGenerator.generate(true, 'error in deleting the project'));
		}else{
			res.json(ApiResponseGenerator.generate(false,data));
		}
	});
});

routes.post('/update',(req, res) => {
	let updatedData={
		projectName: req.body.projectName,
		projectDesc: req.body.projectDesc,
		teams:req.body.projectTeams
		};
	Project.update({'_id':req.body.projectId},updatedData, (err, data) => {
		if(err){
			res.json(ApiResponseGenerator.generate(true, 'error in updating the project'));
		}else{
			res.json(ApiResponseGenerator.generate(false,data));
		}
	});
});

routes.post('/',(req , res) => {
	let filter={};
	if(req.body.filterKey){
		filter[req.body.filterKey]=req.body.filterData;
	}
	Project.find(filter).exec((err, data) => {
		if(err){
			res.json(ApiResponseGenerator.generate(true, 'error in retrieving projects'));
    }
		else{
			res.json(ApiResponseGenerator.generate(false, data));
		}
	})
});

module.exports = routes;
