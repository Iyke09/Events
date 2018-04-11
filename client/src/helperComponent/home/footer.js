
import React, { Component } from 'react';

function Footer(props) {
    return (
        <footer className="page-footer " style={{backgroundColor: '#212F3C'}}>
            <div className="container">
              <div className="row">
                <div className="col l6 s12">
                  <h6 className="white-text">ABOUT</h6>
                  <p className="grey-text text-lighten-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis egestas ante non maximus. Maecenas commodo lectus ligula, nec ultricies quam laoreet porta. Donec lectus nisl, 
                  porttitor ac semper molestie, sagittis non orci. In egestas diam tincidunt fringilla posuere</p>
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
    );
}


export default Footer;