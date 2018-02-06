import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

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
  }
  deleteHandler(val) {
    // console.log(val);
    // $(`#${val}`).hide(5000);
    this.props.deleteEvent(val);
  }
  render() {
    const {events} = this.props;
    const token = localStorage.getItem('token');
    console.log(events);
    return (
      <div className="events">
        <nav className="" role="navigation" style={{backgroundColor: '#212F3C'}}>
          <div className="nav-wrapper container">
            <Link to={"/"}>
              <a id="logo-container " className="brand-logo white-text">Andela</a>
            </Link>
            <ul className="right hide-on-med-and-down">
            <li>
              <Link to={"/user/events"}>
                My Events
              </Link>
            </li>
            {token === null ? <li><Link to={"/auth/signin"}>Login</Link></li> : ''}
            <li className=""><Link to={"/auth/signup"}>Register</Link></li>
            <li className="addEventz">
              <Link to={"/add/events"}>
                <i className="material-icons">add</i>
              </Link>
            </li>
            </ul>

            <ul id="nav-mobile" className="side-nav">
            <li><a href="#" /></li>
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
          </div>
        </nav>

  <div className="container">
    <h3 className="fam">Today's Events</h3><hr/>
    <div className="row">
    <div className="col s12">
      <img
      className="responsive-img"
      src="https://static.pexels.com/photos/625644/pexels-photo-625644.jpeg"
      style={{width: '100%',height: 350}}/>
      <div className="blue-grey bg1 white-text row">
        <div className="col s12">
          <h6><i className="fa fa-calendar-o" />
            <span style={{marginLeft: 4}}>july 24, 2017 20:00</span>
          </h6>
        </div>
      </div>
    </div>

    <div className="row font2"><br/><br/>
      <h3 className="light fam col s12 center">Upcoming Events!...</h3>
      <hr className="hr1"/>
        <br/><br/>
    {events ? events.map((event) => {
      return (
        <div key={event.id} id={event.id} className="test">
          <div className="col s12">
            <div className="col s12 m12 l4">
              <img
                className="responsive-img"
                  src={event.Center.image} style={{width: '100%',height: 250}}/>
            </div>

            <div className="col s12 m12 l8">
              <div className="right">
                <i className="fa fa-star or" />
                <i className="fa fa-star or" />
                <i className="fa fa-star or" />
                <i className="fa fa-star or" />
                <i className="fa fa-star or" />
              </div>
              <small style={{color: 'grey'}}>Created on: 14th july,2017</small>
                <h5 className="light font3">
                  <span style={{marginRight: 4}}>
                    <span className="title_text">{event.title}</span>
                    <Link to={`/events/edit/${event.id}`}>
                      <i className="material-icons modal-trigger" id={`r${event.title}`} data-target="modal1" href="#modal1">edit</i>
                    </Link>
                  </span>
                </h5>


              <div className="divider"  />
              <div className="section">
                <h6 id="fsize"> <i className="fa fa-map-marker" id="wit" /> {event.Center.location}</h6>
                  <h6 id="fsize"><i className="fa fa-phone" id="wit" />
                  <b>Phone:</b>  +00 151515</h6>
                  <h6 id="fsize"><i className="fa fa-calendar-o" id="wit" /> <b>Date:</b>   {event.date} <br/></h6>
                  <h6 id="fsize"><i className="fa fa-clock-o" id="wit" /><b>ETA:</b>  {event.time} <br/></h6><br/>
                  <div className="testn" onClick={() => this.deleteHandler(event.id)}>
                    <button id={event.title} style={{cursor: 'pointer'}}
                  className="right atag" href="">Remove</button></div>
                </div>
            </div>
          </div>
          <div className="divider" /><br/><br/>
      </div>
      );
    }) : ''}

      </div>
    </div>
	</div>
      <div className="center">
        <button className="btn font2 red center"
        >ALL EVENTS
        </button>
      </div><br/><br/><br/>

      </div>
    );
  }
}


export default Events;
