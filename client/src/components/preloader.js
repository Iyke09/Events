import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Preloader extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div className="Loader">
        <div className="spinner-layer spinner-red">
          <div className="circle-clipper left">
            <div className="circle" />
          </div><div className="gap-patch">
            <div className="circle" />
          </div><div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    );
  }
}


export default Preloader;
