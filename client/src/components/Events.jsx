import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode';
import store from '../store';
import { Link, browserHistory} from 'react-router';
import swal from 'sweetalert';
import Form from '../helperComponent/events/form';

class Events extends Component {
  constructor(props){
    super(props);
    this.state = {
      centerSet: '',
      center: '',
      title: '',
      time: '12:00',
      date: "0",
      guests: 0,
      type: '',
      Center: 'testing',
      selectedCenter: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeErrMsg = this.closeErrMsg.bind(this);
    this.activeRoute = this.activeRoute.bind(this);
  }
  componentWillMount(){
    this.props.getCenters(20);
    store.dispatch({type: 'ERROR', error: ''});
    const token = localStorage.getItem('token');
    if(token === null){
      browserHistory.push('/auth/signin');
    }
    this.setState({centerSet: this.props.params.id });
  }
  componentDidMount(){
    if(this.props.location.pathname.indexOf('edit') !== -1){
      this.props.getSingleEvents(this.props.params.id);
    }
    $(document).ready(function() {
      $('select').material_select();
      $(".button-collapse").sideNav();
    });
  }
  componentWillReceiveProps(newProps){
    if(newProps.singleEvent !== this.props.singleEvent){
      this.setState(newProps.singleEvent);
    }else{
      if(newProps.success){
        this.setState({title: '',guests: '', type: '', date: ''});
      }
    }      
  }
  closeErrMsg(){
    this.props.errorAction('');
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) !== -1 ? true : false;
  }
  handleChange(e){
    // e.preventDefault();
    const centerName = document.getElementById('sel').value;
    this.setState({center: centerName || this.state.Center.name});
    this.setState({[e.target.name]: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    if(new Date().getTime() > new Date(this.state.date).getTime()){
      this.props.errorAction('Please enter a recent valid date');
    }else{
      this.props.loaders();
      const centerName = document.getElementById("sel").value;
      this.setState({center: centerName || this.state.Center.name});
      if(this.activeRoute('edit')){
        this.props.updateEvent(this.state, this.props.params.id);
      }else{
        this.props.addEvent(this.state);
      }
      document.getElementById("add-form").reset();
    }
  }
  render() {
    const {centers, success, loader, error} = this.props;
    const {centerSet} = this.state;
    const token = localStorage.getItem('token');
    if(success){
      if(this.activeRoute('edit')){
        return swal("Event Updated!", "Event sucessfully updated", "success");
      }else{
        return swal("Event Added!", "Event sucessfully created", "success");
      }
    }
    return (
      <div className="Adds">
        <nav className="" role="navigation" style={{backgroundColor: '#212F3C'}}>
            <div className="nav-wrapper container">
                <Link to={"/"}>
                <span id="logo-container " className="brand-logo white-text">Andela</span>
                </Link>
                <ul className="right hide-on-med-and-down">
                    <li>
                    <Link to={"/user/events"}>
                        My Events
                    </Link>
                    </li>
                </ul>

                <ul id="nav-mobile" className="side-nav">
                <Link to={"/"}>
                <span id="logo-container " className="brand-logo white-text">Andela</span>
                </Link>
                <li>
                    <Link to={"/user/events"}>
                        My Events
                    </Link>
                    </li>
                </ul>
                <a href="" data-activates="nav-mobile" className="button-collapse">
                    <i className="material-icons">menu</i>
                </a>
            </div>
        </nav>

        <div id="" className="bgimg7" style={{}}>
            <div className="row">
                <div className="col s12 m12 l6 offset-l3">
                    <div className="" id="container" style={{paddingTop: 25}}>
                        <div className="row">
                            <div className="card col s12" >
                                <div className="card-content white lighten-4" style={{color: '#212F3C'}}>
                                    <div id="test4" style={{border: '2 solid lightgrey'}}>
                                        <div className="row">
                                            <Form 
                                            handleSubmit={this.handleSubmit}
                                            handleChange={this.handleChange}
                                            error={error}
                                            loader={loader}
                                            state={this.state}
                                            activeRoute={this.activeRoute}
                                            centerSet={centerSet}
                                            centers={centers}
                                            closeErrMsg={this.closeErrMsg}
                                            />
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

Events.propTypes = {
  errorAction: PropTypes.func,
  singleEvent: PropTypes.func,
  updateEvent: PropTypes.func,
  getCenters: PropTypes.func,
  addEvent: PropTypes.func,
  centers: PropTypes.array,
  getSingleEvents: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.number,
  loaders: PropTypes.func,
  loader: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.bool,
};

export default Events;

