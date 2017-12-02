import React from 'react';
import { render } from 'react-dom';


// Import Components
import App from './components/App';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import details from './components/details';
import admin from './components/admin';
import Edit from './components/Edit';
import events from './components/myEvents';
import addEvent from './components/addEvents';
import editEvent from './components/editEvents';

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
        <Route path="/auth/signin" component={Signin} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/centerdetails/:id" component={details} />
        <Route path="/user/admin" component={admin} />
        <Route path="/user/events" component={events} />
        <Route path="/add/:id" component={addEvent} />
        <Route path="/user/admin/edit/:id" component={Edit} />
        <Route path="/events/edit/:id" component={editEvent} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));
