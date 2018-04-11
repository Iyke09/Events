
import React, { Component } from 'react';
import PropTypes from 'prop-types';

function Success(props) {
    return (
        <div style={{ borderRadius: 7}} className="w3-panel green white-text error hyper">
            <p className="w3-padding-medium err_para">
                <i className="fa fa-check" style={{paddingRight:5}} aria-hidden="true" />
                <span id="err_msg">Password sent to your email!</span>
                <span style={{cursor: 'pointer'}} className=" right" >
                    <a onClick={props.closeErrMsg} className="white-text">x</a>
                </span>
            </p>
        </div> 
    );
}

Success.propTypes = {
    closeErrMsg: PropTypes.func
};

export default Success;