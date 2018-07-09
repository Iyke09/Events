
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';

function Centers(props) {
    return (
        <div className="col s12 m12 l4 displayed">
            <div className="card w3sets" id="minor">
                <div className="card-image waves-effect waves-block waves-light">
                    <img style={{height: "300px"}} className="activator" src={props.center.image}/>
                    <Link to={`/admin/edit/${props.center.id}`}>
                        <div style={{cursor: 'pointer'}} className="update" id="minor-l" 
                            onClick={() => props.updateCenter(props.center.id)}>
                            <span className="fa-stack fa-lg " id="set">
                            <i className="fa fa-circle fa-stack-2x" />
                            <i className="fa fa-edit fa-stack-1x fa-inverse" />
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                        {props.center.name}
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
}

Centers.propTypes = {
    center: PropTypes.object,
    updateCenter: PropTypes.func,
};


export default Centers;