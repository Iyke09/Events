
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';
import Error from '../notifications/error';
import Success from '../notifications/success';

function Form(props) {
    return (
                    <form id="add-form2" className="col s12" onSubmit={props.handleSubmit}>
                        <h3 className="font2 center red-text">Change Password</h3>
                        { props.error ? <Error error={props.error} closeErrMsg={props.closeErrMsg} /> : ''}
                        { props.success ? <Success closeErrMsg={props.closeErrMsg} /> : ''}
                        <div className="row">
                            <div className="input-field col s12 ">
                                <i className="material-icons prefix">lock</i>
                                <input id="icon_telephone3"
                                name="old_pass" type="password"
                                onChange={props.onChange}
                                placeholder="Enter your old Password"
                                className="validate " required/>
                                <label htmlFor="icon_telephone3" />
                            </div>
                            <div className="input-field col s12 ">
                                <i className="material-icons prefix">lock</i>
                                <input id="icon_telephone2" name="new_pass" type="password"
                                onChange={props.onChange}
                                placeholder="New Password"
                                className="validate " required/>
                                <label htmlFor="icon_telephone2" />
                            </div>
                            <div className="input-field col s12 ">
                                <i className="material-icons prefix">lock</i>
                                <input id="icon_telephone1" name="con_pass" type="password"
                                onChange={props.onChange}
                                placeholder="Confirm password"
                                className="validate " required/>
                                <label htmlFor="icon_telephone1" />
                            </div>
                        </div>
                        <div className="center" >
                            <button type="submit" style={{borderRadius: 40}} className="waves-effect waves-light btn red">
                                <i className="" />Reset Password
                            </button>
                        </div>
                    </form>
    );
}

Form.propTypes = {
    handleSubmit: PropTypes.func,
    closeErrMsg: PropTypes.func,
    onChange: PropTypes.func,
    error: PropTypes.string,
    success: PropTypes.bool,
};


export default Form;