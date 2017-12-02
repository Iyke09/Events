import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/style.scss';

class Main extends Component {
  constructor(){
    super();
    this.state = {
      user: null
    };
  }
  componentWillMount(){
    $(document).ready(function() {
      $(".button-collapse").sideNav();
    });
  }
  render() {
    return (
      <div className="Main">
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

// Main.propTypes = {
//   children: PropTypes.object.isRequired,
// };

{/* <Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/> */}

export default Main;
