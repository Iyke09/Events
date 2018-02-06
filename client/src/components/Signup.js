import React, { Component } from 'react';
import store from '../store';
import swal from 'sweetalert';
import { Link, browserHistory } from 'react-router';
import { FacebookLogin } from 'react-facebook-login-component';
import Rwg from 'random-word-generator';
// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin } from 'react-google-login-component';

let preloader;
class Centers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  authenticate(response){
    const randName = new Rwg().generate();
    if(response.accessToken){
      console.log(response);
      const facebookName = response.accessToken.slice(0, 5);
      this.props.signin({email: `foo${response.id}@foo.com`, password: 'annonymous'});
    }
  }
  responseGoogle(response){
    console.log(response);
    let { error } = this.props;
    const id_token = response.getAuthResponse().id_token;
    if(id_token){
      const googleName = id_token.slice(0, 10);
      this.props.signin({email: `${googleName}@foo.com`, password: 'annonymous'});
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.loaders();
    this.props.signup(this.state);
    document.getElementById("add-form").reset();
  }
  render() {
    const {error, loader, success} = this.props;
    const MyFacebookButton = ({ onClick }) => (
      <button className="waves-effect waves-light btn blue" onClick={onClick}>
         facebook
      </button>
    );
    return (
      <div className="Centers">
        <div className="" id="">
          <nav className="" role="navigation" style={{backgroundColor: '#212F3C'}}>
            <div className="nav-wrapper container">
            <Link to={"/"}>
              <a id="logo-container " className="brand-logo white-text">Andela</a>
            </Link>
              <ul className="right hide-on-med-and-down" />

              <ul id="nav-mobile" className="side-nav">
                <li><a href="#">Andela</a></li>
              </ul>
              <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            </div>
          </nav>
          {/* <div className="overlay" /> */}
          <div id="bgPage" className="bgimg">
            <div className="row">
              <div className="col s12 m12 l5 white-text hide-on-med-and-down" id="tp-row">
                <div className="" id="tp-child">
                  <h3>Sign Up</h3>
                </div>

                <p>Lorem Ipsum It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been<br/><br/> The only five centuries, but also the leap into electronic typesetting, remaining essentially </p>
                <p>Already a Member??</p><br/>
                <Link to={"/auth/signin"}>
                  <a id="download-button" className="btn red login">Sign In</a>
                </Link>
              </div>
              <div className="col s12 m12 l7" style={{paddingTop: 45}}>
                <div className="" id="container">
                  <div className="">
                    <div className="row">
                      <div className="card col m8 offset-m2">
                        <div className="card-content white lighten-4" style={{color: '#212F3C'}}>
                        <div className="col s8 offset-s2">
                          <FacebookLogin socialId="1835467386744019"
                            language="en_US"
                            scope="public_profile,email"
                            responseHandler={this.authenticate}
                            xfbml
                            fields="id,email,name"
                            version="v2.5"
                            className="facebook-login waves-effect waves-light btn blue"
                            buttonText="Facebook"/>
                          <div className="col s6">
                            <GoogleLogin socialId="994244618792-vcuu6ftsds0bv98gu1urlup3rh6923hk.apps.googleusercontent.com"
                            className="google-login waves-effect waves-light btn red"
                            scope="profile"
                            fetchBasicProfile={false}
                            responseHandler={this.responseGoogle}
                            buttonText="Google"/>
                          </div>
                        </div>
                        <div id="test4">
                          <div className="row">
                            <form id="add-form" className="col s12" onSubmit={this.handleSubmit}>
                              { error ?
                                <div
                                className="w3-panel w3-card-2 w3-medium w3-red error w3-display-container hyper" id="error">
                                  <span onClick={this.onHit}
                                  className="w3-button w3-red w3-display-topright" />
                                  <p className="text"><i className="yellow-text fa fa-exclamation-triangle"
                                  style={{paddingRight:5}} aria-hidden="true" /><span id="err_msg"> {error}</span></p>
                                </div> : ''
                              }
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
                              { success ?
                                swal("Success!!!", "You've successfully signed up", "success") : null
                              }
                              <div className="row">
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">account_circle</i>
                                  <input id="icon_prefix" name="username" type="text"
                                    onChange={this.onChange}
                                    placeholder="User name..."
                                  className="validate username" required/>
                                  <label htmlFor="icon_prefix" />
                                </div>
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">mail</i>
                                  <input id="icon_telephone" name="email" type="email"
                                  onChange={this.onChange}
                                  placeholder="Email"
                                  className="validate"/>
                                  <label htmlFor="icon_telephone" required/>
                                </div>
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">lock</i>
                                  <input id="icon_telephone" name="password" type="password"
                                  onChange={this.onChange}
                                  placeholder="Password"
                                  className="validate passwordz" required/>
                                  <label htmlFor="icon_telephone" />
                                </div>
                              </div>
                              <div className="" style={{textAlign: 'center'}}>
                              <button type="submit" className="waves-effect waves-light btn red"><i
                              className="submit" />submit</button>
                              </div>
                            </form>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Centers;
