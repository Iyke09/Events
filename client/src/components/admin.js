import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Image} from 'cloudinary-react';
import cloudinary from 'cloudinary';
import { browserHistory, Link } from 'react-router';
import jwt from 'jwt-decode';
import swal from 'sweetalert';
import store from '../store';

class Admin extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      description: '',
      capacity: '',
      location: '',
      image: '',
      price: '',
    };

    this.onChange = this.onChange.bind(this);
    this.getMore = this.getMore.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    let decoded = '';
    const token = localStorage.getItem('token');
    if(token === null ){
       browserHistory.push('/auth/signin');
    }else{
      decoded = jwt(token);
      if(decoded.adminUser === undefined){
        browserHistory.push('/');
      }
    }
    this.props.getCenters(3);
  }
  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  getMore(index){
    this.props.getCenters(index);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loaders();
    console.log(this.state);
    this.props.addCenter(this.state);
    document.getElementById("add-form").reset();
  }
  render() {
    const { centers, error, loader, success } = this.props;
    console.log(error);
    if(success){
      return swal("Center Added!", "You've successfully added a new center", "success");
    }
    return (
      <div className="Admin">
        <div className="row">
          <div className="col l4 s12 m12">
            <ul id="slide-out" className="side-nav fixed white-text" style={{backgroundColor: '#17202A'}}>
              <li><div className="user-view">
                <div className="background">
                  <img src="https://static.pexels.com/photos/326559/pexels-photo-326559.jpeg"/>
                </div>
                <a href="#!user"><img className="circle" src="https://static.pexels.com/photos/324658/pexels-photo-324658.jpeg"/></a>
                <a href="#!name"><span className="white-text name">Admin-001</span></a>
                <a href="#!email"><span className="white-text email">admin-001@gmail.com</span></a>
              </div></li>
              <li><a className="white-text" href="#!"><i className="material-icons grey-text">cloud</i>Cloudy - 24-09, 2017 </a></li>
              <li><a className="white-text" href="#!">ID:3456565646JD</a></li>
              <li><div className="divider" /></li>
              <li>
                <Link to={"/"}>
                  <a className="waves-effect white-text">
                  <i className="fa fa-home grey-text" />HOME</a>
                </Link>
              </li>
              <li><a className="waves-effect white-text" href="#!"> <i className="fa fa-plus grey-text" /> Add Center</a></li>
              <li><a className="waves-effect white-text" href="#!"><i className="fa fa-envelope grey-text" />Messages</a></li>
            </ul>
            <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
          </div>
          <div className="col s12 m12 l8 " style={{paddingTop: 100}}>
            <div className="row">
              {centers.map((center) => {
                return (
                  <div className="col s12 m12 l4" key={center.id}>
                    <div className="card w3sets" id="minor">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator"
                        src={center.image}/>
                        <div className="update" id="minor-l">
                          <Link to={`/user/admin/edit/${center.id}`}>
                            <span className="fa-stack fa-lg ">
                              <i className="fa fa-circle fa-stack-2x" />
                              <i className="fa fa-edit fa-stack-1x fa-inverse" />
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{center.name}
                          <i className="material-icons right">more_vert</i></span>
                      </div>
                      <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4 center">The Emporium
                          <i className="material-icons right">close</i></span>
                        <p><i className="material-icons">add_location</i> 25 Victoria Island,Lagos.</p>
                        <p><i className="material-icons">attach_money</i> 2500/day</p>
                        <p><i className="material-icons">people</i> 4000 capacity</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div onClick={(e) => this.getMore(centers.length + 3)} className="col s12">
              <button className="btn red">view more centers </button>
            </div>
             <br/><br/><br/><br/>
            <div className="card " style={{backgroundColor: '#FBFCFC'}}>
              <div className="card-content ">
                  { error ?
                    <div className="w3-panel w3-card-2 w3-small w3-red w3-display-container hyper">
                      <span onClick={this.onHit}
                      className="w3-button w3-red w3-display-topright">&times;</span>
                      <p className=""><i className="yellow-text fa fa-exclamation-triangle"
                      style={{paddingRight:5}} aria-hidden="true" /> {error}</p>
                    </div> : ''
                  }
                <form className="row" id="add-form" onSubmit={this.handleSubmit}>
                { loader ?
                  <div className="preloader-wrapper center big active" id="loads">
                    <div className="spinner-layer spinner-blue">
                      <div className="circle-clipper left">
                        <div className="circle" />
                      </div><div className="gap-patch">
                        <div className="circle" />
                      </div><div className="circle-clipper right">
                        <div className="circle" />
                      </div>
                    </div>
                  </div> : ''
                }

                  <h4 className="col s12 center light">Add a Center!</h4>
                  <small className="col s12 center light font3">
                  Lorem ipsum dolor sit amet</small>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">home</i>
                      <input id="icon_telephone" type="tel"
                      onChange={this.onChange} name="name" className="validate" placeholder="Name" required/>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">add_a_photo</i>
                      <input id="icon_telephone" name="image" type="text"
                      onChange={this.onChange} className="validate" placeholder="image_url" required/>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">add_location</i>
                      <input id="icon_telephone" name="location" type="text"
                      onChange={this.onChange} className="validate" placeholder="Address" required/>
                    </div>
                    <div className="row">
                      <div className="col s6">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">attach_money</i>
                          <input id="icon_telephone" name="price" type="number"
                          onChange={this.onChange} className="validate" placeholder="Price" />
                        </div>
                      </div>
                      <div className="col s6">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">people</i>
                          <input id="icon_telephone" name="capacity" type="number"
                          onChange={this.onChange} className="validate" placeholder="Capacity" required/>
                        </div>
                      </div>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">mode_edit</i>
                      <textarea id="icon_prefix2" onChange={this.onChange} name="description"
                      className="materialize-textarea" required/>
                      <label htmlFor="icon_prefix2">Description</label>
                    </div>
                    <div className="" style={{textAlign: 'center'}}>
                      <button type="submit"
                      className="btn waves-effect waves-light red lighten-1">Add Center</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  </div>
    );
  }
}

export default Admin;
