import React, { Component, Fragment } from 'react';
import jwt_decode from 'jwt-decode'
import './style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { comment } from './userFunction'
import { like } from './userFunction'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

class Comment extends Component {
    constructor(){
        super()   
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
       
    }
    state = {
        comment:0,
        like:0,
        submit: false,
        isi: '',
        username:'',
        modal :true,
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
      }
    onSubmit(e) {
        e.preventDefault()
        const NewComment = {
          username: this.state.username,
          comment1: this.state.isi
        }
    
        comment(NewComment).then(res => {
          console.log(NewComment)
          console.log(res)
          if(res){
          if(res.error){
              alert(res.error)
          }
        }
        else{
          alert('Terimakasih anda telah berkomentar')
          window.location.reload();
        }
        })
      }
      
    modal(e){
        e.preventDefault()
        $('#exampleModal').modal('hide')
        window.location.href='/login';        
    }
    like(e){
        e.preventDefault()
        const NewLike = {
            username: this.state.username
            
          }
      
          like(NewLike).then(res => {
            console.log(NewLike)
            console.log(res)
            if(res){
            if(res.error){
                alert(res.error)
            }
          }
          else{
            alert('Terimakasih anda telah like postingan ini')
            window.location.reload();
          }
          })
    }
    componentDidMount() {
        const token = localStorage.usertoken
        if(token){

        const decoded = jwt_decode(token)
        this.setState({
          submit : true,  
          username : decoded.username,
        })
        console.log(decoded)
      }
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
    const submit = this.state.submit;
    const modal = this.state.modal;
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
                    <button type="button" class="btn btn-link" onClick={this.like.bind(this)}>
                        <img src={require('../icon/like.PNG')} alt="" />{this.state.like}
                    </button>
                </div>
                <div class="col liskom">
                    <button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModal">
                        <img src={require('../icon/upload.PNG')} alt=""/>
                    </button>
                </div>
            </div>
        </div>
        {
        (submit ? (
        <form noValidate onSubmit={this.onSubmit}>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="row modalcnt">
                        <div class="col ">
                            <h5 className="mb-1"><img className="rounded-circle cmnprofile" src={require('../image/profile.png')} alt="" />Adobe @Adobe. 1h</h5>
                            <p className="mb-1">Climate action has never been more important, & the days of acting alone are over. We’re proud to join
                                @CeresNews
                                & peer companies to call on leaders in California, Oregon & Washington to reduce emissions through cap-and-invest programs.</p>

                            <form>
                                <div class="form-group">
                                    <textarea class="form-control" id="isi" name="isi" value={this.state.isi} onChange={this.onChange} rows="3"></textarea>
                                </div>
                            </form>
                            <button type="submit" class="btn btn-block btn-primary rounded-pill">Balas</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </form>
        ) : (
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="row modalcnt">
                        <div class="col text-center">
                            <img src={require('../icon/modalimg.PNG')} alt="" />
                            <h5>Reply to join the conversation</h5>
                            <p>Once you join Twitter, you can respond to Adobe's Tweet</p>
                            {/* <Link to="/login" className="ml-auto"> */}
                            
                            <button class="btn btn-block btn-primary rounded-pill" onClick={this.modal.bind(this)}>Log in</button>
                         
                            {/* </Link> */}
                            <Link to="/register" className="ml-auto">
                            <button class="btn btn-block btn-outline-primary rounded-pill">Sign up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ))
}
    </div>
</Fragment>

);
}
}

export default Comment;