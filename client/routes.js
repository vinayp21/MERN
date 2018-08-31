import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PreloginContainer from './containers/PreloginContainer';
import DashbaordContainer from './containers/dashboardContainer';
import AdminContainer from './containers/AdminContainer';
import Dashbaord from './components/Dashboard';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

const routes = (
	<Router>
		<Switch>
		  <Route exact path='/' component={PreloginContainer}/>
		  <Route path='/dashboard' component={DashbaordContainer}/>
			<Route path='/admin' component={AdminContainer}/>
			<Route  component={PreloginContainer}/>
		</Switch>
	</Router>
	);

export default routes;
