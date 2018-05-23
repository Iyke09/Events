import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Navigation from '../helperComponent/myEvents/navBar';
import Event from '../helperComponent/myEvents/events';

class Events extends React.Component {
  constructor(){
    super();
    this.state = {
      user: null
    };
    this.deleteHandler = this.deleteHandler.bind(this);
  }
  componentWillMount(){
    this.props.getEvents();
    $(document).ready(function(){
      $('.modal').modal();
    });
    $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
    });
  }
  setId(val){
    localStorage.setItem('eventId', val);
  }
  deleteHandler(val) {
    $(`#${val}`).hide(5000);
    this.props.deleteEvent(val);
    localStorage.removeItem('eventId');
  }
  render() {
    const {events} = this.props;
    const token = localStorage.getItem('token');
    return (
        <div className="events">
            <Navigation token={token}/>

            <div className="section-header" style={{backgroundColor: '#E5E4E2', color: '#212F3C'}}>
                <h1 className="light hide-on-small-only">
                    <span className="w3-padding-large borderRight"><i className="fa fa-star"/></span>
                    <span className="w3-padding-large" style={{textTransform: 'uppercase'}}>My Events</span>
                </h1>
                <h2 className="light hide-on-med-and-up">
                    <span className="w3-padding-large borderRight"><i className="fa fa-star"/></span>
                    <span className="w3-padding-large" style={{textTransform: 'uppercase'}}>My Events</span>
                </h2>
                <p className="font2 w3-padding-large">
                    Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Nunc id odio mollis, luctus ex at, accumsan magna....
                </p>
            </div>

            <div className="container">
                <div className="row">
                    <div className="row font2"><br/><br/>
                        <div className="">
                            <h3 className="light rule font2 ">
                                <span className="w3-padding-large">Upcoming Events!...</span>
                            </h3>
                            <p className="blue-grey-text">
                                <span className="left col m6 s12">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                </span>
                                <span className="col m6 s12 light hide-on-small-only">
                                    <a className="button8 hide-small-only right">Show more events</a>
                                </span>
                            </p>
                        </div>
                        <br/><br/><br/><br/><br/><br/>

                        {events ? events.map((event) => {
                            return (
                                <Event
                                    key={event.id} 
                                    event={event}
                                    setId={this.setId}
                                />
                            );
                        }) : ''}

                    </div>
                </div>
            </div>
            <div id="modal1" className="modal modal-fixed-footer" style={{width: 350, height: 160}}>
                <div className="modal-content ">
                    <p><b>Are you sure you would like to delete this event?</b></p>
                </div>
                <div className="modal-footer">
                <a onClick={() => this.deleteHandler(localStorage.getItem('eventId'))}
                    className="modal-action modal-close waves-effect waves-green green-text btn-flat test2">Delete</a>
                <a className="modal-action modal-close waves-effect waves-green red-text btn-flat">Cancel</a>
                </div>
            </div>
            <div className="center">
                <button className="btn font2 red center">ALL EVENTS</button>
            </div>
        
            <br/><br/><br/>
        </div>
    );
  }
}


export default Events;
