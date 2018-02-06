import React from 'react';
import Content from './Content';
import Sidebar from './Sidebar';
import {fetchTaskRequest, fetchProjectStructure} from '../actions'
class Dashboard extends React.Component{
	constructor(props){
		super(props);
		if(!this.props.isAuthenticated){
			this.props.history.push('/')
		}
	}

	render(){
		return(

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
                <li ><a href="void:javascript(0)" >Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 sidebar">
            <Sidebar projectStructure={this.props.projectDetails} user ={this.props.userDetails}/>
            </div>
            <div className="col-lg-9 col-md-9 content">
              <Content token={this.props.token} taskList = {this.props.tasks} dispatch={this.props.dispatch}/>
            </div>
          </div>
        </div>
	    </div>
			);
	}
}

export default Dashboard;
