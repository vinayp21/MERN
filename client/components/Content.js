import React from 'react';
import CreateTask from '../containers/CreateTask'
import {fetchTaskRequest, deleteTask} from '../actions'
import Modal from './Modal'
import List from './List'
class Content extends React.Component{
	constructor(props){
		super(props);
		let listObj={
			header:[
				{
					columnId:'taskName',
					columnName:'Task Name',
					isSoratable:true
				},
				{
					columnId:'taskDescription',
					columnName:'Description',
					isSoratable:true
				},
				{
					columnId:'dueDate',
					columnName:'Due Date',
					isSoratable:true
				},
				{
					columnId:'assignee',
					columnName:'Assignee',
					isSoratable:true
				},
				{
					columnId:'status',
					columnName:'Status',
					isSoratable:true
				}
			]
		};
		let listData=props.taskList.task.map((task, i) => {
			let rowData=listObj.header.map((header,j) =>{
				return{
					columnId:header.columnId,
					columnContent:task[header.columnId]
				}
			});
			return{
				payload:task,
				rowData:rowData
			}
		});
		listObj.listData=listData;
		this.state={
			assigneeList:['All'],
			statusList:['All'],
			editTaskDetails:false,
			listData:listObj
		}
	}

	editTask = (task) => {
		this.setState({editTaskDetails:task});
		$('#openModal').modal('toggle');
	}
	listOptions={
		isDelete:true,
		isEdit:true,
		isMultiselect:true
	};

	deleteTask =(id) => {
		let filterCtiteria={};
    let sortCriteria={};
		if(this.props.taskList.filterObj){
      filterCtiteria=this.props.taskList.filterObj;
    }
    if(this.props.taskList.sortData.sortData){
       sortCriteria=this.props.taskList.sortData;
    }
		let obj={
			id
		}
		this.props.dispatch(deleteTask(obj,filterCtiteria,sortCriteria));
	}
	createTask = () => {
		this.setState({editTaskDetails:false});
		$('#openModal').modal('toggle');
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
			let listObj={
				header:[
					{
						columnId:'taskName',
						columnName:'Task Name',
						isSoratable:true
					},
					{
						columnId:'taskDescription',
						columnName:'Description',
						isSoratable:true
					},
					{
						columnId:'dueDate',
						columnName:'Due Date',
						isSoratable:true
					},
					{
						columnId:'assignee',
						columnName:'Assignee',
						isSoratable:true
					},
					{
						columnId:'status',
						columnName:'Status',
						isSoratable:true
					}
				]
			};
			let listData=nextProps.taskList.task.map((task, i) => {
				let rowData=listObj.header.map((header,j) =>{
					return{
						columnId:header.columnId,
						columnContent:task[header.columnId]
					}
				});
				return{
					payload:task,
					rowData:rowData
				}
			});

			listObj.listData=listData;
			this.setState({listData:listObj})

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
						<Modal modalTitle='Create Task'>
		        	<CreateTask userDetails={this.props.user} editTaskDetails={this.state.editTaskDetails}/>
		        </Modal>
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
						    <List data={this.state.listData} options={this.listOptions}/>
							 </div>
							: '' }
             </div>
			)
	}
}

export default Content
