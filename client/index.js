import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import routes from './routes'
import Prelogin from './components/Prelogin';
import storeCollection from './store/index';
import { Provider } from 'react-redux';
import Dashbaord from './components/Dashboard';
import { requestFailure, requestSuccess  } from './actions';
import './assets/scss/dashboard.scss';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

let persitantData={
	isRegistered:false,
	isAuthenticated:false,
	errorMessage: 'error',
	user:null
};
try{
	persitantData=JSON.parse(localStorage.getItem('savedState'))
}catch(err){
	persitantData={
		isRegistered:false,
		isAuthenticated:false,
		errorMessage: 'error',
		user:null
	}
}

const store = storeCollection(persitantData);
//store.dispatch(requestFailure('falied'));
store.subscribe(() => {
	localStorage.setItem('savedState', JSON.stringify(store.getState()));
});
ReactDOM.render(
		<Provider store ={store}>
			{routes}
		</Provider>,
  document.getElementById('app')
)
