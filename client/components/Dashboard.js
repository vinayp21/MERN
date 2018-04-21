import React from 'react';
import Content from './Content';
import Sidebar from './Sidebar';
import {fetchTaskRequest, fetchProjectStructure, logout} from '../actions'
class Dashboard extends React.Component{
	constructor(props){
		super(props);
		if(document.cookie.indexOf('session-id')<0){
			this.props.history.push('/')
		}
	}
	logout= () =>{
		this.props.dispatch(logout());
	}
	componentWillReceiveProps(nextProps){
		if(document.cookie.indexOf('session-id')<0){
			this.props.history.push('/')
		}
	}
	render(){
		return(
			<div>
			{this.props.tasks?
			<div className="dashboard">
				<div className="header">
          <div className="navbar navbar-default" role="navigation">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed " data-toggle="collapse" data-target="#js-navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#/" >D-Tracker</a>
            </div>
            <div className="collapse navbar-collapse custom-header" id="js-navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li ><a href="void:javascript(0)"  onClick={this.logout}>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 sidebar">
            <Sidebar projectStructure={this.props.projectDetails} projectList={this.props.projectList} user ={this.props.userDetails}/>
            </div>
            <div className="col-lg-9 col-md-9 content">
						{this.props.projectList?
							<div>
							Admin Screen
							</div>
							:
							<Content user ={this.props.userDetails} token={this.props.token} taskList = {this.props.tasks} dispatch={this.props.dispatch} projectList={this.props.projectList}/>
						}
              </div>
          </div>
        </div>
	    </div>
			:''}
			</div>
			);
	}
}

export default Dashboard;
