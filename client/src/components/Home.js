import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode';

import { Link } from 'react-router';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      old_pass: '',
      new_pass: '',
      con_pass: ''
    };
    this.getMore = this.getMore.bind(this);
    this.logOut = this.logOut.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    // $(document).ready(function() {
    //   $(".button-collapse").sideNav();
    // });
    $(document).ready(function(){
      $(".dropdown-button").dropdown();
      $('.modal').modal();
    });
    this.props.getCenters(3);
    console.log(this.state);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  getMore(index){
    this.props.getCenters(index);
  }
  logOut(){
    localStorage.removeItem('token');
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.changePassword(this.state);
    document.getElementById("add-form2").reset();
  }
  render() {
    let decoded = '';
    const { centers, error, success } = this.props;
    const token = localStorage.getItem('token');
    const facebook = localStorage.getItem('facebook');
    if(token !== null){
       decoded = jwt(token);
    }
    return (
      <div className="Home">
          <ul id="dropdown1" className="dropdown-content">
            <li><a href="#!">Notifications</a></li>
            <li className="divider" />
            <li><a className="modal-trigger" href="#modal1">Change Password</a></li>
          </ul>
          <nav className="" role="navigation" style={{backgroundColor: ''}}>
            <div className="nav-wrapper container">
              <a id="logo-container " href="" className="brand-logo white-text">Andela</a>
              <ul className="right hide-on-med-and-down">
                  {token !== null ?
                    <li className="myEvents">
                      <Link to={"/user/events"}>
                        My Events
                      </Link>
                    </li> : ''
                  }
                  {token === null && facebook === null ?
                    <li className="login">
                    <Link to={"/auth/signin"}>Login</Link></li> :
                  <span>
                  <li className="logout" onClick={this.logOut}><a href="">Logout</a></li>
                  </span>
                  }
                  {decoded.adminUser ? <li className="admin"><Link to={"/admin/list_center"}>Admin</Link></li> :
                  <li><a className="dropdown-button" href="#!"
                    data-activates="dropdown1">My Profile<i className="material-icons right">arrow_drop_down</i></a></li>}
                  {/* <li className="reg"><Link to={"/auth/signup"}>Register</Link></li> */}
              </ul>

              <ul id="nav-mobile" className="side-nav">
                <li><a href="#" /></li>
              </ul>
              <a data-activates="nav-mobile"
              className="button-collapse"><i className="material-icons">menu</i></a>
            </div>
          </nav>

          <div className="bgimg2" style={{position: 'relative'}}>
            <div className="row center container">
              <h1 className="header col s12 w3-jumbo white-text hide-on-small-only">Welcome to Andela Events</h1>
              <h3 className="header col s12 w3-jumbo white-text hide-on-med-and-up">Welcome to Andela Events</h3>
              <p className="slant font2 w3-padding-32 white-text hide-on-med-and-down">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Nunc id odio mollis, luctus ex at Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Nunc id odio mollis velit vitae pellentesque....</p>
              <a className="button5 red" href="#features">Explore</a>
              <span className="button2 blue-grey"><Link to={"/auth/signup"}>Register</Link></span>
            </div>
            {/* <section className="overlay"/> */}
          </div>

          <div className="about" id="features" style={{background: "#F5F5F5"}}>
            <div className="row center container font2 w3-padding-64">
              <div className="w3-padding-16">
                <h2 className="hide-on-small-only">Why choose us?</h2>
                <h4 className="hide-on-med-and-up">Why choose us?</h4>
                <p className="grey-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc id odio mollis velit vitae pellentesque</p>
              </div>
              <div className="col s12 m12 l4">
                <span className="fa-stack fa-lg fa-2x">
                  <i className="fa fa-circle fa-stack-2x blue-grey-text" />
                  <i className="fa fa-car fa-stack-1x fa-inverse" />
                </span>
                  <h3>Accessible</h3>
                  <p className="grey-text">ipsum dolor sit amet, consectetur adipiscing elit.
                   Nunc id odio mollis velit vitae pellentesque</p>
              </div>

              <div className="col s12 m12 l4">
                <span className="fa-stack fa-lg fa-2x">
                  <i className="fa fa-circle fa-stack-2x green-text" />
                  <i className="fa fa-gears fa-stack-1x fa-inverse" />
                </span>
                  <h3>Quality</h3>
                  <p className="grey-text">ipsum dolor sit amet, consectetur adipiscing elit.
                   Nunc id odio mollis velit vitae pellentesque</p>
              </div>

              <div className="col s12 m12 l4">
                <span className="fa-stack fa-lg fa-2x">
                  <i className="fa fa-circle fa-stack-2x red-text" />
                  <i className="fa fa-money fa-stack-1x fa-inverse" />
                </span>
                  <h3>Price</h3>
                  <p className="grey-text">ipsum dolor sit amet, consectetur adipiscing elit.
                   Nunc id odio mollis velit vitae pellentesque</p>
              </div>
            </div>
          </div>

        <div className="listing" id="centers">
          <div className="row container">
            <h2 className=" light black-text center">Major Events Center</h2>
            <hr className=""/><br/><br/>
            {/* <p className="slant grey-text font2 ">Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Nunc id odio mollis, luctus ex at, accumsan magna....</p><br/><br/> */}
            {centers.map((center) => {
              return (
                <div className="font2 col s12 m12 l4 displayed" key={center.id} id="centerx">
                  <div className="">
                    <div className="card">
                      <div className="card-image">
                         <img style={{height: 200}} src={center.image}/>
                      </div>
                      <div className="card-content w3-padding-32">
                        <span className="card-title"><b>{center.name}</b></span>
                        <p className="truncate" style={{lineHeight: 2, fontSize: 17}}>{center.description}</p>
                        <p style={{lineHeight: 2,marginTop: 3, fontSize: 15}}>
                          <Link to={`/centerdetails/${center.id}`}>
                            <a className="red-text link" >
                              Learn More <i className="fa fa-arrow-right" />
                            </a>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <br/><br/><br/><br/>
            <div className="col s12 center w3-padding-64">
              <button className="btn red testx" onClick={(e) => this.getMore(centers.length + 3)}>view all centers </button>
            </div>
          </div>
        </div>

        <footer className="page-footer " style={{backgroundColor: '#212F3C'}}>
            <div className="container">
              <div className="row">
                <div className="col l6 s12">
                  <h6 className="white-text">ABOUT</h6>
                  <p className="grey-text text-lighten-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis egestas ante non maximus. Maecenas commodo lectus ligula, nec ultricies quam laoreet porta. Donec lectus nisl, porttitor ac semper molestie, sagittis non orci. In egestas diam tincidunt fringilla posuere</p>


                </div>
                <div className="col l3 s12 center">
                  <h6 className="white-text">SETTINGS</h6>
                  <ul>
                    <li><a className="white-text" href="#!">FAQ</a></li>
                    <li><a className="white-text" href="#!">Pricing</a></li>
                    <li><a className="white-text" href="#!">Notifications</a></li>
                    <li><a className="white-text" href="#!">Restaurants</a></li>
                  </ul>
                </div>
                <div className="col l3 s12 center">
                  <h6 className="white-text">CONNECT</h6>
                  <ul>
                    <li><a className="white-text" href="#!">facebook</a></li>
                    <li><a className="white-text" href="#!">Instagram</a></li>
                    <li><a className="white-text" href="#!">Twitter</a></li>
                    <li><a className="white-text" href="#!">Link 4</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-copyright">
              <div className="container">
            <a className="brown-text text-lighten-3" href="http://materializecss.com" />
              </div>
            </div>
        </footer>


        <div id="modal1" className="modal modal-fixed-footer" style={{width: 450, height: 440, marginTop: 40}}>
          <div className="modal-content ">
            <form id="add-form2" className="col s12" onSubmit={this.handleSubmit}>
              <h3 className="font2 center red-text">Change Password</h3>
              { error ?
                <div style={{ borderRadius: 7}} className=" red white-text error hyper">
                  <p className="w3-padding-large err_para">
                    <i className="yellow-text fa fa-exclamation-triangle"
                  style={{paddingRight:5}} aria-hidden="true" />
                    <span id="err_msg">{error}</span>
                  <span style={{cursor: 'pointer'}}
                  className=" right" >
                  <a onClick={this.closeErrMsg} className="white-text">x</a></span></p>
                </div> : ''
              }
              { success ?
                <div style={{ borderRadius: 7}} className="w3-panel green white-text error hyper">
                  <p className="w3-padding-medium err_para"><i className="fa fa-check"
                  style={{paddingRight:5}} aria-hidden="true" /><span id="err_msg">
                    Password succesfully changed!</span>
                  <span style={{cursor: 'pointer'}}
                  className=" right" >
                  <a onClick={this.closeErrMsg} className="white-text">x</a></span></p>
                </div> : ''
              }
              <div className="row">
                <div className="input-field col s12 ">
                  <i className="material-icons prefix">lock</i>
                  <input id="icon_telephone3"
                  name="old_pass" type="password"
                  onChange={this.onChange}
                  placeholder="Enter your old Password"
                  className="validate " required/>
                  <label htmlFor="icon_telephone3" />
                </div>
                <div className="input-field col s12 ">
                  <i className="material-icons prefix">lock</i>
                  <input id="icon_telephone2" name="new_pass" type="password"
                  onChange={this.onChange}
                  placeholder="New Password"
                  className="validate " required/>
                  <label htmlFor="icon_telephone2" />
                </div>
                <div className="input-field col s12 ">
                  <i className="material-icons prefix">lock</i>
                  <input id="icon_telephone1" name="con_pass" type="password"
                  onChange={this.onChange}
                  placeholder="Confirm password"
                  className="validate " required/>
                  <label htmlFor="icon_telephone1" />
                </div>
              </div>
              <div className="center" >
              <button type="submit" style={{borderRadius: 40}} className="waves-effect waves-light btn red"><i
          className="" />Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  centers: PropTypes.array.isRequired,
  getCenters: PropTypes.func,
};


export default Home;
