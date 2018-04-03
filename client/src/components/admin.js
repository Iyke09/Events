import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
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


      username: '',
      avatar: '',
      isUploading: false,
      progress: 0,
      avatarURL: ''
    };

    this.onChange = this.onChange.bind(this);
    this.getMore = this.getMore.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.activeRoute = this.activeRoute.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchCenter = this.searchCenter.bind(this);
    this.updateCenter = this.updateCenter.bind(this);
  }

  componentWillMount(){
    this.props.errorAction('');
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
    $(document).ready(function(){
      $('.modal').modal();
    });
  }
  componentDidMount(){
    if(this.props.location.pathname.indexOf('edit') !== -1){
      this.props.getSingle(this.props.params.id);
    }
  }
  componentWillReceiveProps(newProps){
    if(newProps.single !== this.props.single){
      this.setState(newProps.single);
      this.setState({avatarURL: newProps.single.image});
    }else{
      if(newProps.success){
        this.setState({name: '',description: '', capacity: '', location: '', price: ''});
      }
    }
  }
  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  closeErrMsg(){
    store.dispatch({type: 'ERROR', error: ''});
  }
  getMore(index){
    this.props.getCenters(index);
  }

  handleUploadStart() {
    this.setState({isUploading: true, progress: 0});
  }
  handleProgress(progress) {
    this.setState({progress});
  }
  handleUploadError (error){
    this.setState({isUploading: false});
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) !== -1 ? true : false;
  }
  handleUploadSuccess (filename) {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().ref('images').child(filename).getDownloadURL()
    .then(url => {
      this.setState({avatarURL: url, image: url});
    });
  }
  clearForm(){
    console.log('xxxxxoxo');
      this.setState({name: '',description: '', capacity: '',
       location: '', price: '', avatarURL: ''});
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.loaders();
    if(this.activeRoute('edit')){
      this.props.updateCenter(this.state, this.props.params.id);
    }else{
      this.props.addCenter(this.state);
    }
    document.getElementById("add-form").reset();
  }
  searchCenter(e){
    const { error } = this.props;
    if(error.indexOf('search') !== -1){
      this.props.errorAction('');
    }
    this.props.getCenters(e.target.value);
  }
  updateCenter(index){
    browserHistory.push(`/admin/edit/${index}`);
    this.props.getSingle(index);
  }
  render() {
    let showElement = false;
    const { centers, error, loader, success } = this.props;
    if(success){
      if(this.activeRoute('edit')){
        return swal("Center Updated!", "You've successfully Updated a center", "success");
      }else{
        return swal("Center Added!", "You've successfully Added a new center", "success");
      }
    }
    return (
      <div className="Admin">
        <div className="row">
          {this.activeRoute('list_center') ?
          <div className="col l12 s12">
            <div className="w3-bar">
               <span className="col l3" />
               <div className="col l9 s12">
                 <input type="text" onChange={this.searchCenter}
                 className="w3-bar-item w3-input" placeholder="Enter a search value..."/>
               </div>
            </div>
          </div> : ''}
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
                <Link to={"/"}><i className="fa fa-home grey-text" />
                  <span className="waves-effect white-text">
                  HOME</span>
                </Link>
              </li>
              <li className={this.activeRoute('/admin/add_center') ? 'grey' : ''}>
              <Link to={"/admin/add_center"}><i className="fa fa-plus white-text" />
              <span onClick={this.clearForm} className="waves-effect white-text waves-light add" href="#modal1">
                  ADD CENTER</span></Link>
              </li>
              {this.activeRoute('edit') ?
              <li className={this.activeRoute('edit') ? 'grey' : ''}><Link to={"/admin/add_center"}>
              <i className="fa fa-edit white-text" />
              <span className="waves-effect white-text waves-light update" href="#modal1">
                  EDIT CENTER</span></Link>
              </li>: ''}
              <li className={this.activeRoute('/admin/list_center') ? 'grey' : ''}>
              <Link to={"/admin/list_center"}><i className="fa fa-list white-text" /><span className="waves-effect white-text">
                CENTERS</span></Link></li>
            </ul>
            <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
          </div>
          <div className="col s12 m12 l8 " >
              {this.activeRoute('/admin/list_center') ?
                error.indexOf('search') === -1 ?
                <div className="">
                  <div className="row" style={{paddingTop: 50}}>
                    {centers.map((center) => {
                      return (
                        <div className="col s12 m12 l4 displayed" key={center.id}>
                          <div className="card w3sets" id="minor">
                            <div className="card-image waves-effect waves-block waves-light">
                              <img style={{height: 300}} className="activator"
                              src={center.image}/>
                              <div style={{cursor: 'pointer'}} className="update" id="minor-l" onClick={() => this.updateCenter(center.id)}>
                                  <span className="fa-stack fa-lg " id="set">
                                    <i className="fa fa-circle fa-stack-2x" />
                                    <i className="fa fa-edit fa-stack-1x fa-inverse" />
                                  </span>
                              </div>
                            </div>
                            <div className="card-content">
                              <span className="card-title activator grey-text text-darken-4">
                                {center.name}
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
                    <br/><br/><br/>
                    <div onClick={(e) => this.getMore(centers.length + 3)} className="col s12 w3-padding-64">
                      <button className="btn red right"> more centers </button>
                    </div>
                  </div>
                </div> : <h1 className="center grey-text w3-padding-64">
                  <i className="grey-text fa fa-exclamation-triangle"/><br/>
                  Oops!!!...No items matched your search. Try again?</h1>
                : ''
              }



          {this.activeRoute('/admin/add_center') || this.activeRoute('edit') ?
            <div className="card " style={{backgroundColor: '#FBFCFC', marginTop: 20}}>
              <div className="card-content ">
              { error ?
                <div style={{ borderRadius: 7}} className="w3-panel red white-text error hyper">
                  <p className="w3-padding-medium err_para"><i className="yellow-text fa fa-exclamation-triangle"
                  style={{paddingRight:5}} aria-hidden="true" /><span id="err_msg">{error}</span>
                  <span style={{cursor: 'pointer'}}
                  className=" right" >
                  <a onClick={this.closeErrMsg} className="white-text">x</a></span></p>
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

                  <h4 className="col s12 center light">{this.activeRoute('edit') ? 'Edit ' : 'Add '}Center!</h4>
                  <small className="col s12 center light font3">
                  Lorem ipsum dolor sit amet</small>
                  <div className="row">
                    <div className=" col s12">
                        {this.state.isUploading &&
                          <p><b>Progress:</b> {this.state.progress}</p>
                        }
                        {this.state.avatarURL &&
                          <img className="responsive-img" style={{height: 300, width: '100%'}}
                           src={this.state.avatarURL} />
                        }
                        <br/><br/>
                        <i className="material-icons prefix">add_a_photo</i>
                      <label style=
                      {{backgroundColor: 'steelblue', color: 'white',
                      padding: 10, borderRadius: 4, pointer: 'cursor'}}>
                        Select an image
                        <FileUploader
                          hidden
                          accept="image/*"
                          name="avatar"
                          randomizeFilename
                          storageRef={firebase.storage().ref('images')}
                          onUploadStart={this.handleUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleUploadSuccess}
                          onProgress={this.handleProgress}
                        />
                      </label>
                    </div>
                    <div className="input-field col m6 s12">
                      <i className="material-icons prefix">home</i>
                      <input id="icon_telephone" type="tel"
                      onChange={this.onChange} value={this.state.name} name="name" className="validate" placeholder="Name" required/>
                    </div>
                    <div className="input-field col s12 m6">
                      <i className="material-icons prefix">add_location</i>
                      <input id="icon_telephone" name="location" type="text"
                      onChange={this.onChange} value={this.state.location} className="validate" placeholder="Address" required/>
                    </div>
                    <div className="row">
                      <div className="col s12 m6">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">attach_money</i>
                          <input id="icon_telephone" name="price" type="number"
                          onChange={this.onChange} value={this.state.price} className="validate" placeholder="Price" />
                        </div>
                      </div>
                      <div className="col s12 m6">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">people</i>
                          <input id="icon_telephone" name="capacity" type="number"
                          onChange={this.onChange} value={this.state.capacity} className="validate" placeholder="Capacity" required/>
                        </div>
                      </div>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">mode_edit</i>
                      <textarea id="icon_prefix2" onChange={this.onChange} name="description"
                      className="materialize-textarea" value={this.state.description} required/>
                      {this.activeRoute('edit') ? '' : <label htmlFor="icon_prefix2">Description</label>}
                    </div>
                    <div className="" style={{textAlign: 'center'}}>
                      <button type="submit"
                      className="btn waves-effect waves-light red lighten-1">{this.activeRoute('edit') ? 'Edit ' : 'Add '}Center</button>
                    </div>
                  </div>
                </form>
              </div>
            </div> : ''
          }

          </div>
        </div>
  </div>
    );
  }
}

export default Admin;
