import React from 'react';

class Sidebar extends React.Component{
  getTeamMembers =(team) => {
    alert(team);
  }
  render(){

    return(
      <div>
      {this.props.projectStructure?
        <div>
      <div className="profile row">
      <img className = "profile-picture" src="assets/images/download.jpeg" />
        <span className="profile-name">{this.props.user.name}</span>
        <div>Setting</div>
      </div>
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
      </div>

    )
  }
}

export default Sidebar;
