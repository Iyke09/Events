
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Error from '../notifications/error';
import Success from '../notifications/success';

function Forms(props) {
    return (
        <form id="add-form2" className="col s12" onSubmit={props.handleSubmit} >
            { props.error ? <Error error={props.error} closeErrMsg={props.closeErrMsg}/>: ''}
            { props.success ? <Success closeErrMsg={props.closeErrMsg} /> : ''}
            <div className="row">
                <div className="input-field col s12 ">
                    <i className="material-icons prefix">mail</i>
                    <input id="icon_telephonelj" name="retrieve" type="email"
                        onChange={props.onChange}
                        placeholder=""
                        className="validate"
                    />
                    <label htmlFor="icon_telephone">Email</label>
                </div>
                <div className="center">
                    <button type="submit" style={{borderRadius: 40}} 
                        className="waves-effect waves-light btn red">
                            <i className="" />Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

Forms.propTypes = {
    center: PropTypes.object,
    handleSubmit: PropTypes.func,
    onChange: PropTypes.func,
    closeErrMsg: PropTypes.func,
    error: PropTypes.string,
    success: PropTypes.success,
};


export default Forms;