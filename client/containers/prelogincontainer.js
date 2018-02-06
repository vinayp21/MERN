import React from 'react';
import { connect } from 'react-redux';
import { requestRegister, requestLogin } from '../actions'
import Prelogin from '../components/Prelogin';

class PreloginContainer extends React.Component {
	render(){

		const { dispatch, onRegister, onLogin, isAuthenticated, isRegistered }=this.props;
		return(
			<Prelogin
				onRegister={onRegister}
				onLogin={onLogin}
				isAuthenticated={isAuthenticated}
				history={this.props.history}
				isRegistered={isRegistered}
				dispatch={dispatch} />
			);
	}
}

const mapStateToProps = state => {
  return {
  	isAuthenticated:state.isAuthenticated,
		isRegistered:state.isRegistered
  }
}

const mapDispatchToProps = dispatch => ({
	dispatch,
    onRegister :(obj) => {
    	dispatch(requestRegister(obj));
    },
    onLogin : (loginObj) => {
			dispatch(requestLogin(loginObj));
    }
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PreloginContainer)
