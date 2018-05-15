import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode';
import store from '../store';
import Navigation from '../helperComponent/home/navBar';
import Centers from '../helperComponent/home/centers';
import Footer from '../helperComponent/home/footer';
import Form from '../helperComponent/home/modalForm';
import { browserHistory, Link } from 'react-router';


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
    this.addFavorite = this.addFavorite.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFavoriteCenter = this.setFavoriteCenter.bind(this);
  }
  componentWillMount(){
    store.dispatch({type: '!SUCCESS'});
    $(document).ready(function(){
      $(".dropdown-button").dropdown();
      $('.modal').modal();
    });
    this.props.getCenters(6);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  addFavorite(index) {
    const token = localStorage.getItem('token');
    if(token === null){
      localStorage.setItem('route', '/');
      browserHistory.push('/auth/signin');
    }else{
      const decoded = jwt(token);
      if(decoded.user){
        this.props.addFavorite(index);
      }else{
        browserHistory.push('/');
      }
    }
  }
  setFavoriteCenter(centerId){
    let decoded = '';
    const token = localStorage.getItem('token');
    if(token !== null){
      decoded = jwt(token);
      let FavoriteCenterId = [];
      this.props.centers.map((center, key) => {
        center.favorites.map((favorite, keys) => {
          if (decoded.user && favorite.userId && favorite.userId === decoded.user.id) {
            FavoriteCenterId.push(favorite.centerId);
          }
        });
      });
      //console.log(FavoriteCenterId, decoded.user.id);
      if(FavoriteCenterId.indexOf(centerId) !== -1){
        return true;
      }
      return false;
    }

    return false;
  }
  getMore(index){
    this.props.getCenters(index);
  }
  logOut(){
    localStorage.removeItem('token');
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.changePassword(this.state);
    document.getElementById("add-form2").reset();
  }

  render() {
    let decoded = '';
    const { centers, error, success } = this.props;
    const token = localStorage.getItem('token');
    const facebook = localStorage.getItem('facebook');
    const allCenter = this.props.centers;
    let base = Math.ceil(allCenter.length / 3);
    const set1 = allCenter.slice(0,base);
    const set2 = allCenter.slice(base ,base * 2);
    const set3 = allCenter.slice(base * 2,base * 3);
    if(token !== null){
       decoded = jwt(token);
    }
    return (
      <div className="Home">
            <Navigation
                facebook={facebook}
                token={token}
                decoded={decoded}
                logOut={this.logOut}
             />
            
            <div className="bgimg2" style={{position: 'relative'}}>
                <div className="row center container">
                    <h1 className="header col s12 w3-jumbo white-text hide-on-small-only">Welcome to Andela Events</h1>
                    <h3 className="header col s12 w3-jumbo white-text hide-on-med-and-up">Welcome to Andela Events</h3>
                    <p className="slant font2 w3-padding-32 white-text hide-on-med-and-down">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc id odio mollis, luctus ex at Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc id odio mollis velit vitae pellentesque....</p>
                    <a className="button5 red explore" href="#features">Explore</a>
                    <span className="button2 blue-grey reg">
                        <Link to={"/auth/signup"}>Register</Link>
                    </span>
                </div>
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
                <div className="col s12 m12 l4 ">
                    {set1.map((center) => {
                        return (
                            <Centers 
                                height="350"
                                key={center.id}
                                setFavoriteCenter={this.setFavoriteCenter}
                                center={center}
                                addFavorite={this.addFavorite}
                            />
                        );
                    })}
                </div>

                <div id="centerx" className="col s12 m12 l4 ">
                    {set2.map((center) => {
                        return (
                            <Centers
                                height="400"
                                key={center.id}
                                setFavoriteCenter={this.setFavoriteCenter}
                                center={center}
                                addFavorite={this.addFavorite}
                            />
                        );
                    })}
                </div>

                <div id="centerx" className="col s12 m12 l4">
                    {set3.map((center) => {
                        return (
                            <Centers
                                height="350"
                                key={center.id}
                                setFavoriteCenter={this.setFavoriteCenter}
                                center={center}
                                addFavorite={this.addFavorite}
                            />
                        );
                    })}
                </div>
                <br/><br/><br/><br/>
                <div className="col s12 center w3-padding-64">
                    <button className="btn red testx" onClick={(e) => this.getMore(centers.length + 3)}>all centers </button>
                </div>
            </div>
        </div>

        <Footer />
        <Form 
            error={error}
            success={success}
            handleSubmit={this.handleSubmit}
            closeErrMsg={this.closeErrMsg}
            onChange={this.onChange}
        />
      </div>
    );
  }
}

Home.propTypes = {
  centers: PropTypes.array.isRequired,
  getCenters: PropTypes.func,
  errorAction: PropTypes.func,
  addFavorite: PropTypes.func,
  changePassword: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.number,
  loaders: PropTypes.func,
  loader: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.bool,
};



export default Home;
