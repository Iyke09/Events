import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory,Link } from 'react-router';
import jwt from 'jwt-decode';

let newArr = [];
let pastArr = [];
class Details extends React.Component {
  constructor(){
    super();
    this.state = {
      newArr1: [],
      pastArr1: [],
      comment: '',
    };
    this.setRedirect = this.setRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setTime = this.setTime.bind(this);
  }
  componentWillMount() {
    this.props.getSingle(this.props.params.id);
    this.props.getReviews(this.props.params.id);
    $(document).ready(function () {
      $('ul.tabs').tabs();
    });
  }
  componentWillReceiveProps(newProps) {
    const { single } = this.props;
    let newArr1, pastArr1 = [];
    console.log('hello majiks ' + newProps.single.events);
    if (newProps.single.events) {
      if (newProps.single.events.length !== 0) {
        newProps.single.events.map((event, key) => {
          if (new Date().getTime() < new Date(event.date).getTime()) {
            this.setState((prev, next) => {
              return { newArr1: [...prev.newArr1, event] };
            });
          } else {
            this.setState((prev, next) => {
              return { pastArr1: [...prev.pastArr1, event] };
            });
          }
        });
      }

    }
  }
  setRedirect() {
    const {single} = this.props;
    localStorage.setItem('route', `/add/${single.name}`);
    browserHistory.push('/auth/signin');
  }
  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    //this.props.loaders();
    const token = localStorage.getItem('token');
    if(token !== null){
      const decoded = jwt(token);
      const {username} = decoded.user;
      const payload = {username, id: this.props.params.id, comment: this.state.comment};
      this.props.addReview(payload);
      document.getElementById("add-form").reset();
    }
  }
  setTime(input){
    let time = '';
    let minutes = '';
    let hours = '';
    let days = '';
    const currTime = Math.floor(parseInt(Date.now() - new Date(input).getTime()) / 1000);
    if (currTime < 59){
      time = `${currTime}s`;
    }
    else if (currTime > 59 && currTime < 3600) {
      minutes = Math.floor(currTime / 60);
      time = `${minutes}m`;
    }
    else if (currTime >= 3600 && currTime < 86400) {
      hours = Math.floor(currTime / 3600);
      time = `${hours}h`;
    }
    else if (currTime >= 86400) {
      days = Math.floor(currTime / 86400);
      time = `${days}d`;
    }
    return time;
  }
  render() {
    const {single, review} = this.props;
    console.log(review);
    const {pastArr1, newArr1} = this.state;
    const token = localStorage.getItem('token');
    let decoded = '';
    if(token !== null){
      decoded = jwt(token);
    }

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
              <li className="tab col s3"><a className="red-text" href="#test3">Reviews</a></li>
            </ul>
          </div>



          <div className="col s12 m12 l12" id="test3">
              {review.length > 0 ? review.map((comment, key) => {
                const color = ['red', 'grey', '#212F3C'];
                const randColor = color[key];
                return (
                  <div key={key}>
                    <div className="col s12 m12 l10">
                      <div className="col s3 m1 center" >
                        <div className=" white-text w3-display-container"
                        style={{borderRadius: '100%', width: 50, height: 50, background: randColor}}>
                          <h1 style={{textTransform: 'lowercase'}} className="font2">{comment.user.split('')[0]}
                            </h1>
                        </div>
                      </div>
                      <div className="col s9 m11 left-align" >
                          <h2 className="font2 newTitle">{comment.user}
                            <span className="grey-text" style={{fontSize: 14, marginLeft: 6}}><small>{this.setTime(comment.updatedAt)} Ago</small></span></h2>
                          <p className="blue-grey-text">{comment.comment} --> Quisque aliquam dignissim felis,
                              a laoreet magna. Suspendisse suscipit gravida Suspendisse suscipit gravida velit vitae
                              pellentesque.
                          </p>
                      </div>
                    </div>
                  <div className="col s12 m12 l2"/>
                </div>
                );
              }) : ''}
            <br/><br/>
            <form id="add-form" className="" onSubmit={this.handleSubmit} style={{marginTop: 100}}>
              <div className="input-field col l10 s12 m12">
                <i className="material-icons prefix">account_circle</i>
                <textarea id="icon_prefix2" onChange={this.onChange} name="comment"
                className="materialize-textarea" value={this.state.description} required/>
                <label htmlFor="icon_prefix2">Leave A Comment</label>
              </div>
              <div className="col l10 s12">
                <button style={{borderRadius: '25%'}} type="submit"
                className="right btn waves-effect waves-light red lighten-1" disabled={token === null || decoded.adminUser ? true : false}>Send</button>
              </div>
            </form>
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
