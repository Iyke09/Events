import React, { Component } from 'react';
import store from '../store';


let preloader = false;
class Centers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    store.dispatch({type: 'LOAD'});
    console.log(this.state);
    this.props.signin(this.state);
    document.getElementById("add-form").reset();
  }
  render() {
    const {error, loader} = this.props;
    return (
      <div className="Centers">
        <div className="" id="">
          <nav className="" role="navigation" style={{backgroundColor: '#212F3C'}}>
            <div className="nav-wrapper container">
              <a id="logo-container " href="" className="brand-logo white-text">Andela</a>
              <ul className="right hide-on-med-and-down">
                <li><a href="">Login</a></li>
                <li className=""><a href="">Register</a></li>
              </ul>

              <ul id="nav-mobile" className="side-nav">
                <li><a href="#">Andela</a></li>
              </ul>
              <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            </div>
          </nav>
          <div className="overlay" />
          <div id="bgPage" className="bgimg">
            <div className="row">
              <div className="col s12 m12 l5 white-text" id="tp-row">
                <div className="" id="tp-child">
                  <h3>Sign Up</h3>
                </div>

                <p>Lorem Ipsum It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been<br/><br/> The only five centuries, but also the leap into electronic typesetting, remaining essentially </p>
                <p>Already a Member??</p><br/>
                <a href="" id="download-button" className="btn red">Sign Up</a>
              </div>
              <div className="col s12 m12 l7" style={{paddingTop: 45}}>
                <div className="" id="container">
                  <div className="">
                    <div className="row">
                      <div className="card col m8 offset-m2">
                        <div className="card-content white lighten-4" style={{color: '#212F3C'}}>
                        <div className="col s8 offset-s2">
                          <div className="col s6">
                            <a className="waves-effect waves-light btn blue">
                              <i className="material-icons left" />Facebook</a>
                          </div>
                          <div className="col s6">
                            <a className="waves-effect waves-light btn red"><i
                            className="material-icons left" />Google</a>
                          </div>
                        </div>
                        <div id="test4">
                          <div className="row">
                            <form id="add-form" className="col s12" onSubmit={this.handleSubmit}>
                              { error ?
                                <div className="w3-panel w3-card-2 w3-medium w3-red w3-display-container hyper">
                                  <span onClick={this.onHit}
                                  className="w3-button w3-red w3-display-topright" />
                                  <p className=""><i className="yellow-text fa fa-exclamation-triangle" style={{paddingRight:5}} aria-hidden="true" /> {error}</p>
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
                              <div className="row">
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">mail</i>
                                  <input id="icon_telephone" name="email" type="tel"
                                  onChange={this.onChange}
                                  placeholder="Email"
                                  className="validate"/>
                                  <label htmlFor="icon_telephone" />
                                </div>
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">lock</i>
                                  <input id="icon_telephone" name="password" type="tel"
                                  onChange={this.onChange}
                                  placeholder="Password"
                                  className="validate"/>
                                  <label htmlFor="icon_telephone" />
                                </div>
                              </div>
                              <div className="" style={{textAlign: 'center'}}>
                              <button type="submit" className="waves-effect waves-light btn red"><i
                              className="" />Sign In</button>
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
