
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';

function Navigator(props) {
    $(document).ready(function(){
        $(".button-collapse").sideNav();
        $(".dropdown-button").dropdown();
        $('.modal').modal();
    });
    return (
        <div className="">
            <ul id="dropdown1" className="dropdown-content">
                <li>
                    <a className="notify" href="#!">Notifications</a>
                </li>
                <li className="divider" />
                <li>
                    <a className="modal-trigger" href="#modal1">Change Password</a>
                </li>
            </ul>
            <nav className="" role="navigation" style={{backgroundColor: '#212F3C'}}>
                <div className="nav-wrapper container">
                    <a id="logo-container " href="" className="brand-logo white-text">Andela</a>
                    <ul className="right hide-on-med-and-down">
                        {props.token !== null ?
                            <li className="myEvents">
                                <Link to={"/user/events"}><i className="material-icons left">event</i>
                                    My Events
                                </Link>
                            </li> : ''
                        }
                        {props.token === null && props.facebook === null ?
                            <li className="login">
                                <Link to={"/auth/signin"}>Login</Link>
                            </li> :
                            <span>
                                <li className="logout" onClick={props.logOut}>
                                    <a href=""><i className="fa fa-sign-out left" />Logout</a>
                                </li>
                            </span>
                        }
                        {props.decoded.adminUser ? 
                            <li className="admin">
                                <Link to={"/admin/list_center"}>
                                    <i className="material-icons left">account_circle</i>Admin
                                </Link>
                            </li> : ''
                        }
                        {!props.decoded.adminUser && props.token !== null ?
                            <li>
                                <a className="dropdown-button" href="#!" data-activates="dropdown1">Manage
                                    <i className="material-icons right">
                                        arrow_drop_down
                                    </i>
                                </a>
                            </li> : ''
                        }
                        {/* <li className="reg"><Link to={"/auth/signup"}>Register</Link></li> */}
                    </ul>

                    <ul id="nav-mobile" className="side-nav">
                    {props.token !== null ?
                            <li className="myEvents">
                                <Link to={"/user/events"}><i className="material-icons left">event</i>
                                    My Events
                                </Link>
                            </li> : ''
                        }
                        {props.token === null && props.facebook === null ?
                            <li className="login">
                                <Link to={"/auth/signin"}>Login</Link>
                            </li> :
                            <span>
                                <li className="logout" onClick={props.logOut}>
                                    <a href=""><i className="fa fa-sign-out left" />Logout</a>
                                </li>
                            </span>
                        }
                        {props.decoded.adminUser ? 
                            <li className="admin">
                                <Link to={"/admin/list_center"}>
                                    <i className="material-icons left">account_circle</i>Admin
                                </Link>
                            </li> : ''
                        }
                        {!props.decoded.adminUser && props.token !== null ?
                            <li>
                                <a className="dropdown-button" href="#!" data-activates="dropdown1">Manage
                                    <i className="material-icons right">
                                        arrow_drop_down
                                    </i>
                                </a>
                            </li> : ''
                        }
                    </ul>
                    <a data-activates="nav-mobile"
                        className="button-collapse"><i className="material-icons">menu</i>
                    </a>
                </div>
            </nav>
        </div>
    );
}

Navigator.propTypes = {
    decoded: PropTypes.object,
    token: PropTypes.string,
    facebook: PropTypes.string,
    logOut: PropTypes.func
};


export default Navigator;