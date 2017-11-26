import React from 'react';
import { render } from 'react-dom';


// Import Components
import App from './components/App';
import Centers from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';


// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Centers} />
        <Route path="/auth/signin" component={Signin} />
        <Route path="/home" component={Home} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));
