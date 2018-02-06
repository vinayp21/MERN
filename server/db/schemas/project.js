import Mongoose from 'mongoose';

let projectModel=Mongoose.model('Project',{
	_id: String,
	projectName: String,
	projectDesc: String,
	teams:Array
});

module.exports=projectModel;
