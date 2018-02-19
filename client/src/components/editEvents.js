import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../store';
import { Link, browserHistory} from 'react-router';
import swal from 'sweetalert';

class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      center: '',
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
    store.dispatch({type: 'ERROR', error: ''});
    this.props.getSingleEvents(this.props.params.id);
  }
  componentWillReceiveProps(newProps){
    this.setState(newProps.singleEvent);
  }
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
    this.setState({center: this.state.Center.name});
  }
  closeErrMsg(){
    console.log('herrro');
    store.dispatch({type: 'ERROR', error: ''});
  }
  handleSubmit(e) {
    e.preventDefault();
    if(new Date().getTime() > new Date(this.state.date).getTime()){
      store.dispatch({type: 'ERROR', error: 'Please enter a recent valid date'});
    }else{
      this.setState({center: this.state.Center.name});
      this.props.loaders();
      console.log(this.state);
      this.props.updateEvent(this.state, this.props.params.id);
      document.getElementById("add-form").reset();
    }
  }
  render() {
    const {events, success, loader, error} = this.props;
    const token = localStorage.getItem('token');
    return (
      <div className="Add">
        <nav className="" role="navigation" style={{backgroundColor: '#212F3C'}}>
          <div className="nav-wrapper container">
            <Link to={"/"}>
              <a id="logo-container " className="brand-logo white-text">Andela</a>
            </Link>
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

        <div id="" className="bgimg7">
          <div className="row">
            <div className="col s12 m12 l6 offset-l3 " style={{paddingTop: 25}}>
              <div className="" id="container">
                <div className="">
                  <div className="row">
                    <div className="card col s12" style={{backgroundColor: 'transparent'}}>
                      <div className="card-content white lighten-4" style={{color: '#212F3C'}}>
                        <div id="test4" style={{border: '2 solid lightgrey'}}>
                          <div className="row">
                            <form className="col s12" id="add-form" onSubmit={this.handleSubmit}>
                            { error ?
                              <div style={{ borderRadius: 7}} className="w3-panel red white-text error hyper">
                                <p className="w3-padding-medium err_para"><i className="yellow-text fa fa-exclamation-triangle"
                                style={{paddingRight:5}} aria-hidden="true" /><span id="err_msg">{error}</span>
                                <span style={{cursor: 'pointer'}}
                                className=" right" >
                                <a onClick={this.closeErrMsg} className="white-text">x</a></span></p>
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
                              swal("Event Updated!", "You successfully updated your event", "success") : ''
                            }
                              <h4 className="col s12 center light">Update Event!</h4>
                              <small className="col s12 center light font3">Lorem ipsum dolor sit amet</small>
                              <div className="row">
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">home</i>
                                  <input id="home" type="tel" name="center"
                                  className="validate" value={this.state.Center ? this.state.Center.name : ''}
                                  onChange={this.handleChange} />
                                  <label htmlFor="home">Center</label>
                                </div>
                                <div className="input-field col s12 m6">
                                  <i className="material-icons prefix">mail</i>
                                  <input id="mail" type="tel" value={this.state.title} name="title"
                                  className="validate inputx title" onChange={this.handleChange}/>
                                  <label htmlFor="mail">Event Title</label>
                                </div>
                                <div className="input-field col s12 m6">
                                  <i className="material-icons prefix">alarm_on</i>
                                  <input id="alarm_on" type="time" name="time" value={this.state.time}
                                  className="validate" onChange={this.handleChange}/>
                                  <label htmlFor="alarm_on" />
                                </div>
                                <div className="input-field col s12 m6">
                                  <i className="material-icons prefix">event</i>
                                  <input id="event" type="date" value={this.state.date} name="date"
                                  className="validate" onChange={this.handleChange}/>
                                  <label htmlFor="event" />
                                </div>
                                <div className="input-field col s12 m6">
                                  <i className="material-icons prefix">check</i>
                                  <input id="check" type="text"
                                  value={this.state.type} name="type" className="validate type"
                                  onChange={this.handleChange}/>
                                  <label htmlFor="check">Type of Event</label>
                                </div>
                                <div className="input-field col s12">
                                  <i className="material-icons prefix">perm_identity</i>
                                  <input id="icon_telephone" type="number" value={this.state.guests} name="guests" className="validate" onChange={this.handleChange}/>
                                  <label htmlFor="icon_telephone">Expected guests</label>
                                </div>
                              </div>
                              <div className="" style={{textAlign: 'center'}}>
                              <button type="submit"
                              className="btn waves-effect waves-light red lighten-1">Update Event</button>
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

Edit.propTypes = {
  updateEvent: PropTypes.func,
  events: PropTypes.object,
  loader: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.string,
  loaders: PropTypes.func,
  getSingleEvents: PropTypes.func,
  params: PropTypes.number
};


export default Edit;
