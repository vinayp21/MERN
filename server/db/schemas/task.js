import Mongoose from 'mongoose';

let taskModel=Mongoose.model('Task',{
	_id: String,
	taskName: String,
	taskDescription: String,
	createdOn: Date,
	dueDate: String,
	createdBy: String,
	assignee: String,
	status: String,
	project:String,
	team: String,
	isCritical:Boolean
});

module.exports=taskModel;
