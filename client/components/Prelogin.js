import React from 'react';
import { requestFailure } from '../actions'
import { apiCall } from '../service'
import 'bootstrap'

  class Prelogin extends React.Component{

    constructor(props){
      super(props);
      this.props.dispatch(requestFailure('falied'));
      this.register= this.register.bind(this);
      this.submitLogin= this.submitLogin.bind(this);
      this.state={
        loginScreen:true,
        projectList:[],
        teamList:[],
        selectedProject:{
          projectName:'SELECT PROJECT'
        },
        selectedTeam: 'SELECT TEAM'
      }
    }

    toggleLogin =() => {
      this.setState({loginScreen:!this.state.loginScreen});
    }
    selectProject =(projectData) => {
      this.setState({selectedProject:projectData});
      let projectObj={
      	"filterKey": "_id",
      	"filterData": projectData.projectId
      };
      let action={
        url:'http://localhost:3000/task-tracker/api/project/',
        reqObj:projectObj
      };
      apiCall(action).then((data) => {
        let teamList= data.data[0].teams.map((team) => {
            return team;
        });
        this.setState({teamList:teamList});
        console.log(teamList);
      })
      .catch(error => {

      });
    }
    selectTeam = teamData => {
      this.setState({selectedTeam:teamData});
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.isAuthenticated){
        this.props.history.push('/dashboard')
      }

      if (nextProps.isRegistered) {
        this.setState({
          loginScreen:true
        });
      }
    }

    register(e){
      e.preventDefault();
      let userRegistrationObj={
        registrationDetails:{
          userName:this.refs.email.value,
          password:this.refs.password.value,
          name:this.refs.name.value,
          project:this.state.selectedProject.projectId,
          team:this.state.selectedTeam
        }
      };
      this.props.onRegister(userRegistrationObj);
    }

    submitLogin(e){
      e.preventDefault();
      let loginObj={
        credentials:{
          userName:this.refs.loginEmail.value,
          password:this.refs.loginPassword.value
        }
      };
      this.props.onLogin(loginObj);
    }
    googleReg =() =>{


      gapi.auth2.init({
        client_id: '900774381205-0f0kpte6v8a4jsq2q30ivcjc3kb2lghg.apps.googleusercontent.com',
        fetch_basic_profile: true
      });
      gapi.auth2.getAuthInstance().signIn().then(function(data){
        console.log(data.getBasicProfile().getId());
      });
    }
    componentDidMount(){


      let action={
        url:'http://localhost:3000/task-tracker/api/project/',
        reqObj:{}
      };
      apiCall(action).then((data) => {
        let projectList= data.data.map((project) => {
            return{
              projectId:project._id,
              projectName:project.projectName
            }
        });
        this.setState({projectList:projectList});
      })
      .catch(error => {

      });
    }
    onSignIn=(userDetails) => {
      console.log(userDetails);
    }

    render(){

      return(
        <div>
        <div className="pre-login-title">
          D-Tracker
        </div>
        <div className="pre-login-form">
        {this.state.loginScreen?
          <div className="login">
            Login
            <div>
            <form onSubmit={this.submitLogin}>
            <table className="login-table">
              <tbody>
                <tr>
                  <td>
                      <input type="text" className="form-control" ref="loginEmail" placeholder="Email Id"/>
                  </td>
                </tr>
                <tr>
                  <td>
                      <input type="password" className="form-control" ref="loginPassword" placeholder="Password"/>
                  </td>
                </tr>
                <tr>
                  <td>
                      <input type="submit" className="btn btn-primary submit" value="Login"/>
                  </td>
                </tr>
                <tr>
                </tr>
              </tbody>
            </table>
            </form>
            <div className="switch-option" onClick={this.toggleLogin}>
            New User ?
            </div>
            </div>
          </div> :

          <div className="register">
            Registration
            <form onSubmit={this.register}>
            <table className="reg-table">
              <tbody>
              <tr>
                <td>
                    <input type="text" className="form-control" ref="name" placeholder="Name"/>
                </td>
              </tr>
                <tr>
                  <td>
                    <input type="text" className="form-control" ref="email" placeholder="Email Id"/>
                  </td>
                </tr>
                <tr>
                  <td>
                      <input type="password" className="form-control" ref="password" placeholder="Password"/>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="dropdown">
                      <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">{this.state.selectedProject.projectName}
                      <span className="caret"></span></button>
                      <ul className="dropdown-menu">
                      {this.state.projectList.map((project) => <li key ={project.projectId}><a href="void:javascript(0)" onClick={()=> this.selectProject(project)}>{project.projectName}</a></li>)}
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>

                      <div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">{this.state.selectedTeam}
                        <span className="caret"></span></button>
                        <ul className="dropdown-menu">
                        {this.state.teamList.map((team, i) => <li key = {team}><a href="void:javascript(0)" onClick={()=> this.selectTeam(team)}>{team}</a></li>)}
                        </ul>
                      </div>
                  </td>
                </tr>
                <tr>
                  <td>
                      <input type="submit" className ="btn btn-primary submit" value="Register"/>
                  </td>
                </tr>
                <tr>
                  <td>
                      <div onClick={this.googleReg}>Google</div>
                  </td>
                </tr>

              </tbody>
            </table>
            </form>
            <div className="switch-option" onClick={this.toggleLogin}>
            Login ?
            </div>
          </div>

           }
          </div>
          </div>
      );
    }
}

export default Prelogin;
