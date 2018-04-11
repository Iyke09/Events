import React from 'react';
import { render } from 'react-dom';

// Import Components
import App from './app';
import Auth from './components/Auth.jsx';
import Home from './components/Home.jsx';
import details from './components/Details.jsx';
import admin from './components/Admin.jsx';
import events from './components/myEvents.jsx';
import Events from './components/Events.jsx';

import './styles/style.scss';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="/auth/signin" component={Auth} />
				<Route path="/auth/signup" component={Auth} />
				<Route path="/centerdetails/:id" component={details} />
				<Route path="/admin/add_center" component={admin} />
				<Route path="/admin/list_center" component={admin} />
				<Route path="/user/events" component={events} />
				<Route path="/add/:id" component={Events} />
				<Route path="/admin/edit/:id" component={admin} />
				<Route path="/edit_events/:id" component={Events} />
			</Route>
		</Router>
	</Provider>
);

render(router, document.getElementById('app'));
