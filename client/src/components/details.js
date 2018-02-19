import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

let newArr = [];
let pastArr = [];
class Details extends React.Component {
  constructor(){
    super();
    this.state = {
      user: null,
      newArr1: [],
      pastArr1: []
    };
    this.setRedirect = this.setRedirect.bind(this);
  }
  componentWillMount(){
    this.props.getSingle(this.props.params.id);
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });
  }
  componentWillReceiveProps(newProps){
    const {single} = this.props;
    let newArr1,pastArr1 = [];
    console.log('hello majiks ' + newProps.single.events);
    if(newProps.single.events){
      if(newProps.single.events.length !== 0){
        for(let x of newProps.single.events) {
          if(new Date().getTime() < new Date(x.date).getTime()){
            this.setState((prev, next) => {
              return {newArr1: [...prev.newArr1, x]};
            });
          }else{
            this.setState((prev, next) => {
              return {pastArr1: [...prev.pastArr1, x]};
            });
          }
        }
      }

    }
  }

  setRedirect(){
    const {single} = this.props;
    localStorage.setItem('route', `/add/${single.name}`);
    browserHistory.push('/auth/signin');
  }
  render() {
    const {single} = this.props;
    const {pastArr1, newArr1} = this.state;
    const token = localStorage.getItem('token');

    return (
      <div className="Details">
        <nav className="" role="navigation" style={{backgroundColor: '#212F3C'}}>
          <div className="nav-wrapper container">
            <Link to={"/"}>
              <a id="logo-container " className="brand-logo white-text">Andela</a>
            </Link>
            <ul className="right hide-on-med-and-down">
              {token !== null ?
                <li className="myEvents">
                  <Link to={"/user/events"}>
                    My Events
                  </Link>
                </li>
                : ''
              }
                {token === null ? <li><Link to={"/auth/signin"}>Login</Link></li> : ''}
                <li className=""><Link to={"/auth/signup"}>Register</Link></li>
            </ul>

            <ul id="nav-mobile" className="side-nav">
              <li><a href="#" /></li>
            </ul>
            <a href="" data-activates="nav-mobile"
            className="button-collapse"><i className="material-icons">menu</i></a>
          </div>
        </nav>


  <div className="section-header" style={{backgroundColor: '#E5E4E2', color: '#212F3C'}}>
    {/* <img className="" src={single.image} style={{width:'100%',height: 450}}/> */}
    <h1 className="light">
      <span className="w3-padding-large borderRight"><i className="fa fa-star"/></span>
      <span className="w3-padding-large" style={{textTransform: 'uppercase'}}>{single.name} CENTER</span></h1>
    <p className="font2 w3-padding-large">
        Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nunc id odio mollis, luctus ex at, accumsan magna....
      </p>
  </div>


  <div className="section-header2 font2">
    <div className="row">
      <div className="col l5 m12 s12">
        <div className="borders">
          <h2 className="font2"><b>{single.name}</b></h2>
          <p>from  <span className="red-text" style={{fontSize: 22, marginLeft:6}}>
            ${single.price ? single.price : 0}</span>/ hour</p>
        </div>
        <p className="blue-grey-text">Capacity: {single.capacity},  Size/sqft: 140-150sq</p>
        <p className="font2 location" style={{fontSize: 18}}>
          <i className="fa fa-map-marker blue-grey-text"
        style={{width: 10}} /> {single.location}</p>
        <p className="font2" style={{ fontSize: 18}}>
          Donec placerat molestie sapien ac eleifend. Phasellus vulputate
          sagittis libero. In consectetur efficitur In consectetur efficitur erat, sit amet laoreet velit tempor nec.
          Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus erat, sit amet laoreet velit tempor nec..

        </p>
        <p><span><i className="fa fa-check blue-grey-text"
        style={{width: 20}}/></span>Individual air conditioning units</p>
        <p><span><i className="fa fa-check blue-grey-text"
        style={{width: 20}}/></span>Safe</p>
        <p><span><i className="fa fa-check blue-grey-text"
        style={{width: 20}}/></span>Accessible</p>
        <p><span><i className="fa fa-check blue-grey-text"
        style={{width: 20}}/></span>Internet Access 24/7</p><br/>

        <div className="" style={{paddingBottom:100}}>
          {token === null ?
              <button className="btn red visible" onClick={() => this.setRedirect()} style={{marginRight: 25}}>
                BOOK CENTER</button>
            :
            <Link to={`/add/${single.name}`}>
              <button className="btn red" style={{marginRight: 25}}>BOOK CENTER</button>
            </Link>
          }
        </div>
      </div>
      <div className="col l7 m12 s12">
        <img className="img-responsive w3-border" src={single.image} style={{width:'100%',height: 450, padding: 6}}/>
      </div>
    </div>
  </div>
      <div className="row w3-padding-32 font2" style={{backgroundColor: '#E5E4E2'}}>
        <div className="container">
          <div className="col s12" style={{marginBottom: 15}}>
            <ul className="tabs">
              <li className="tab col s3"><a className="active red-text" href="#test1">Upcoming Events</a></li>
              <li className="tab col s3"><a className="red-text" href="#test2">Past Events</a></li>
            </ul>
          </div>
          <div id="test1" className="col s12 m12 l12">
            {single.events ?
              newArr1.length !== 0 ?
              newArr1.map((event) => {
              const datex = event.date ;
              const newDate = datex.split('-');
              const dateArr = ['null', 'January', 'Febuary', 'March','April',  'May','June','July',
              'August', 'September','October', 'November','December'];

              let selector = '';
              if(parseInt(newDate[1]) < 10){
                selector = newDate[1][1];
              }else{
                selector = newDate[1];
              }
              const finalDate = dateArr[selector];

              const date = `${newDate[2]}, ${finalDate}`;
              return (
                <div className="eventz" key={event.id} id="eventz">
                  <div className="col s10 m2 center" >
                    <div className="black white-text" >
                      <h5 style={{padding: 10}} className="center font3">
                        <i className=" fa fa-calendar-o" /> <br/> {date}
                      </h5>
                    </div>
                  </div>
                  <div className="col s12 m9" >
                      <h2 className="font2 newTitle">{event.title}</h2>
                      <p className="blue-grey-text">{event.description}. Quisque aliquam dignissim felis,
                          a laoreet magna. Suspendisse suscipit gravida Suspendisse suscipit gravida velit vitae
                          pellentesque. Quisque
                          aliquam dignissim felis, a laoreet velit vitae pellentesque. Quisque
                          aliquam dignissim felis, a laoreet .
                      </p>
                  </div>
                </div>
              );
            })  :
            <div className="container center">
              <h2 className="font2" style={{fontSize: 20}}>
                <i className="yellow-text fa fa-exclamation-triangle"
                  style={{paddingRight:5}} aria-hidden="true" />
                  No events available for this center
              </h2>
            </div> : ''
            }
          </div>
          <div id="test2" className="col s12 m12 l12">
            {single.events ?
              pastArr1.length !== 0 ?
              pastArr1.map((event) => {
              const datex = event.date ;
              const newDate = datex.split('-');
              const dateArr = ['null', 'January', 'Febuary', 'March','April',  'May','June','July',
              'August', 'September','October', 'November','December'];

              let selector = '';
              if(parseInt(newDate[1]) < 10){
                selector = newDate[1][1];
              }else{
                selector = newDate[1];
              }
              const finalDate = dateArr[selector];

              const date = `${newDate[2]}, ${finalDate}`;
              return (
                <div className="eventz" key={event.id} id="eventz">
                  <div className="col s10 m2 center" >
                    <div className="black white-text" >
                      <h5 style={{padding: 10}} className="center font3 eventDate">
                        <i className=" fa fa-calendar-o" /> <br/> {date}
                      </h5>
                    </div>
                  </div>
                  <div className="col s12 m9" >
                      <h2 className="font2 prevTitle">{event.title}</h2>
                      <p className="blue-grey-text">{event.description}. Quisque aliquam dignissim felis,
                          a laoreet magna. Suspendisse suscipit gravida Suspendisse suscipit gravida velit vitae
                          pellentesque. Quisque
                          aliquam dignissim felis, a laoreet velit vitae pellentesque. Quisque
                          aliquam dignissim felis, a laoreet .
                      </p>
                  </div>
                </div>
              );
            })  :
            <div className="container prevInfo">
            <h2 className="font2" style={{fontSize: 20}}>
              <i className="yellow-text fa fa-exclamation-triangle"
                style={{paddingRight:5}} aria-hidden="true" />No past events available for this center</h2>
            </div> : ''
            }
          </div>
        </div>
      </div><br/><br/>

      <footer className="page-footer " style={{backgroundColor: '#212F3C'}}>
            <div className="container">
              <div className="row">
                <div className="col l6 s12">
                  <h6 className="white-text">ABOUT</h6>
                  <p className="grey-text text-lighten-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis egestas ante non maximus. Maecenas commodo lectus ligula, nec ultricies quam laoreet porta. Donec lectus nisl, porttitor ac semper molestie, sagittis non orci. In egestas diam tincidunt fringilla posuere</p>


                </div>
                <div className="col l3 s12 center">
                  <h6 className="white-text">SETTINGS</h6>
                  <ul>
                    <li><a className="white-text" href="#!">FAQ</a></li>
                    <li><a className="white-text" href="#!">Pricing</a></li>
                    <li><a className="white-text" href="#!">Notifications</a></li>
                    <li><a className="white-text" href="#!">Restaurants</a></li>
                  </ul>
                </div>
                <div className="col l3 s12 center">
                  <h6 className="white-text">CONNECT</h6>
                  <ul>
                    <li><a className="white-text" href="#!">facebook</a></li>
                    <li><a className="white-text" href="#!">Instagram</a></li>
                    <li><a className="white-text" href="#!">Twitter</a></li>
                    <li><a className="white-text" href="#!">Link 4</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-copyright">
              <div className="container">
            <a className="brown-text text-lighten-3" href="http://materializecss.com" />
              </div>
            </div>
        </footer>
    </div>
    );
  }
}


export default Details;
