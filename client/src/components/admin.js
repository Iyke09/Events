import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Admin extends Component {
  constructor(){
    super();
    this.state = {
      user: null
    };
  }
  componentWillMount(){
    this.props.getCenters(3);
  }
  render() {
    const { centers } = this.props;
    return (
      <div className="Admin">
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
              <li><a className="waves-effect white-text" href="./index.html"><i className="fa fa-home grey-text" />HOME</a></li>
              <li><a className="waves-effect white-text" href="#!"> <i className="fa fa-plus grey-text" /> Add Center</a></li>
              <li><a className="waves-effect white-text" href="#!"><i className="fa fa-envelope grey-text" />Messages</a></li>
            </ul>
            <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
          </div>
          <div className="col s12 m12 l8 " style={{paddingTop: 100}}>
            <div className="row">
              {centers.map((center) => {
                return (
                  <div className="col s12 m12 l4" key={center.id}>
                    <div className="card w3sets" id="minor">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator"
                        src={center.image}/>
                        <div className="update modal-trigger" href="#modal1" id="minor-l">
                          <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x" />
                            <i className="fa fa-edit fa-stack-1x fa-inverse" />
                          </span>
                        </div>
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{center.name}
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
            </div>  <br/><br/><br/><br/>
            <div className="card " style={{backgroundColor: '#FBFCFC'}}>
              <div className="card-content ">
                <form className="row" >
                  <h4 className="col s12 center light">Add a Center!</h4>
                  <small className="col s12 center light font3">
                  Lorem ipsum dolor sit amet</small>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">home</i>
                      <input id="icon_telephone" type="tel" className="validate" placeholder="Name"/>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">add_a_photo</i>
                      <input id="icon_telephone" type="text" className="validate" placeholder="Image_URL"/>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">add_location</i>
                      <input id="icon_telephone" type="text" className="validate" placeholder="Address"/>
                    </div>
                    <div className="row">
                      <div className="col s6">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">attach_money</i>
                          <input id="icon_telephone" type="number" className="validate" placeholder="Price"/>
                        </div>
                      </div>
                      <div className="col s6">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">people</i>
                          <input id="icon_telephone" type="number" className="validate" placeholder="Capacity"/>
                        </div>
                      </div>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">mode_edit</i>
                      <textarea id="icon_prefix2" className="materialize-textarea" />
                      <label htmlFor="icon_prefix2">Description</label>
                    </div>
                    <div className="" style={{textAlign: 'center'}}>
                      <a href="http://materializecss.com/getting-started.html" id="download-button"
                      className="btn waves-effect waves-light red lighten-1">Add Center</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      <div id="modal1" className="modal">
        <div className="modal-content">
          <form className="row" >
            <h4 className="col s12 center light">Update Center!</h4>
            <small className="col s12 center light font3">
            Lorem ipsum dolor sit amet</small>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">home</i>
                <input id="icon_telephone" value="The Emporium" type="tel" className="validate" placeholder="Name"/>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">add_a_photo</i>
                <input id="icon_telephone" value="./images/img09.jpeg" type="text" className="validate"
                placeholder="Image_URL"/>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">add_location</i>
                <input id="icon_telephone" value="34 illupeju,Ikorodu. Lagos" type="text"
                className="validate" placeholder="Address"/>
              </div>
              <div className="row">
                <div className="col s6">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">attach_money</i>
                    <input id="icon_telephone" value="2000" type="number" className="validate" placeholder="Price"/>
                  </div>
                </div>
                <div className="col s6">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">people</i>
                    <input id="icon_telephone" value="4500" type="number" className="validate" placeholder="Capacity"/>
                  </div>
                </div>
              </div>
                  <div className="input-field col s12">
                  <i className="material-icons prefix">mode_edit</i>
                  <textarea id="icon_prefix2" value="Awesome place with state of the art facilities!"
                  className="materialize-textarea" />
                  <label htmlFor="icon_prefix2">Description</label>
                </div>
            <div className="" s={{textAlign: 'center'}}>
            <a href="http://materializecss.com/getting-started.html" id="download-button"
            className="btn waves-effect waves-light red lighten-1">Update Center</a>
            </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" />
        </div>
      </div>
  </div>
    );
  }
}

export default Admin;
