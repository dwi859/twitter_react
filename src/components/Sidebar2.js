import React, { Component, Fragment } from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { ButtonContainer3 } from "./Button3";
import { ButtonContainer2 } from "./Button2";

class Sidebar2 extends Component {
render() {
return (
<Fragment>

    <div className="col-md-4">
        <div className="testimoni">
            <img src={require('../image/testimoni.PNG')} /> 
        </div>
        <div className="testimoni">
            <strong className="strong">You Might Also like</strong><br/>
            {/* <img src={require('../image/testimoni.PNG')} />  */}
            <div className="isi">
                <div className="side-image">
                    <img src={require('../image/ps.PNG')} /> 
                </div>
                <div className="object">
                    <strong>Adobe Potoshop</strong> <img src={require('../image/ceklist.PNG')} />
                    <span className="span">@Photoshop</span>
                </div>
                <div className="button">
                <ButtonContainer2>
                Follow
                </ButtonContainer2>
                </div>
            </div><br/>
            <div className="isi">
                <div className="side-image">
                    <img src={require('../image/ps.PNG')} /> 
                </div>
                <div className="object">
                    <strong>Adobe Creative Clo..</strong> <img src={require('../image/ceklist.PNG')} />
                    <span className="span">@Creativecloud</span>
                </div>
                <div className="button">
                <ButtonContainer2>
                Follow
                </ButtonContainer2>
                </div>
            </div>
        </div>  
    </div> 
</Fragment>

);
}
}

export default Sidebar2;