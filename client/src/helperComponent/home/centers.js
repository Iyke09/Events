
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';

function Centers(props) {
    return (
        <div className="displayed">
            <div className="card w3sets" id="minor">
                <div className="card-image waves-effect waves-block waves-light">
                    <img style={{height: props.height}} className="activator" src={props.center.image}/>
                </div>
                <div className="card-content">
                    <span className="card-title grey-text text-darken-4">
                        <Link to={`/centerdetails/${props.center.id}`}>
                            <span className="linked">{props.center.name}</span>
                        </Link>
                        <i onClick={() => props.addFavorite(props.center.id)}
                            className={"fa fa-heart fa-1x w3-small right favorite " + (
                            props.setFavoriteCenter(props.center.id) ? "red-text checked" : "green-text")}
                            style={{fontSize: 15, cursor: 'pointer'}}>
                            <span className="w3-padding-small black-text">
                                {props.center.favorites.length}
                            </span>
                        </i>
                    </span>
                </div>
            </div>
        </div>
    );
}

Centers.propTypes = {
    center: PropTypes.object,
    setFavoriteCenter: PropTypes.func,
    addFavorite: PropTypes.func,
    height: PropTypes.number
};


export default Centers;