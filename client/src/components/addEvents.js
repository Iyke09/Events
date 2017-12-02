import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../store';
import { Link, browserHistory} from 'react-router';
import swal from 'sweetalert';

class Add extends Component {
  constructor(props){
    super(props);
    this.state = {
      centerSet: '',
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
    const token = localStorage.getItem('token');
    if(token === null){
      browserHistory.push('/auth/signin');
    }
  }

  componentDidMount(){
    this.props.getCenters(4);
    this.setState({centerSet: this.props.params.id});
    $(document).ready(function() {
      $('select').material_select();
    });
  }
  handleChange(e){
    e.preventDefault();
    console.log('hello');
    this.setState({[e.target.name]: e.target.value});
    const x = document.getElementById("sel").value;
    this.setState({value: x});
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.loaders();
    const x = document.getElementById("sel").value;
    this.setState({value: x});
    console.log(this.state);
    this.props.addEvent(this.state);
    document.getElementById("add-form").reset();
  }
  render() {
    const {centers, success, loader, error} = this.props;
    const {centerSet} = this.state;
    console.log(error);
    const token = localStorage.getItem('token');
    return (
      <div className="Adds">
        <nav className="" role="navigation" style={{backgroundColor: '#212F3C'}}>
          <div className="nav-wrapper container">
            <a id="logo-container " href="" className="brand-logo white-text">Andela</a>
            <ul className="right hide-on-med-and-down">
                <li>
                  <Link to={"/user/events"}>
                    My Events
                  </Link>
                </li>
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

        <div id="" className="bgimg7" style={{}}>
          <div className="row">
            <div className="col s12 m12 l6 offset-l3 ">
              <div className="" id="container">
                <div className="">
                  <div className="row">
                    <div className="card col s12" >
                      <div className="card-content white lighten-4" style={{color: '#212F3C'}}>
                        <div id="test4" style={{border: '2 solid lightgrey'}}>
                          <div className="row">

                          <form className="col s12" id="add-form" onSubmit={this.handleSubmit}>
                            { error ?
                              <div className="w3-panel w3-card-2 w3-small w3-red w3-display-container hyper">
                                <span
                                className="w3-button w3-red w3-display-topright" />
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
                              swal("Event Added!", "You successfully added an event", "success") : ''
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
                                  <select id="sel" onChange={this.handleChange}>
                                    {
                                      centers.map((center) => {
                                        return (<option key={center.id}
                                        selected={centerSet === center.name ? true : false}>{center.name}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">alarm_on</i>
                                  <input id="icon_telephone" type="time" name="time" className="validate" onChange={this.handleChange}/>
                                  <label htmlFor="icon_telephone" />
                                </div>
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">event</i>
                                  <input id="icon_telephone" type="date" name="date"
                                  className="validate" onChange={this.handleChange}/>
                                  <label htmlFor="icon_telephone" />
                                </div>
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">check</i>
                                  <input id="icon_telephone" type="text" name="type" className="validate"
                                  onChange={this.handleChange}/>
                                  <label htmlFor="icon_telephone">Type of Event</label>
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
