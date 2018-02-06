import React from 'react';
import CreateTask from '../containers/CreateTask'
import {fetchTaskRequest} from '../actions'
class Content extends React.Component{
	constructor(){
		super();
		this.state={
			assigneeList:['All'],
			statusList:['All'],
			editTaskDetails:{}
		}
	}
	editTask = (task) => {
		this.setState({editTaskDetails:task});
		$('#createTaskModal').modal('toggle');
	}
	createTask = () => {
		this.setState({editTaskDetails:{}});
		$('#createTaskModal').modal('toggle');
	}
	sortField =(field) => {
		let filterCriteria={};
		let sortCriteria={
			sortData:{}
		};
		sortCriteria.sortData[field]='asc';
		if(this.props.taskList.filterObj){
			 filterCriteria=this.props.taskList.filterObj;
		}
		if(this.props.taskList.sortData.sortData){
			let obj = this.props.taskList.sortData.sortData,
	    objKey = Object.keys(obj);
			if(objKey[0]===field){
				if(obj[objKey[0]]==='asc'){
					sortCriteria.sortData[field]='desc';
				}
			}
		}
		this.props.dispatch(fetchTaskRequest(filterCriteria, sortCriteria));
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.taskList){
			if(Object.keys(nextProps.taskList.filterObj.filterObj).length===1){
				const uniqueUsers = ['All', ...new Set(nextProps.taskList.task.map(item => item.assignee))];
				const uniqueStatus = ['All', ...new Set(nextProps.taskList.task.map(item => item.status))];
				this.setState({assigneeList:uniqueUsers, statusList:uniqueStatus});
			}
		}

	}
	selectFilter=(key, user) => {
		let sortCriteria={};
		let filterCriteria={};
		if(user==='All'){
			delete this.props.taskList.filterObj.filterObj[key];
			filterCriteria=this.props.taskList.filterObj;
		}else{
			this.props.taskList.filterObj.filterObj[key]=user;
			filterCriteria=this.props.taskList.filterObj;
		}
		if(this.props.taskList.sortData.sortData){
			 sortCriteria=this.props.taskList.sortData;
	 }
		this.props.dispatch(fetchTaskRequest(filterCriteria, sortCriteria));
	}
	clearAllFilter=() => {
		let sortCriteria={};
		let filter= this.props.taskList.filterObj.filterObj;
		for (var key in filter) {
		  if (filter.hasOwnProperty(key)) {
				if(key!=='project'){
					delete filter[key]
				}
		  }
		}
		if(this.props.taskList.sortData.sortData){
			 sortCriteria=this.props.taskList.sortData;
	 }
		let filterCriteria=this.props.taskList.filterObj;
		this.props.dispatch(fetchTaskRequest(filterCriteria, sortCriteria));
	}
	render(){
		return(
			<div>
			{this.props.taskList?
			<div>
			 <div className="modal fade" id="createTaskModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Create Task</h4>
                  </div>
                  <div className="modal-body">
                   <CreateTask editTaskDetails={this.state.editTaskDetails}/>
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="create-task" >
						<span data-toggle="modal" onClick={() => this.createTask()}>
              + Create Task
						</span>
							<span className="filter-by">
							Filter By ->
							<div className="dropdown">
								<button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Assignee
								<span className="caret"></span></button>
								<ul className="dropdown-menu select-team filter-dropdown">
								{this.state.assigneeList.map((user,i) => <li key={i} onClick={() => this.selectFilter('assignee',user)}>{user}</li>)}
								</ul>
							</div>
							<div className="dropdown">
								<button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Status
								<span className="caret"></span></button>
								<ul className="dropdown-menu select-team filter-dropdown">
								{this.state.statusList.map((status,i) => <li key={i} onClick={() => this.selectFilter('status',status)}>{status}</li>)}
								</ul>
							</div>
							<button className="btn btn-default" onClick={this.clearAllFilter}>Clear All</button>
							</span>
            </div>
              <table className="table">
                <thead>
                  <tr>
                    <th onClick={() => this.sortField('taskName')}>Task Name</th>
                    <th onClick={() => this.sortField('taskDescription')}>Description</th>
                    <th onClick={() => this.sortField('dueDate')}>Due date</th>
                    <th>Status</th>
                    <th onClick={() => this.sortField('assignee')}>Assignee</th>
										<th></th>
                  </tr>
                </thead>
                <tbody>
								{this.props.taskList.task.map((task, i) =>
									<tr key={i}>
                    <td>{task.taskName}</td>
                    <td>{task.taskDescription}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.status}</td>
                    <td>{task.assignee}</td>
										<td onClick={() => this.editTask(task)}>Edit</td>
                  </tr>
								)}
                </tbody>
              </table>
							</div>
							: '' }

             </div>
			)
	}
}

export default Content
