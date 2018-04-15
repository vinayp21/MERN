import React from 'react';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
class AdminContainer extends React.Component{

  render(){
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-3 sidebar">
          <Sidebar projectList={this.props.projectList } user ={this.props.userDetails}/>
          </div>
          <div className="col-lg-9 col-md-9 content">
            <Content token={this.props.token} taskList = {this.props.tasks} dispatch={this.props.dispatch}/>
          </div>
        </div>
      </div>
    )
  }

}

export default AdminContainer
