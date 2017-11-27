import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
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
      price: ''
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    this.props.getSingle(this.props.params.id);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.single) {
      this.setState(newProps.single);
    }
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    store.dispatch({type: 'LOAD'});
    console.log(this.state);
    const index = this.props.params.id;
    this.props.updateCenter(this.state, index);
    // document.getElementById("add-form").reset();
  }
  render() {
    const { error, single,loader, success } = this.props;
    console.log(single);
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
              <li><a className="waves-effect white-text" href="./index.html"><i className="fa fa-home grey-text" />HOME</a></li>
              <Link to={`/user/admin`}>
              <li>
                  <a className="waves-effect white-text">
                  <i className="fa fa-plus grey-text" /> Add Center
                  </a>
              </li>
              </Link>
              <li><a className="waves-effect white-text" href="#!"><i className="fa fa-envelope grey-text" />Messages</a></li>
            </ul>
            <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
          </div>
          <div className="col s12 m12 l8 " style={{paddingTop: 100}}>
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
                { success ?
                  <div className="w3-panel w3-red w3-display-container">
                    <span onClick="this.parentElement.style.display='none'"
                    className="w3-button w3-red w3-large w3-display-topright">&times;</span>
                    <p><i className=" fa fa-thumbs-up"
                      style={{paddingRight:5}} aria-hidden="true" />
                      {success}</p>
                  </div> : ''
                  }
                  { loader ?
                  <div className="preloader-wrapper active" id="loads">
                    <div className="spinner-layer spinner-red-only">
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
                  <h4 className="col s12 center light">Edit Center!</h4>
                  <small className="col s12 center light font3">
                  Lorem ipsum dolor sit amet</small>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">home</i>
                      <input id="icon_telephone" type="tel"
                      onChange={this.onChange}
                      value={this.state.name}
                      name="name" className="validate" placeholder="" required/>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">add_a_photo</i>
                      <input id="icon_telephone" name="image" type="text"
                       value={this.state.image} onChange={this.onChange}
                       className="validate" placeholder="Image_URL" />
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">add_location</i>
                      <input id="icon_telephone"
                      value={this.state.location} name="location" type="text"
                      onChange={this.onChange}
                       className="validate" placeholder="" required/>
                    </div>
                    <div className="row">
                      <div className="col s6">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">attach_money</i>
                          <input id="icon_telephone" value={this.state.price} name="price" type="number"
                          onChange={this.onChange}
                            className="validate" placeholder="" />
                        </div>
                      </div>
                      <div className="col s6">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">people</i>
                          <input id="icon_telephone" value={this.state.capacity} name="capacity" type="number"
                          onChange={this.onChange}
                           className="validate" placeholder="" required/>
                        </div>
                      </div>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">mode_edit</i>
                      <textarea id="icon_prefix2" value={this.state.description} onChange={this.onChange}
                      name="description"
                      className="materialize-textarea" required/>
                    </div>
                    <div className="" style={{textAlign: 'center'}}>
                      <button type="submit"
                      className="btn waves-effect waves-light red lighten-1">Edit Center</button>
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
