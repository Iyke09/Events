
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import timeConverter from './timeConverter';

function Events(props) {
    return (
        <div className="">
            <div className="eventz" id="eventz">
                <div className="col s10 m2 center" >
                <div className="black white-text" >
                    <h5 style={{padding: 10}} className="center font3">
                        <i className=" fa fa-calendar-o" /> <br/> {timeConverter(props.event)}
                    </h5>
                </div>
                </div>
                <div className="col s12 m9" >
                    <h2 className={`font2 ${props.period}`}>{props.event.title}</h2>
                    <p className="blue-grey-text">{props.event.description}. Quisque aliquam dignissim felis,
                        a laoreet magna. Suspendisse suscipit gravida Suspendisse suscipit gravida velit vitae
                        pellentesque. Quisque
                        aliquam dignissim felis, a laoreet velit vitae pellentesque. Quisque
                        aliquam dignissim felis, a laoreet .
                    </p>
                </div>
            </div>
        </div>
    );
}

Events.propTypes = {
    event: PropTypes.object,
    period: PropTypes.string
};


export default Events;