
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';

function Navigator(props) {
    return (
        <div className="">
          <div className="col l4 s12 m12">
            <ul id="slide-out" className="side-nav fixed white-text" style={{backgroundColor: '#17202A'}}>
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img src="https://static.pexels.com/photos/326559/pexels-photo-326559.jpeg"/>
                        </div>
                        <a href="#!user">
                            <img className="circle" src="https://static.pexels.com/photos/324658/pexels-photo-324658.jpeg"/>
                        </a>
                        <a href="#!name"><span className="white-text name">Admin-001</span></a>
                        <a href="#!email"><span className="white-text email">admin-001@gmail.com</span></a>
                    </div>
                </li>
                <li>
                    <a className="white-text" href="#!">
                        <i className="material-icons grey-text">cloud</i>Cloudy - 24-09, 2017 
                    </a>
                </li>
                <li>
                    <a className="white-text" href="#!">ID:3456565646JD</a>
                </li>
                <li><div className="divider" /></li>
                <li>
                    <Link to={"/"}><i className="fa fa-home grey-text" />
                        <span className="waves-effect white-text">
                            HOME
                        </span>
                    </Link>
                </li>
                <li className={props.activeRoute('/admin/add_center') ? 'grey' : ''}>
                    <Link to={"/admin/add_center"}>
                        <i className="fa fa-plus white-text" />
                        <span onClick={props.clearForm} className="waves-effect white-text waves-light add" href="#modal1">
                        ADD CENTER</span>
                    </Link>
                </li>
                {props.activeRoute('edit') ?
                    <li className={props.activeRoute('edit') ? 'grey' : ''}>
                        <Link to={"/admin/add_center"}>
                            <i className="fa fa-edit white-text" />
                            <span className="waves-effect white-text waves-light update" href="#modal1">
                                EDIT CENTER
                            </span>
                        </Link>
                    </li> : ''
                }
                <li className={props.activeRoute('/admin/list_center') ? 'grey' : ''}>
                    <Link to={"/admin/list_center"}>
                        <i className="fa fa-list white-text" />
                        <span className="waves-effect white-text">
                            CENTERS
                        </span>
                    </Link>
                </li>
            </ul>
            <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
          </div>
        </div>
    );
}

Navigator.propTypes = {
    center: PropTypes.object,
    activeRoute: PropTypes.func,
    clearForm: PropTypes.func,
};


export default Navigator;