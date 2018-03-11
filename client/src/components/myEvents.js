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
    console.log(val);
    $(`#${val}`).hide(5000);
    this.props.deleteEvent(val);
    localStorage.removeItem('eventId');
    // Materialize.toast('I am a toast!', 4000);
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
            <a href="#" data-activates="nav-mobile" className="button-collapse">
              <i className="material-icons">menu</i></a>
          </div>
        </nav>
  <div className="section-header" style={{backgroundColor: '#E5E4E2', color: '#212F3C'}}>
    {/* <img className="" src={single.image} style={{width:'100%',height: 450}}/> */}
    <h1 className="light hide-on-small-only">
      <span className="w3-padding-large borderRight"><i className="fa fa-star"/></span>
      <span className="w3-padding-large" style={{textTransform: 'uppercase'}}>My Events</span></h1>
      <h2 className="light hide-on-med-and-up">
      <span className="w3-padding-large borderRight"><i className="fa fa-star"/></span>
      <span className="w3-padding-large" style={{textTransform: 'uppercase'}}>My Events</span></h2>
    <p className="font2 w3-padding-large">
        Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nunc id odio mollis, luctus ex at, accumsan magna....
      </p>
  </div>

  <div className="container">
    {/* <h3 className="fam">Today's Events</h3><hr/> */}
  <div className="row">

    <div className="row font2"><br/><br/>
      <div className="">
        <h3 className="light rule font2 "><span className="w3-padding-large">Upcoming Events!...</span></h3>
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
      {/* <lr className="header-rule"/> */}
        <br/><br/><br/><br/><br/><br/>
    {events ? events.map((event) => {
      const datex = event.date ;
      const newDate = datex.split('-');
      const dateArr = ['null', 'Jan', 'Feb', 'March','April',  'May','June','July',
      'August', 'Sept','Oct', 'Nov','Dec'];

      let selector = '';
      if(parseInt(newDate[1]) < 10){
        selector = newDate[1][1];
      }else{
        selector = newDate[1];
      }
      const finalDate = dateArr[selector];

      const date = newDate[2];
      const month = finalDate;
      const to = parseInt(event.time.split(':')[0]) + 2;
      return (
        <div key={event.id} id={event.id} className="test">
          <div className="col s12 w3-padding-32">
            <div className="col s12 m12 l3 hide-on-med-and-down">
              <h3 className="center black-text" style={{lineHeight: 8}}>
                <i className="fa fa-clock-o red-text" id="" style={{marginRight: 5}} />
                <b>{event.time} - {to + ':00'}</b>
              </h3>
            </div>
            <div className="col s12 m12 l4 center w3-display-container">
              <img
                className="responsive-img img-event"
                  src={event.Center.image} style={{width: '100%',height: 250}}/>
                  <div className="middle">
                    <h3 className="white-text font center">
                      <span className="w3-medium red-text">{date}</span><br/> {month}
                    </h3>
                  </div>
            </div>

            <div className="col s12 m12 l5 reveal">
                <h2 className="light">
                  <span style={{marginRight: 4}}>
                    <span className="title_text font2">{event.title}</span>
                    <Link to={`/edit_events/${event.id}`}>
                      <i className="material-icons"
                      id={`r${event.title}`}>edit</i>
                    </Link>
                    <span className="right">
                      <a id={event.title} onClick={() => this.setId(event.id)}
                         className="red white-text w3-medium modal-trigger tooltipped test1"
                         data-position="bottom" data-delay="50" data-tooltip="Cancel Event!" href="#modal1"
                      style={{paddingRight: 4, paddingLeft: 4, paddingTop: 2, paddingBottom: 2}}><b>x</b></a>
                    </span>
                  </span>
                </h2>

              <div className=" ">
                <h6 id="fsize" className="font3 light"> <i className="fa fa-map-marker red-text" id="" style={{marginRight: 5}} />
                 {event.Center.location}</h6>
                 <h6 id="fsize" className="font3 light hide-on-large-only"> <i className="fa fa-clock-o red-text" id="" style={{marginRight: 5}} />
                 {event.time} - {to + ':00'}</h6>
                 {/* <h6 id="fsize font3"> <i className="fa fa-clock-o blue-grey-text" id="" style={{marginRight: 5}} />
                 {event.time}</h6> */}
                  <p className="black-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                   dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  </p>
                  {/* <div className="testn" onClick={() => this.deleteHandler(event.id)}>
                    <button id={event.title} style={{cursor: 'pointer'}}
                  className="right atag" href="">Remove</button></div> */}
                </div>
            </div>
          </div>


        </div>
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
        <button className="btn font2 red center"
        >ALL EVENTS
        </button>
      </div><br/><br/><br/>

      </div>
    );
  }
}


export default Events;
