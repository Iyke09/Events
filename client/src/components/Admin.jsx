import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Error from '../helperComponent/notifications/error';
import Loader from '../helperComponent/notifications/loader';
import Centers from '../helperComponent/admin/center';
import Form from '../helperComponent/admin/form';
import Navigation from '../helperComponent/admin/sideNav';
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
        this.closeErrMsg = this.closeErrMsg.bind(this);
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
        $(".button-collapse").sideNav();
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
        this.props.errorAction('');
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
                            <input type="text" name="search" onChange={this.searchCenter}
                            className="w3-bar-item w3-input" placeholder="Enter a search value..."/>
                            </div>
                        </div>
                    </div> : ''
                }
                <Navigation 
                    clearForm={this.clearForm}
                    activeRoute={this.activeRoute}
                />
                <div className="col s12 m12 l8 " >
                        {this.activeRoute('/admin/list_center') ? error.indexOf('search') === -1 ?
                            <div className="">
                                <div className="row" style={{paddingTop: 50}}>
                                    {centers ? centers.map((center) => {
                                        return (
                                            <Centers key={center.id} center={center} updateCenter={this.updateCenter}/>
                                        );
                                    }) : ''}
                                    <br/><br/><br/>
                                    <div onClick={(e) => this.getMore(centers.length + 3)} className="col s12 w3-padding-64 more">
                                        <button className="btn red right"> more centers </button>
                                    </div>
                                </div>
                            </div> : 
                            <h1 className="center grey-text w3-padding-64">
                                <i className="grey-text fa fa-exclamation-triangle"/><br/>
                                Oops!!!...No items matched your search. Try again?
                            </h1>  : ''
                        }

                        {this.activeRoute('/admin/add_center') || this.activeRoute('edit') ?
                            <div className="card " style={{backgroundColor: '#FBFCFC', marginTop: 20}}>
                                <div className="card-content ">
                                { error ? <Error error={error} closeErrMsg={this.closeErrMsg}/> : ''}
                                <Form 
                                    state={this.state}
                                    loader={loader} 
                                    onChange={this.onChange}
                                    firebase={this.props.test ? "" : firebase.storage().ref('images')}
                                    handleUploadStart={this.handleUploadStart}
                                    handleUploadError={this.handleUploadError}
                                    handleUploadSuccess={this.handleUploadSuccess}
                                    handleProgress={this.handleProgress}
                                    activeRoute={this.activeRoute}
                                    handleSubmit={this.handleSubmit}
                                />
                                </div>
                            </div> : ''
                        }
                </div>
            </div>
        </div>
    );
  }
}

Admin.propTypes = {
  errorAction: PropTypes.func,
  centers: PropTypes.array,
  getCenters: PropTypes.func,
  location: PropTypes.object,
  getSingle: PropTypes.func,
  params: PropTypes.number,
  loaders: PropTypes.func,
  updateCenter: PropTypes.func,
  loader: PropTypes.bool,
  addCenter: PropTypes.func,
  error: PropTypes.string,
  success: PropTypes.bool,
  single: PropTypes.object,
};

export default Admin;
