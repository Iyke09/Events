import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { Link } from 'react-router';
import store from '../store';
import swal from 'sweetalert';

class Edit extends Component {
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
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    store.dispatch({type: 'ERROR', error: ''});
    this.props.getSingle(this.props.params.id);
  }
  componentWillReceiveProps(newProps){
    console.log('i am new pos ' + newProps.single);
    if(newProps.single !== this.props.single){
      this.setState(newProps.single);
    }else{
      if(newProps.error === ''){
        console.log(newProps.error);
        this.setState({name: '',description: '', capacity: '', location: '', price: ''});
      }
    }
  }

  handleUploadStart() {
    this.setState({isUploading: true, progress: 0});
  }
  handleProgress(progress) {
    this.setState({progress});
  }
  handleUploadError (error){
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess (filename) {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().ref('images').child(filename).getDownloadURL()
    .then(url => {
      this.setState({avatarURL: url, image: url});
      console.log(this.state.image);
    });
  }
  closeErrMsg(){
    store.dispatch({type: 'ERROR', error: ''});
  }
  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.loaders();
    console.log(this.state);
    this.props.updateCenter(this.state, this.props.params.id);
    this.setState({});
    document.getElementById("add-form").reset();
  }

  render() {
    const { error, single, loader, success } = this.props;
    if(success){
      return swal("Center Updated!", "Center successfully updated", "success");
    }
    return (
      <div className="Edit">
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
              <Link to={"/user/admin"}>
              <li><a className="waves-effect white-text">
                <i className="fa fa-gears grey-text" />Centers</a></li>
              </Link>
              <li><a className="waves-effect white-text" href="#!">
                <i className="fa fa-envelope grey-text" />Messages</a></li>
            </ul>
            <a href="#" data-activates="slide-out" className="button-collapse">
              <i className="material-icons">menu</i></a>
          </div>
          <div className="col s12 m12 l8 " style={{paddingTop: 100}}>
            <div className="card " style={{backgroundColor: '#FBFCFC'}}>
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
                  <h4 className="col s12 center light">Edit Center!</h4>
                  <small className="col s12 center light font3">
                  Lorem ipsum dolor sit amet</small>
                  <div className="row">
                    <div className=" col s12">
                    {this.state.isUploading &&
                      <p><b>Progress:</b> {this.state.progress}%</p>
                    }
                    {this.state.avatarURL &&
                      <img className="responsive-img" src={this.state.avatarURL} />
                    }
                    <br/>
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
                    <div className="input-field col s12 m6">
                      <i className="material-icons prefix">home</i>
                      <input id="icon_telephone" type="tel"
                      onChange={this.onChange} value={this.state.name}
                      name="name" className="validate" placeholder="" required/>
                    </div>
                    <div className="input-field col s12 m6">
                      <i className="material-icons prefix">add_location</i>
                      <input id="icon_telephone" name="location" type="text"
                      onChange={this.onChange} value={this.state.location}
                       className="validate" placeholder="" required/>
                    </div>
                    <div className="row">
                      <div className="col s12 m6">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">attach_money</i>
                          <input id="icon_telephone" name="price" type="number"
                          onChange={this.onChange} value={this.state.price}
                            className="validate" placeholder="" />
                        </div>
                      </div>
                      <div className="col s12 m6">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">people</i>
                          <input id="icon_telephone" name="capacity" type="number"
                          onChange={this.onChange} value={this.state.capacity}
                           className="validate" placeholder="" required/>
                        </div>
                      </div>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">mode_edit</i>
                      <textarea id="icon_prefix2" onChange={this.onChange} value={this.state.description}
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

export default Edit;
