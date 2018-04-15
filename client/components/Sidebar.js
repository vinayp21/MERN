import React from 'react';

class Sidebar extends React.Component{
  getTeamMembers =(team) => {
    alert(team);
  }
  render(){

    return(
      <div>

      <div className="profile row">
      <img className = "profile-picture" src={'http://localhost:3000/profile/'+this.props.user.image} />
        <span className="profile-name">{this.props.user.name}</span>
        <div>Setting</div>
      </div>
      {this.props.projectStructure?
      <div>
      <div data-toggle="collapse" data-target="#project">
        {this.props.projectStructure.projectName}
      </div>
      <div id="project" className="collapse">
        <ul>
          <li>
            <span data-toggle="collapse" data-target="#teams">Project Teams</span>
            <ul id="teams" className="collapse">
            {this.props.projectStructure.teams.map((team,i) =>
              <li onClick={() => this.getTeamMembers(team)}key ={i} >
              {team}
              </li>
            )}
            </ul>
          </li>
          <li>
            Team Members
          </li>
        </ul>
      </div>
      </div>
      : ''}
      {this.props.projectList?
        <div>
        <div data-toggle="collapse" data-target="#project">
          Projects
        </div>
          <div id="project" className="collapse">
            <ul id="teams" >
            {this.props.projectList.map((project,i) =>
              <li onClick={() => this.getTeamMembers(team)}key ={project._id} >
              {project.projectName}
              </li>
            )}
            </ul>
          </div>
        </div>
        :''}
      </div>

    )
  }
}

export default Sidebar;
