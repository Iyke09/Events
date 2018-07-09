
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';

function Navigator(props) {
    return (
        <div className="">
            <nav className="" role="navigation" style={{backgroundColor: '#212F3C'}}>
                <div className="nav-wrapper container">
                    <Link to={"/"}>
                        <span id="logo-container " className="brand-logo white-text">Andela</span>
                    </Link>
                    <ul className="right hide-on-med-and-down">
                        {props.token !== null ?
                            <li className="myEvents">
                            <Link to={"/user/events"}>
                                My Events
                            </Link>
                            </li>
                            : ''
                        }
                        {props.token === null ? <li><Link to={"/auth/signin"}>Login</Link></li> : ''}
                        <li className=""><
                            Link to={"/auth/signup"}>Register</Link>
                        </li>
                    </ul>

                    <ul id="nav-mobile" className="side-nav">
                        <Link to={"/"}>
                            <span id="logo-container " className="brand-logo white-text">Andela</span>
                        </Link>
                            {props.token !== null ?
                                <li className="myEvents">
                                <Link to={"/user/events"}>
                                    My Events
                                </Link>
                                </li>
                                : ''
                            }
                            {props.token === null ? <li><Link to={"/auth/signin"}>Login</Link></li> : ''}
                            <li className=""><
                                Link to={"/auth/signup"}>Register</Link>
                            </li>

                    </ul>
                    <a href="" data-activates="nav-mobile" className="button-collapse">
                        <i className="material-icons">menu</i>
                    </a>
                </div>
            </nav> 
        </div>
    );
}

Navigator.propTypes = {
    decoded: PropTypes.object,
    token: PropTypes.string,
};


export default Navigator;