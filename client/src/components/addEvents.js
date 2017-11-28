import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../store';
import { Link } from 'react-router';

class Add extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      title: '',
      time: '',
      date: 0,
      guests: 0,
      type: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    this.props.getCenters(4);
  }
  componentDidMount(){
    $(document).ready(function() {
      $('select').material_select();
    });
  }
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
    const x = document.getElementById("sel").value;
    this.setState({value: x});
  }
  handleSubmit(e) {
    e.preventDefault();
    store.dispatch({type: 'LOAD'});
    const x = document.getElementById("sel").value;
    this.setState({value: x});
    console.log(this.state);
    this.props.addEvent(this.state);
  }
  render() {
    const {centers, success, loader, error} = this.props;
    return (
      <div className="Add">
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
        <div className="overlay" />
        <div id="" className="bgimg">
          <div className="row">
            <div className="col s12 m12 l6 offset-l3 " style={{marginTop: 245}}>
              <div className="" id="container">
                <div className="">
                  <div className="row">
                    <div className="card col s12" style={{backgroundColor: 'transparent'}}>
                      <div className="card-content white lighten-4" style={{color: '#212F3C'}}>
                        <div id="test4" style={{border: '2 solid lightgrey'}}>
                          <div className="row">
                            <form className="col s12" onSubmit={this.handleSubmit}>
                            { error ?
                              <div className="w3-panel w3-card-2 w3-small w3-red w3-display-container hyper">
                                <span onClick={this.onHit}
                                className="w3-button w3-red w3-display-topright">&times;</span>
                                <p className=""><i className="yellow-text fa fa-exclamation-triangle"
                                style={{paddingRight:5}} aria-hidden="true" /> {error}</p>
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
                                <div className="w3-panel w3-card-2 w3-small w3-green w3-display-container hyper">
                                  <span onClick={this.onHit}
                                  className="w3-button w3-green w3-small w3-display-topright">&times;</span>
                                  <p className=""><i className=" fa fa-thumbs-up"
                                  style={{paddingRight:5}} aria-hidden="true" /> {success}</p>
                                </div> : ''
                              }
                              <h4 className="col s12 center light">Add an Event!</h4>
                              <small className="col s12 center light font3">Lorem ipsum dolor sit amet</small>
                              <div className="row">
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">mail</i>
                                  <input id="icon_telephone" type="tel" name="title" className="validate" onChange={this.handleChange}/>
                                  <label htmlFor="icon_telephone">Enter title</label>
                                </div>
                                <div className="input-field col s12 ">
                                  <i className="material-icons prefix">home</i>
                                  <select value={this.state.value} id="sel" onChange={this.handleChange}>
                                    {
                                      centers.map((center) => {
                                        return (<option key={center.id}
                                          value={center.name}>{center.name}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">alarm_on</i>
                                  <input id="icon_telephone" type="tel" name="time" className="validate" onChange={this.handleChange}/>
                                  <label htmlFor="icon_telephone">Select a time</label>
                                </div>
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">event</i>
                                  <input id="icon_telephone" type="number" name="date" className="validate" onChange={this.handleChange}/>
                                  <label htmlFor="icon_telephone" />
                                </div>
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">check</i>
                                  <input id="icon_telephone" type="text" name="type" className="validate"
                                  onChange={this.handleChange}/>
                                  <label htmlFor="icon_telephone" />
                                </div>
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">perm_identity</i>
                                  <input id="icon_telephone" type="number" name="guests" className="validate" onChange={this.handleChange}/>
                                  <label htmlFor="icon_telephone">Expected guests</label>
                                </div>
                              </div>
                              <div className="" style={{textAlign: 'center'}}>
                              <button type="submit"
                              className="btn waves-effect waves-light red lighten-1">Add Event</button>
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
    );
  }
}


export default Add;
