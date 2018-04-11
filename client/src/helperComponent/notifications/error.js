
import React, { Component } from 'react';
import PropTypes from 'prop-types';

function Error(props) {
    return (
        <div style={{ borderRadius: 7}} className="w3-panel red white-text error hyper">
            <p className="w3-padding-medium err_para"><i className="yellow-text fa fa-exclamation-triangle"
                style={{paddingRight:5}} aria-hidden="true" /><span id="err_msg">{props.error}</span>
                <span style={{cursor: 'pointer'}}className="right">
                    <a onClick={props.closeErrMsg} className="white-text">x</a>
                </span>
            </p>
      </div> 
    );
}

Error.propTypes = {
    error: PropTypes.string,
    closeErrMsg: PropTypes.func
};
export default Error;