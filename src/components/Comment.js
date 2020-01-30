import React, { Component, Fragment } from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

class Comment extends Component {
    state = {
        comment:0,
        like:0
    }
    componentDidMount() {
        axios.get("http://localhost:8000/jumlahcomment")
        .then((result) => {
            console.log(result.data.status)
            this.setState({
            comment: result.data.status
        })
        // console.log(result)
    })
        axios.get("http://localhost:8000/jumlahlike")
        .then((result2) => {
            console.log(result2.data.status)
            this.setState({
            like: result2.data.status
        })
        // console.log(result)
    })
    }
    
render() {
return (
<Fragment>

    <div>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active" href="#">Tweets</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Tweets & replies</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Media</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Likes</a>
            </li>

        </ul>
    </div>
    <div class="row">
        <div class="col-md-8">
            <img className="rounded-circle cmnprofile" src={require('../image/profile.png')} alt="" />
        </div>
        <div class="col-sm-8 comment">
            <h5>Adobe @Adobe. 1h</h5>
            <p>#DYK emails can drive up to 40% of customers to purchase? Read up on three tips to make your brand's
                strategy effortless & effective: https://adobe.ly/312BhA9</p>
            <img className="rounded" src={require('../image/status.jpg')} alt="" />
            <div class="row">
                <div class="col liskom">
                    <button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModal">
                        <img src={require('../icon/komentar.PNG')} alt="" /> {this.state.comment}
                    </button>
                </div>
                <div class="col liskom">
                    <button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModal">
                        <img src={require('../icon/reload.PNG')} alt="" /> 
                    </button>
                </div>
                <div class="col liskom">
                    <button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModal">
                        <img src={require('../icon/like.PNG')} alt="" />{this.state.like}
                    </button>
                </div>
                <div class="col liskom">
                    <button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModal">
                        <img src={require('../icon/upload.PNG')} alt="" />
                    </button>
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="row modalcnt">
                        <div class="col text-center">
                            <img src={require('../icon/modalimg.PNG')} alt="" />
                            <h5>Reply to join the conversation</h5>
                            <p>Once you join Twitter, you can respond to Adobe's Tweet</p>
                            <button class="btn btn-block btn-primary rounded-pill">Log in</button>
                            <button class="btn btn-block btn-outline-primary rounded-pill">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</Fragment>

);
}
}

export default Comment;