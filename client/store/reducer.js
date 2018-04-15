
export default (state ={}, action) => {
	switch(action.type){
		case 'FETCH_PROJECT_LIST_SUCCESS':
			return Object.assign({}, state, {projectList: action.projectList})

		case 'REQUEST_SUCCESS':
			return Object.assign({}, state, {
				isRegistered:true,
				isAuthenticated:false,
				user: action.user,
				errorMessage:""
			})

		case 'REQUEST_FAILURE':
		return Object.assign({}, state, {
				isRegistered:false,
				isAuthenticated:false,
				errorMessage: action.errorMessage,
				user:null
			})

		case 'FETCH_TASK_SUCCESS':
		return Object.assign({}, state, {
				taskData: action.tasks
		})
		case 'CREATE_TASK_FAILURE':
		return Object.assign({}, state, {
			errorMessage:action.errorMessage
		})
		case 'FETCH_PROJECT_STRUCTURE_SUCCESS':
		return Object.assign({}, state, {
			projectDetails:action.structure
		})
		case 'FETCH_PROJECT_STRUCTURE_FAILURE':
		return Object.assign({}, state, {
			errorMessage:action.errorMessage
		})
		case 'LOGIN_FAILURE':
		return Object.assign({}, state, {
			errorMessage:action.errorMessage
		})
		case 'LOGIN_SUCCESS':
		return Object.assign({}, state, {
			isAuthenticated:true,
			user:action.loginData.user,
			userToken:action.loginData.token
		})
		case 'LOGOUT_SUCCESS':
		return Object.assign({}, state, {
			isAuthenticated:action.isAuthenticated
		})
		default:
			return state;
	}
}
