import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import PropTypes from 'prop-types';
import { FacebookLogin } from 'react-facebook-login-component';
import Rwg from 'random-word-generator';
import jwt from 'jwt-decode';
import { GoogleLogin } from 'react-google-login-component';
import Error from '../helperComponent/notifications/error';
import Loader from '../helperComponent/notifications/loader';
import Form from '../helperComponent/auth/form';
import Forms from '../helperComponent/auth/modalForm';
import store from '../store';


let preloader = false;
class Auth extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        username: '',
        email: '',
        retrieve: '',
        password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clearError = this.clearError.bind(this);
        this.closeErrMsg = this.closeErrMsg.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.activeRoute = this.activeRoute.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        //this.responseGoogleLogout = this.responseGoogleLogout.bind(this);
    }
    componentWillMount(){
        $(document).ready(function(){
            $('.modal').modal();
            $(".button-collapse").sideNav();
        });
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    clearError(){
        store.dispatch({type: 'ERROR', error: ''});
    }
    authenticate(response){
        const randName = new Rwg().generate();
        if(response.accessToken){
        const facebookName = response.accessToken.slice(0, 5);
        this.props.signin({email: `foo${response.id}@gTa.com`, password: 'annonymous'});
        }
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) !== -1 ? true : false;
    }
    responseGoogle(response){
        let { error } = this.props;
        const id_token = response.Zi.id_token;
        if(id_token){
        const googleName = id_token.slice(0, 10);
        this.props.signin({email: `${googleName}@gTa.com`, password: 'annonymous'});
        }
    }
    closeErrMsg(){
        this.props.errorAction('');
    }
    handleSubmit(e) {
        e.preventDefault();
        if(this.state.retrieve === ''){
        this.props.loaders();
        if(this.activeRoute('signin')){
            this.props.signin(this.state);
        }else{
            this.props.signup(this.state);
        }
        document.getElementById("add-form").reset();
        }else{
        this.props.retrieve(this.state.retrieve);
        document.getElementById("add-form2").reset();
        this.setState({retrieve: '', email: ''});
        }
    }
    render() {
        let decoded = {user: {email: 'yo'}};
        const {error, loader, success} = this.props;
        const token = localStorage.getItem('token');
        if(token !== null){
        decoded = jwt(token);
        }
        if(this.activeRoute('signup') && success === true){
        browserHistory.push('/');
        }
        return (
            <div className="Centers">
                <div className="" id="">
                    <nav className="" role="navigation" style={{backgroundColor: '#212F3C'}}>
                        <div className="nav-wrapper container">
                            <Link to={"/"}>
                                <span id="logo-container " className="brand-logo white-text">Andela</span>
                            </Link>
                            <ul className="right hide-on-med-and-down" />

                            <ul id="nav-mobile" className="side-nav">
                                <li><a href="#">Andela</a></li>
                            </ul>
                            <a href="#" data-activates="nav-mobile" className="button-collapse">
                                <i className="material-icons">menu</i>
                            </a>
                        </div>
                    </nav>
                    <div id="bgPage" className="bgimg">
                        <div className="row">
                            <div className="col s12 m12 l5 white-text hide-on-med-and-down" id="tp-row">
                            <div className="" id="tp-child">
                                <h3>{this.activeRoute('signin') ? 'Sign In' : 'Sign Up'}</h3>
                            </div>

                            <p>Lorem Ipsum It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been<br/><br/> The only five centuries, but also the leap into electronic typesetting, remaining essentially </p>
                            <p>{this.activeRoute('signin') ? 'Not a Member?' : 'Already a Member?'}</p><br/>
                            <Link to={this.activeRoute('signin') ? '/auth/signup' : '/auth/signin'}>
                                <span id="download-button" className="btn red">
                                    {this.activeRoute('signin') ? 'Sign Up' : 'Sign In'}
                                </span>
                            </Link>
                        </div>
                            <div className="col s12 m12 l7" style={{paddingTop: 45}}>
                                <div className="" id="container">
                                    <div className="">
                                        <div className="row">
                                            <div className="card col m8 offset-m2">
                                                <div className="card-content white lighten-4" style={{color: '#212F3C'}}>
                                                    {/* <div className="col l8 offset-l2">
                                                        <div className="col s6">
                                                            <FacebookLogin socialId="1835467386744019"
                                                            language="en_US"
                                                            scope="public_profile,email"
                                                            responseHandler={this.authenticate}
                                                            xfbml
                                                            fields="id,email,name"
                                                            version="v2.5"
                                                            className="facebook-login waves-effect waves-light btn blue"
                                                            buttonText="Facebook"/>
                                                            </div>
                                                        <div className="col s6">
                                                            <GoogleLogin
                                                                socialId="994244618792-vcuu6ftsds0bv98gu1urlup3rh6923hk.apps.googleusercontent.com"
                                                                className="google-login waves-effect waves-light btn red"
                                                                id="google"
                                                                scope="profile"
                                                                fetchBasicProfile={false}
                                                                responseHandler={this.responseGoogle}
                                                                buttonText="Google"
                                                            />
                                                        </div>
                                                    </div> */}
                                                    <div id="test4">
                                                        <div className="row">
                                                            <Form 
                                                                state={this.state}
                                                                activeRoute={this.activeRoute}
                                                                onChange={this.onChange}
                                                                handleSubmit={this.handleSubmit}
                                                                error={error}
                                                                loader={loader}
                                                                clearError={this.clearError}
                                                                closeErrMsg={this.closeErrMsg}
                                                            />
                                                            <div id="modal1" className="modal modal-fixed-footer" style={{width: 420, height: 280}}>
                                                                <div className="modal-content ">
                                                                    <h3 className="font2 center red-text">Retrieve Password</h3>
                                                                    <Forms 
                                                                        activeRoute={this.activeRoute}
                                                                        onChange={this.onChange}
                                                                        handleSubmit={this.handleSubmit}
                                                                        error={error}
                                                                        closeErrMsg={this.closeErrMsg}
                                                                        success={success}
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Auth.propTypes = {
  errorAction: PropTypes.func,
  centers: PropTypes.array,
  signin: PropTypes.func,
  signup: PropTypes.func,
  retrieve: PropTypes.func,
  location: PropTypes.object,
  loader: PropTypes.bool,
  loaders: PropTypes.func,
  error: PropTypes.string,
  success: PropTypes.bool,
};

export default Auth;
