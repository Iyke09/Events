
import React, { Component } from 'react';

function Loader(props) {
    return (
        <div className="preloader-wrapper center big active" id="loads">
            <div className="spinner-layer spinner-blue">
                <div className="circle-clipper left">
                    <div className="circle" />
                        </div><div className="gap-patch">
                            <div className="circle" />
                        </div><div className="circle-clipper right">
                    <div className="circle" />
                </div>
            </div>
      </div> 
    );
}


export default Loader;