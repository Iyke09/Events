
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../notifications/loader';
import Error from '../notifications/error';

function Form(props) {
    return (
        <div className="">
            <form id="add-form" className="col s12" onSubmit={props.handleSubmit}>
                { props.error && props.state.email ? 
                    <Error closeErrMsg={props.closeErrMsg} error={props.error}/> : ''
                }
                { props.loader ? <Loader /> : ''}

                <div className="row">
                {props.activeRoute('signup') ?
                    <div className="input-field col s12">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="icon_prefix" name="username" type="text"
                            onChange={props.onChange}
                            placeholder="User name..."
                            className="validate username" required
                        />
                        <label htmlFor="icon_prefix" />
                    </div> : ''
                }
                <div className="input-field col s12">
                    <i className="material-icons prefix">mail</i>
                    <input id="icon_telephone" name="email" type="text"
                        onChange={props.onChange}
                        placeholder="Email"
                        className="validate"
                    />
                    <label htmlFor="icon_telephone" />
                </div>
                <div className="input-field col s12">
                    <i className="material-icons prefix">lock</i>
                    <input id="icon_telephone2" name="password" type="password"
                        onChange={props.onChange}
                        placeholder="Password"
                        className="validate passwordz"
                    />
                    <label htmlFor="icon_telephone2" />
                </div>
                {props.activeRoute('signin') ?
                    <p>
                        <input type="checkbox" id="test5" />
                        <label htmlFor="test5">Remember me</label>
                        <span className="right blue-text" >
                            <a onClick={props.clearError} className="modal-trigger" href="#modal1">Forgot password?</a>
                        </span>
                    </p> : ''
                }
                </div>
                <div className="" style={{textAlign: 'center'}}>
                    <button type="submit" className="waves-effect waves-light btn red">
                        <i className="" />{props.activeRoute('signin') ? 'Sign In' : 'Create Account'}
                    </button>
                </div>
            </form>
        </div>
    );
}

Form.propTypes = {
    center: PropTypes.object,
    updateCenter: PropTypes.func,
};


export default Form;