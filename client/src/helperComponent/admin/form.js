
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'react-firebase-file-uploader';
import Loader from '../notifications/loader';

function Form(props) {
    return (
        <form className="row" id="add-form" onSubmit={props.handleSubmit}>
            { props.loader ? <Loader /> : ''}
            <h4 className="col s12 center light">{props.activeRoute('edit') ? 'Edit ' : 'Add '}Center!</h4>
            <small className="col s12 center light font3">
            Lorem ipsum dolor sit amet
            </small>
            <div className="row">
                <div className="">
                    <div className=" col s12">
                        {props.state.isUploading &&
                            <p><b>Progress:</b> {props.state.progress}</p>
                        }
                        {props.state.avatarURL &&
                            <img className="responsive-img" style={{height: 300, width: '100%'}}
                            src={props.state.avatarURL} />
                        }
                        <br/><br/>
                        <i className="material-icons prefix">add_a_photo</i>
                        <label style=
                            {{backgroundColor: 'steelblue', color: 'white',
                            padding: 10, borderRadius: 4, pointer: 'cursor'}}>
                            Select an image
                            <FileUploader
                                hidden
                                accept="image/*"
                                name="avatar"
                                randomizeFilename
                                storageRef={props.firebase}
                                onUploadStart={props.handleUploadStart}
                                onUploadError={props.handleUploadError}
                                onUploadSuccess={props.handleUploadSuccess}
                                onProgress={props.handleProgress}
                            />
                        </label>
                    </div>
                    <div className="input-field col m6 s12">
                        <i className="material-icons prefix">home</i>
                        <input id="icon_telephone" type="tel"
                        onChange={props.onChange} value={props.state.name} name="name" className="validate" placeholder="Name" required/>
                    </div>
                    <div className="input-field col s12 m6">
                        <i className="material-icons prefix">add_location</i>
                        <input id="icon_telephone" name="location" type="text"
                        onChange={props.onChange} value={props.state.location} className="validate" placeholder="Address" required/>
                    </div>
                    <div className="row">
                        <div className="col s12 m6">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">attach_money</i>
                            <input id="icon_telephone" name="price" type="number"
                            onChange={props.onChange} value={props.state.price} className="validate" placeholder="Price" />
                        </div>
                        </div>
                        <div className="col s12 m6">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">people</i>
                            <input id="icon_telephone" name="capacity" type="number"
                            onChange={props.onChange} value={props.state.capacity} className="validate" placeholder="Capacity" required/>
                        </div>
                        </div>
                    </div>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">mode_edit</i>
                        <textarea id="icon_prefix2" onChange={props.onChange} name="description"
                        className="materialize-textarea" value={props.state.description} required/>
                        {props.activeRoute('edit') ? '' : <label htmlFor="icon_prefix2">Description</label>}
                    </div>
                </div>
                <div className="" style={{textAlign: 'center'}}>
                    <button type="submit"
                        className="btn waves-effect waves-light red lighten-1">
                        {props.activeRoute('edit') ? 'Edit ' : 'Add '}Center
                    </button>
                </div>
            </div>
        </form>
    );
}

Form.propTypes = {
    state: PropTypes.object,
    firebase: PropTypes.object,
    onChange: PropTypes.func,
    handleProgress: PropTypes.func,
    handleUploadError: PropTypes.func,
    handleUploadStart: PropTypes.func,
    handleUploadSuccess: PropTypes.func,
    activeRoute: PropTypes.func,
    handleSubmit: PropTypes.func,
    loader: PropTypes.bool
};

export default Form;