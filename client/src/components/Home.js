import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode';

import { Link } from 'react-router';


class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      user: null
    };
    this.getMore = this.getMore.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  componentWillMount(){
    // $(document).ready(function() {
    //   $(".button-collapse").sideNav();
    // });
    this.props.getCenters(4);
  }
  getMore(index){
    this.props.getCenters(index);
  }
  logOut(){
    localStorage.removeItem('token');
  }
  render() {
    let decoded = '';
    const { centers } = this.props;
    const token = localStorage.getItem('token');
    const facebook = localStorage.getItem('facebook');
    if(token !== null){
       decoded = jwt(token);
    }
    return (
      <div className="Home">
          <nav className="" role="navigation" style={{backgroundColor: '#212F3C'}}>
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
                  {token === null && facebook === null ? <li className="login"><Link to={"/auth/signin"}>Login</Link></li> :
                  <li className="logout" onClick={this.logOut}><a href="">Logout</a></li>}
                  {decoded.adminUser ? <li className="admin"><Link to={"/user/admin"}>Admin</Link></li> : ''}
                  <li className="reg"><Link to={"/auth/signup"}>Register</Link></li>
              </ul>

              <ul id="nav-mobile" className="side-nav">
                <li><a href="#" /></li>
              </ul>
              <a data-activates="nav-mobile"
              className="button-collapse"><i className="material-icons">menu</i></a>
            </div>
          </nav>

          <div className="bgimg2" style={{position: 'relative'}}>
            <div className="row center">
              <h1 className="header col s12 light white-text">Welcome to Andela Events</h1>
              <p className="slant white-text"><i>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id odio mollis, luctus ex at, accumsan magna. Suspendisse suscipit gravida velit vitae pellentesque....</i></p>
              <button className="button" href=""><b>Explore</b></button>
            </div>
            <section className="overlay"/>
          </div>

        <div className="listing center" id="centers">
          <div className="row center" style={{padding: 35}}>
            <h3 className="header col s12 light black-text">Major Events Center</h3>
            <p className="slant black-text"><i>Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Nunc id odio mollis, luctus ex at, accumsan magna....</i></p><br/><br/>
            {centers.map((center) => {
              return (
                <div className="col center s12 m12 l3 displayed" key={center.id} id="centerx">
                  <div className="card">
                    <div className="card-image">
                      <a href="">
                        <img style={{height: 350}} src={center.image}/>
                      </a>
                      <span className="card-title">{center.name}</span>
                      <Link to={`/centerdetails/${center.id}`}>
                        <a className="btn-floating halfway-fab waves-effect waves-light red link" >
                          <i className="material-icons">chevron_right</i>
                        </a>
                      </Link>
                    </div>
                    <div className="card-content">
                        <p>{center.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <br/><br/><br/><br/>
            <div className="col s12">
              <button className="btn red testx" onClick={(e) => this.getMore(centers.length + 4)}>view all centers </button>
            </div>
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
