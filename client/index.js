import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'react-redux';
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

const store = storeCollection({});
store.dispatch(requestFailure('falied'));

ReactDOM.render(
		<Provider store ={store}>
			{routes}
		</Provider>,
  document.getElementById('app')
)
