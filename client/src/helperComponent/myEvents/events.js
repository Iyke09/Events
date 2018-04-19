
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import timeConverter from './timeConverter';
import { browserHistory, Link } from 'react-router';

function Event(props) {
    return (
        <div className="">
            <div className="col s12 w3-padding-32">
                <div className="col s12 m12 l3 hide-on-med-and-down">
                    <h3 className="center black-text" style={{lineHeight: 8}}>
                        <i className="fa fa-clock-o red-text" id="" style={{marginRight: 5}} />
                        <b>{props.event.time} - {timeConverter(props.event).to + ':00'}</b>
                    </h3>
                </div>
                <div className="col s12 m12 l4 center w3-display-container">
                <img
                    className="responsive-img img-event"
                    src={props.event.Center.image} style={{width: '100%',height: 250}}/>
                    <div className="middle">
                        <h3 className="white-text font center">
                        <span className="w3-medium red-text">{timeConverter(props.event).date}</span><br/> {timeConverter(props.event).month}
                        </h3>
                    </div>
                </div>

                <div className="col s12 m12 l5 reveal">
                    <h2 className="light">
                    <span style={{marginRight: 4}}>
                        <span className="title_text font2">{props.event.title}</span>
                        <Link to={`/edit_events/${props.event.id}`}>
                            <i className="material-icons"
                            id={`r${props.event.title}`}>edit</i>
                        </Link>
                        <span className="right">
                        <a id={event.title} onClick={() => props.setId(props.event.id)}
                            className="red white-text w3-medium modal-trigger tooltipped test1"
                            data-position="bottom" data-delay="50" data-tooltip="Cancel Event!" href="#modal1"
                        style={{paddingRight: 4, paddingLeft: 4, paddingTop: 2, paddingBottom: 2}}><b>x</b></a>
                        </span>
                    </span>
                    </h2>

                    <div className=" ">
                        <h6 id="fsize" className="font3 light"> <i className="fa fa-map-marker red-text" id="" style={{marginRight: 5}} />
                        {props.event.Center.location}</h6>
                        <h6 id="fsize" className="font3 light hide-on-large-only"> 
                        <i className="fa fa-clock-o red-text" id="" style={{marginRight: 5}} />
                        {props.event.time} - {timeConverter(props.event).to + ':00'}</h6>
                        <p className="black-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

Event.propTypes = {
    event: PropTypes.object,
    setId: PropTypes.func
};


export default Event;