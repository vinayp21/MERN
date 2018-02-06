import React from 'react';
import {connect} from 'react-redux';
import Dashboard from '../components/Dashboard';


const mapStateToProps = state => {
  console.log(state);
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard)
