
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import timeConverter from './timeConverter';

function Reviews(props) {
    return (
        <div className="">
            {props.review.length > 0 ? props.review.map((comment, key) => {
                const color = ['red', 'grey', '#212F3C'];
                const randColor = color[key];
                return (
                  <div key={key}>
                    <div className="col s12 m12 l10">
                      <div className="col s3 m1 center" >
                        <div className=" white-text w3-display-container"
                        style={{borderRadius: '100%', width: 50, height: 50, background: randColor}}>
                          <h1 style={{textTransform: 'lowercase'}} className="font2">{comment.user.split('')[0]}
                            </h1>
                        </div>
                      </div>
                      <div className="col s9 m11 left-align" >
                          <h2 className="font2 newTitle"><span className="coUser">{comment.user}</span>
                            <span className="grey-text" style={{fontSize: 14, marginLeft: 6}}><small>
                            {props.setTime(comment.updatedAt)} Ago</small></span></h2>
                          <p className="blue-grey-text">{comment.comment} --> Quisque aliquam dignissim felis,
                              a laoreet magna. Suspendisse suscipit gravida Suspendisse suscipit gravida velit vitae
                              pellentesque.
                          </p>
                      </div>
                    </div>
                  <div className="col s12 m12 l2"/>
                </div>
                );
              }) : ''}
            <br/><br/>
            <form id="add-form" className="" onSubmit={props.handleSubmit} style={{marginTop: 100}}>
              <div className="input-field col l10 s12 m12">
                <i className="material-icons prefix">account_circle</i>
                <textarea id="icon_prefix2" onChange={props.onChange} name="comment"
                    className="materialize-textarea" value={props.state.description} required/>
                <label htmlFor="icon_prefix2">Leave A Comment</label>
              </div>
              <div className="col l10 s12">
                <button style={{borderRadius: '25%'}} type="submit"
                className="right btn waves-effect waves-light red lighten-1" disabled={props.token === null || props.decoded.adminUser ? true : false}>Send</button>
              </div>
            </form>
        </div>
    );
}

Reviews.propTypes = {
    event: PropTypes.object,
    onChange: PropTypes.func,
    handleSubmit: PropTypes.object,
    state: PropTypes.object,
    token: PropTypes.string,
    decoded: PropTypes.object,
    setTime: PropTypes.func,
};


export default Reviews;