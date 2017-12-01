import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

class Details extends React.Component {
  constructor(){
    super();
    this.state = {
      user: null
    };
    this.setRedirect = this.setRedirect.bind(this);
  }
  componentWillMount(){
    this.props.getSingle(this.props.params.id);
  }
  setRedirect(){
    const {single} = this.props;
    localStorage.setItem('route', `/add/${single.name}`);
    browserHistory.push('/auth/signin');
  }
  render() {
    const {single} = this.props;
    const token = localStorage.getItem('token');
    console.log(single);
    return (
      <div className="Details">
        <nav className="" role="navigation" style={{backgroundColor: '#212F3C'}}>
          <div className="nav-wrapper container">
            <a id="logo-container " href="" className="brand-logo white-text">Andela</a>
            <ul className="right hide-on-med-and-down">
                <li>
                  <Link to={"/user/events"}>
                    My Events
                  </Link>
                </li>
                <li><a href="">Login</a></li>
                <li className=""><a href="">Register</a></li>
            </ul>

            <ul id="nav-mobile" className="side-nav">
              <li><a href="#" /></li>
            </ul>
            <a href="" data-activates="nav-mobile"
            className="button-collapse"><i className="material-icons">menu</i></a>
          </div>
        </nav>


  <div className="bgimg4" style={{ height: 450}} id="w3set">
    <img className="" src={single.image}
      style={{width:'100%',height: 450}}/>
    <div className="overlay" style={{height: 450}} />
  	<div className="row center pos">
  		<h1 className="header col s12 light white-text w3-jumbo">{single.name}</h1>
  		<p className="slant white-text">
        <i>Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nunc id odio mollis, luctus ex at, accumsan magna....
        </i>
      </p>
  	</div>
  </div>
  <div className="container" style={{paddingTop: 55, paddingBottom: 55}}>
    <h3 className="light font">Experience Hall like no other</h3>
    <h5 className="blue-grey-text">Quisque aliquam dignissim felis, a laoreet lacus .</h5>
    <h6 className="font2" style={{fontSize: 18}}> <i className="fa fa-map-marker"
    style={{width:30}} /> {single.location}</h6>


    <p className="font2" style={{ fontSize: 20}}>
        {single.description}
       Donec placerat molestie sapien ac eleifend. Phasellus vulputate
       sagittis libero. In consectetur efficitur In consectetur efficitur erat, sit amet laoreet velit tempor nec.
       Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus erat, sit amet laoreet velit tempor nec.
       Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
  </div>
<br/><br/>

      <div className="row container">
        <div className="col s12 m12 l12 font3">
          <h2 className="font" >Facilities!</h2>
          <hr className=""/><br/>

          <div className="col s12 m12 l4">
            <div className="card-panel grey lighten-5 z-depth-1">
              <div className="row valign-wrapper">
                <div className="col s2">
                <span className="fa-stack fa-lg">
                  <i className="fa fa-circle fa-stack-2x" />
                  <i className="fa fa-home fa-stack-1x fa-inverse" />
                </span>
                </div>
                <div className="col s10">
                  <span className="black-text">
                    This is a square image. Add the "circle" class to it to make it appear circular.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col s12 m12 l4">
            <div className="card-panel grey lighten-5 z-depth-1">
              <div className="row valign-wrapper">
                <div className="col s2">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x" />
                    <i className="fa fa-cab fa-stack-1x fa-inverse" />
                  </span>
                </div>
                <div className="col s10">
                  <span className="black-text">
                    This is a square image. Add the "circle" class to it to make it appear circular.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col s12 m12 l4">
            <div className="card-panel grey lighten-5 z-depth-1">
              <div className="row valign-wrapper">
                <div className="col s2">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x" />
                    <i className="fa fa-group fa-stack-1x fa-inverse" />
                  </span>
                </div>
                <div className="col s10">
                  <span className="black-text">
                    4000 max capacity...add the "circle" class to it to make it appear circular.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div><br/><br/>
      <div className="row container">
        <div className="col s12 m12 l12">
          <h2 className="font" >Upcoming Events!</h2>
          <hr className=""/><br/>
          {single.events ?
            single.events.map((event) => {
            const citrus = event.date.split(' ').slice(0, -1).join().split(',');
            const date = `${citrus[0]}, ${citrus[2]}`;
            return (
              <div className="" key={event.id}>
                <div className="col s3 center" >
                  <div className="black white-text" >
                    <h5 style={{padding: 10}} className="center font3">
                      <i className=" fa fa-calendar-o" /> <br/> {date} </h5>
                  </div>
                </div>
                <div className="col s9" >
                    <h2 className="font3">{event.title}</h2>
                    <p style={{color: '#ABB2B9'}}>{event.description}. Quisque aliquam dignissim felis,
                        a laoreet magna. Suspendisse suscipit gravida Suspendisse suscipit gravida velit vitae
                         pellentesque. Quisque
                        aliquam dignissim felis, a laoreet velit vitae pellentesque. Quisque
                        aliquam dignissim felis, a laoreet .</p>
                </div>
              </div>
            );
          })  : ''

          }
        </div>
      </div><br/><br/><br/>
      {token === null ?
          <button className="btn red right" onClick={() => this.setRedirect()} style={{marginRight: 25}}>BOOK CENTER</button>
        :
        <Link to={`/add/${single.name}`}>
          <button className="btn red right" style={{marginRight: 25}}>BOOK CENTER</button><br/><br/><br/>
        </Link>
      }
      </div>
    );
  }
}


export default Details;
