import React from 'react';
import {connect} from 'react-redux';
import {initaiteCreateTask, initaiteEditTask} from '../actions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {apiCall} from '../service'
import 'react-datepicker/dist/react-datepicker.css';
class CreateTask extends React.Component{
  constructor(){
    super();
    this.state={
      dueDate:moment(),
      taskName:'',
      taskDesc:'',
      assignee:'',
      team:'Select Team',
      assigneeSuggesions:[]
    }
  }

  createTask=(e) => {
    e.preventDefault();
    let newTaskData={
    	taskName: this.state.taskName,
    	taskDescription: this.state.taskDesc,
    	createdOn: new Date(),
    	dueDate: this.state.dueDate,
    	createdBy: this.props.userDetails.userName,
    	assignee: this.state.assignee,
    	status: 'Draft',
    	project:this.props.userDetails.project,
    	team: this.state.team,
    	isCritical:true
    };
    let filterCtiteria={};
    let sortCriteria={};
    if(this.props.tasks.filterObj){
      filterCtiteria=this.props.tasks.filterObj;
    }
    if(this.props.tasks.sortData.sortData){
       sortCriteria=this.props.tasks.sortData;
    }
    if(this.props.editTaskDetails){
      newTaskData.taskId=this.props.editTaskDetails._id;
      this.props.dispatch(initaiteEditTask(filterCtiteria, sortCriteria, newTaskData));
    }else{
      newTaskData.taskId= Math.random().toString(),
      this.props.dispatch(initaiteCreateTask(filterCtiteria, sortCriteria, newTaskData));
    }
    this.setState({
      dueDate:moment(),
      taskName:'',
      taskDesc:'',
      assignee:'',
      team:'Select Team',
      assigneeSuggesions:[]
    });
    $('#openModal').modal('toggle');
  };
  changeInput= (e) => {
    e.preventDefault();
    if(e.target.name==='assignee'){
      if(e.target.value===''){
        this.setState({
          assigneeSuggesions:[]
        })
      }else{
        this.getSuggestions(e.target.value);
      }
    }
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  setAssignee =(user) => {
    this.setState({
      assignee:user,
      assigneeSuggesions:[]
    })
  }
  onBlur=() => {
    setTimeout(() => {
      this.setState({
        assigneeSuggesions:[]
      })
    },500);
  }
  getSuggestions=(val) => {
    let reqObj={
      projectId:'PROJId',
      value:val
    }
    let action={
      url:'http://localhost:3000/task-tracker/api/user/getAssignee',
      reqObj,
      token:this.props.token
    }
    apiCall(action).then((data) => {
      	if(data.err){
      		throw new Error(data.msg);
      	}else{
  				let assigneeSuggesions = data.map((d,i) => {
            let obj= {
              name:d.name,
              usename: d.userName
            };
            return obj;
          })
          this.setState({assigneeSuggesions:assigneeSuggesions})
      	}
    	})
    	.catch(error => {
          console.log(error);
      });
  }
  dateChange= (date) => {
    this.setState({
      dueDate: date
    });
  }
  selectTeam= (team) => {
    this.setState({
      team: team
    });
  }
  componentWillReceiveProps(nextProps){
    if(Object.keys(nextProps.editTaskDetails).length>0){
      this.setState({
        dueDate:moment(nextProps.editTaskDetails.dueDate),
        taskName:nextProps.editTaskDetails.taskName,
        taskDesc:nextProps.editTaskDetails.taskDescription,
        assignee:nextProps.editTaskDetails.assignee,
        team:nextProps.editTaskDetails.team
      });
    }
  }
  render(){
    return(
      <div className="create-task-form">
        <form onSubmit={this.createTask}>
          <table>
          <tbody>
            <tr>
              <td>
              <label>
                Task Name
              </label>
              </td>
              <td>
                <input type="text" name="taskName" className="form-control" placeholder="Task Name" value={this.state.taskName} onChange={this.changeInput}/>
              </td>
            </tr>

              <tr>
                <td>
                <label>
                  Task Description
                </label>
                </td>
                <td>
                  <textarea type="text" name="taskDesc" className="form-control" placeholder="Task Description" value={this.state.taskDesc} onChange={this.changeInput} />
                </td>
              </tr>

                <tr>
                  <td>
                  <label>
                    Assignee
                  </label>
                  </td>
                  <td>
                    <input type="text" name="assignee" className="form-control" placeholder="Assignee" value={this.state.assignee} onChange={this.changeInput} autoComplete="off" onBlur={ this.onBlur } />
                    <div className="assignee-suggesions">
                      <ul>
                      {this.state.assigneeSuggesions? this.state.assigneeSuggesions.map((suggestion,i) => <li onClick={() => this.setAssignee(suggestion.name)} key={i}>{suggestion.name}</li>):''}
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                <td>
                  Team
                </td>
                <td>
                <div className="dropdown">
                  <button className="btn btn-default dropdown-toggle form-control" type="button" data-toggle="dropdown">{this.state.team}
                  <span className="caret"></span></button>
                  <ul className="dropdown-menu select-team">
                  {this.props.projectDetails? this.props.projectDetails.teams.map((team,i) => <li key ={i}><a href="void:javascript(0)" onClick={()=> this.selectTeam(team)}>{team}</a></li>):''}
                  </ul>
                </div>
                </td>
                </tr>
                <tr>
                  <td>
                  <label>
                    Due Date
                  </label>
                  </td>
                  <td>
                    <DatePicker
                        selected={this.state.dueDate}
                        onChange={this.dateChange}
                        className="test"
                    />;
                  </td>
                </tr>
                <tr>
                  <td>
                    { this.props.editTaskDetails? <input type="submit" value ="Edit Task" /> : <input type="submit" value ="Create Task" />}
                  </td>
                </tr>
                </tbody>
          </table>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    isAuthenticated: state.isAuthenticated,
    projectDetails:state.projectDetails,
    tasks:state.taskData,
    userDetails:state.user,
    token:state.userToken

  }
}

const mapDispatchToProps =(dispatch) => ({
  dispatch
})


export default connect( mapStateToProps, mapDispatchToProps )(CreateTask);
