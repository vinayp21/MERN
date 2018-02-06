import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer';
import { requestSuccess, requestFailure, fetchTaskSuccess, fetchTaskFailure, loginSuccess,  fetchProjectStructure, fetchTaskRequest, loginFailure, fetchProjectStructureFailure, fetchProjectStructureSuccess} from '../actions'
import {apiCall} from '../service'
const middleWareFunction = store => next => action => {
	if(store.getState()){
		action['token']=store.getState().userToken;
	}
	switch (action.type) {
		case 'FETCH_TASK_REQUEST':
		apiCall(action).then((data) => {
		  	if(data.err){
		  		throw new Error(data.msg);
		  	}else{
					let filter={
							filterObj:action.reqObj.filterObj
					};
					let sort={
						sortData:action.reqObj.sortData || {}
					};
		  		store.dispatch(fetchTaskSuccess(data.data,filter,sort ));
		  	}
			})
			.catch(error => {
		      store.dispatch(fetchTaskFailure(error.toString()));
		  });
			break;
			case 'LOGIN_ATTEMPT':
			apiCall(action).then((data) => {
		    	if(data.err){
						throw new Error(data.msg);
		    	}else{
		    		store.dispatch(loginSuccess(data.data));
						let filterCriteria={
								filterObj:{project:data.data.user.project}
						};
						store.dispatch(fetchTaskRequest(filterCriteria, {}));
						let project={
							"filterKey":"_id",
							"filterData":data.data.user.project
						};
						store.dispatch(fetchProjectStructure(project,data.data.token));
		    	}
		  	})
		  	.catch(error => {
		      	store.dispatch(loginFailure(error.toString()));
		    });
				break;
				case 'FETCH_PROJECT_STRUCTURE':
					apiCall(action).then((data) => {
				    	if(data.err){
				    		throw new Error(data.msg);
				    	}else{
				    		store.dispatch(fetchProjectStructureSuccess(data.data[0]));
				    	}
				  	})
				  	.catch(error => {
				      	store.dispatch(fetchProjectStructureFailure(error.toString()));
				    });
						break;
				case 'CREATE_TASK':
					apiCall(action).then((data) => {
				    	if(data.err){
				    		throw new Error(data.msg);
				    	}else{
				    		store.dispatch(fetchTaskRequest(action.filter, action.sort));
				    	}
				  	})
				  	.catch(error => {
				      	store.dispatch(createTaskFailure(error.toString()));
				    });
						break;
					case 'REQUEST_REGISTER':
						apiCall(action).then(function(data) {
					    	if(data.err){
					    		throw new Error(data.msg);
					    	}else{
									store.dispatch(requestSuccess(data.data));
					    	}
					  })
				  	.catch(error => {
				        dispatch(requestFailure('failed to register'))
				    });
						break;
		default:
			let result= next(action);
			return result;
	}

}


export default (initialState={}) => {
	return applyMiddleware(thunk, middleWareFunction)(createStore)(reducer, initialState);
}
