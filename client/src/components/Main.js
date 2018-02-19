import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode';
import $ from 'jquery';
import firebase from 'firebase';
import { Link, browserHistory} from 'react-router';
import store from '../store';
import FileUploader from 'react-firebase-file-uploader';

import '../styles/style.scss';

class Main extends Component {
  constructor(){
    super();
    this.state = {
      user: null
    };
  }
  componentWillMount(){
    const token = localStorage.getItem('token');
    if(token !== null){
      const decoded = jwt(token);
      const curr_time = new Date().getTime() / 1000;
      console.log('the value is ' + decoded.exp, curr_time);
      if(curr_time > decoded.exp){
        localStorage.setItem('route', window.location.pathname);
        browserHistory.push('/auth/signin');
      }
    }
    store.dispatch({type: 'ERROR', error: ''});
    $(document).ready(function() {
      $(".button-collapse").sideNav();
    });
    $(document).ready(function() {
      $('select').material_select();
    });
    let config = {
      apiKey: "AIzaSyB79V1_PDfy7IkLHjwscQyWFM1T-YuQdTY",
      authDomain: "events-6f28c.firebaseapp.com",
      databaseURL: "https://events-6f28c.firebaseio.com",
      projectId: "events-6f28c",
      storageBucket: "events-6f28c.appspot.com",
      messagingSenderId: "1034834728500"
    };
    firebase.initializeApp(config);
  }
  render() {
    return (
      <div className="Main">
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.object.isRequired,
};

{/* <Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/> */}

export default Main;
