import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory,Link } from 'react-router';
import jwt from 'jwt-decode';
import Footer from '../helperComponent/home/footer';
import Events from '../helperComponent/details/event';
import Reviews from '../helperComponent/details/review';
import Navigation from '../helperComponent/details/navBar';

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
        this.props.centerEvents(this.props.params.id);
        $(document).ready(function () {
        $('ul.tabs').tabs();
        });
        
    }
    componentWillReceiveProps(newProps) {
        const { single } = this.props;
        if(newProps.events.length > 0){
            newProps.events.map((event, key) => {
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
        }else{
            this.setState({newArr1: [], pastArr1: [], comment: ''});
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
    const {pastArr1, newArr1} = this.state;
    const token = localStorage.getItem('token');
    let decoded = '';
    if(token !== null){
      decoded = jwt(token);
    }
    return (
        <div className="Details">
            <Navigation token={token}/>


            <div className="section-header" style={{backgroundColor: '#E5E4E2', color: '#212F3C'}}>
                <h1 className="light">
                    <span className="w3-padding-large borderRight"><i className="fa fa-star"/></span>
                    <span className="w3-padding-large" style={{textTransform: 'uppercase'}}>{single.name} CENTER</span>
                </h1>
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
                            <li className="tab col s3 rev"><a className="red-text" href="#test3">Reviews</a></li>
                        </ul>
                    </div>



                    <div className="col s12 m12 l12" id="test3">
                        <Reviews 
                            review={review}
                            onChange={this.onChange}
                            handleSubmit={this.handleSubmit}
                            token={token}
                            decoded={decoded}
                            state={this.state}
                            setTime={this.setTime}
                        />
                    </div>


                    <div id="test1" className="col s12 m12 l12">
                        { newArr1.length !== 0 ?
                            newArr1.map((event) => {
                            return (
                                <Events period="new" key={event.id} event={event}/>
                            );
                            })  :
                        <div className="container center">
                            <h2 className="font2" style={{fontSize: 20}}>
                                <i className="yellow-text fa fa-exclamation-triangle"
                                style={{paddingRight:5}} aria-hidden="true" />
                                No events available for this center
                            </h2>
                        </div> 
                        }
                    </div>
                    <div id="test2" className="col s12 m12 l12">
                        {
                            pastArr1.length !== 0 ?
                            pastArr1.map((event) => {
                            return (
                                <Events key={event.id} period="past" event={event}/>
                            );
                        })  :
                        <div className="container prevInfo">
                            <h2 className="font2" style={{fontSize: 20}}>
                                <i className="yellow-text fa fa-exclamation-triangle" style={{paddingRight:5}} aria-hidden="true" />
                                    No past events available for this center
                            </h2>
                        </div> 
                        }
                    </div>
                </div>
            </div>
        
            <br/><br/>
            <Footer /> 
        </div>
    );
  }
}


export default Details;
