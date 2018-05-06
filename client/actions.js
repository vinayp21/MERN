import fetch from 'isomorphic-fetch'
import {apiCall} from './service'

export const REQUEST_SUCCESS= 'REQUEST_SUCCESS';
export const REQUEST_FAILURE='REQUEST_FAILURE';
export const REQUEST_REGISTER='REQUEST_REGISTER';
export const LOGIN_ATTEMPT='LOGIN_ATTEMPT';
export const LOGIN_FAILURE='LOGIN_FAILURE';
export const LOGIN_SUCCESS='LOGIN_SUCCESS';
export const FETCH_TASK_REQUEST ='FETCH_TASK_REQUEST';
export const FETCH_TASK_SUCCESS ='FETCH_TASK_SUCCESS';
export const FETCH_TASK_FAILURE= 'FETCH_TASK_FAILURE';
export const CREATE_TASK= 'CREATE_TASK';
export const CREATE_TASK_SUCCESS= 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE= 'CREATE_TASK_FAILURE';
export const FETCH_PROJECT_STRUCTURE= 'FETCH_PROJECT_STRUCTURE';
export const FETCH_PROJECT_STRUCTURE_SUCCESS= 'FETCH_PROJECT_STRUCTURE_SUCCESS';
export const FETCH_PROJECT_STRUCTURE_FAILURE= 'FETCH_PROJECT_STRUCTURE_FAILURE';
export const FETCH_PROJECT_LIST='FETCH_PROJECT_LIST';
export const FETCH_PROJECT_LIST_SUCCESS='FETCH_PROJECT_LIST_SUCCESS';
export const FETCH_PROJECT_LIST_FAILURE='FETCH_PROJECT_LIST_FAILURE';
export const LOGOUT_REQUEST='LOGOUT_REQUEST';
export const LOGOUT_SUCCESS='LOGOUT_SUCCESS';
export const EDIT_TASK= 'EDIT_TASK';
export const DELETE_TASK= 'DELETE_TASK';

export function deleteTask(id,filter,sort){
	return{
		type:DELETE_TASK,
		url:'/task-tracker/api/task/delete',
		reqObj:id,
		filter,
		sort
	}

}
export function initaiteEditTask(filter, sort, newTaskObj){
	return{
		type:EDIT_TASK,
		url:'/task-tracker/api/task/update',
		reqObj:newTaskObj,
		filter,
		sort
	}
}
export function logoutSuccess(){
	return{
		type:LOGOUT_SUCCESS,
		isAuthenticated: false
	}
}
export function logout(){
	return{
		type:LOGOUT_REQUEST,
		url:'/task-tracker/api/user/logout'
	}
}
export function fetchProjectListSuccess(list){
	return{
		type:FETCH_PROJECT_LIST_SUCCESS,
		projectList:list
	}
}

export function fetchProjectList(){
	return{
		type:FETCH_PROJECT_LIST,
		url:'/task-tracker/api/project/',
		reqObj:{}
	}
}
export function requestRegister(regObj){
	return{
		type:REQUEST_REGISTER,
		url:'/task-tracker/api/user/register',
		reqObj:regObj
	}
}

export function requestSuccess(user){
	return{
		type:REQUEST_SUCCESS,
		isRegistered:true,
		user:user
	}
}

export function requestFailure(errMsg){
	return{
		type:REQUEST_FAILURE,
		isRegistered:false,
		errorMessage:errMsg
	}
}
export function fetchTaskRequest(filter ={}, sort= {}){
	let requestObj={
		...filter,
		...sort
	};
	return{
		type:FETCH_TASK_REQUEST,
		url:'/task-tracker/api/task',
		reqObj:requestObj
	}
}
export function fetchTaskSuccess(taskData,filterObj,sortData){
	let taskDataObj={
		task:taskData,
		filterObj,
		sortData
	}
	return{
		type:FETCH_TASK_SUCCESS,
		tasks:taskDataObj
	}
}

export function fetchTaskFailure(errMsg){
	return{
		type:FETCH_TASK_FAILURE,
		errorMessage:errMsg
	}
}

export function initaiteCreateTask(filter, sort, newTaskObj){
	return{
		type:CREATE_TASK,
		url:'/task-tracker/api/task/create',
		reqObj:newTaskObj,
		filter,
		sort
	};
}

export function createTaskFailure(error){
	return{
		type:CREATE_TASK_FAILURE,
		errorMessage:error
	}
}
export function fetchProjectStructure(project){

	return{
		type:FETCH_PROJECT_STRUCTURE,
		url:'/task-tracker/api/project/',
		reqObj:project
	}
}

export function fetchProjectStructureSuccess(structure){
	return{
		type: FETCH_PROJECT_STRUCTURE_SUCCESS,
		structure:structure
	}
}

export function fetchProjectStructureFailure(error){
	return{
		type: FETCH_PROJECT_STRUCTURE_FAILURE,
		errorMessage: error
	}
}
export function requestLogin (loginObj){
	return{
		type:LOGIN_ATTEMPT,
		url:'/task-tracker/api/user/authenticate',
		reqObj:loginObj

	}
}
export function loginFailure(error){
	return{
		type:LOGIN_FAILURE,
		errorMessage:error
	}
}
export function loginSuccess(data){
	return{
		type:LOGIN_SUCCESS,
		loginData:data
	}
}
