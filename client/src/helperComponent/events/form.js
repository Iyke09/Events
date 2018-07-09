
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Error from '../notifications/error';
import Loader from '../notifications/loader';

function Form(props) {
    return (
        <div className="">
            <form className="col s12" id="add-form" onSubmit={props.handleSubmit}>
                { props.error ? <Error error={props.error} closeErrMsg={props.closeErrMsg}/>: ''}
                { props.loader ? <Loader /> : ''}
                <h4 className="col s12 center light titlr">{props.activeRoute('edit') ? 'Update' : 'Add an'} Event!</h4>
                <small className="col s12 center light font3">Lorem ipsum dolor sit amet</small>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">mail</i>
                        <input id="icon_telephone" type="tel" name="title"
                        className="validate first" value={props.state.title} onChange={props.handleChange} required/>
                        <label htmlFor="icon_telephone" className="active">Enter title</label>
                    </div>
                    <div className="col m1 s1">
                        <i className="material-icons prefix">home</i>
                    </div>
                    <div className="col m11 s11">
                        <select id="sel" name="value" className="browser-default"
                            onChange={props.handleChange} disabled={props.activeRoute('edit')}>
                            {
                                props.centers.map((center) => {
                                    return (
                                        <option key={center.id} value={center.name}
                                        defaultValue={props.centerSet === center.name || props.state.centerName === center.name ? true : false}>{center.name}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="input-field col s12 m6">
                        <i className="material-icons prefix">alarm_on</i>
                        <input id="time" type="time"
                        value={props.state.time} name="time" className="validate"
                        onChange={props.handleChange} required/>
                        <label htmlFor="time" />
                    </div>
                    <div className="input-field col s12 m6">
                        <i className="material-icons prefix">event</i>
                        <input id="icon_telephone" type="date" name="date"
                        className="validate" value={props.state.date} onChange={props.handleChange} required/>
                        <label htmlFor="icon_telephone" />
                    </div>
                    <div className="input-field col s12 m6">
                        <i className="material-icons prefix">check</i>
                        <input id="icon_telephone" type="text" name="type" className="validate"
                        onChange={props.handleChange} value={props.state.type} required/>
                        <label htmlFor="icon_telephone" className="active">Type of Event</label>
                    </div>
                    <div className="input-field col s12 m6">
                        <i className="material-icons prefix">perm_identity</i>
                        <input id="icon_telephone" type="number" name="guests"
                        className="validate" value={props.state.guests} onChange={props.handleChange} required/>
                        <label htmlFor="icon_telephone">Expected guests</label>
                    </div>
                </div>
                <div className="" style={{textAlign: 'center'}}>
                    <button type="submit"
                        className="btn waves-effect waves-light red lighten-1">
                            {props.activeRoute('edit') ? 'Update' : 'Add'} Event
                    </button>
                </div>
            </form>
        </div>
    );
}

Form.propTypes = {
    centers: PropTypes.object,
    centerSet: PropTypes.string,
    error: PropTypes.string,
    activeRoute: PropTypes.func,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    state: PropTypes.object,
    closeErrMsg: PropTypes.func,
    loader: PropTypes.bool
};


export default Form;