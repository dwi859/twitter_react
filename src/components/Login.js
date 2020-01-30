import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import logo from '../logo.svg'
import { login } from './userFunction';
import {useAlert} from 'react-alert';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            username : '',
            password : '',
            
        }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()
        const User = {
            username : this.state.username,
            password : this.state.password
        }
        
        login(User).then (res => {
            if(res) {
                if(res.error){
                    alert('Wrong Username or password')
                }else{
                console.log(res)
                alert('Selamat datang ' +this.state.username)
                this.props.history.push('/landing')
                }
            }
        })
    }
    componentDidMount(){
        $('#exampleModal').modal('hide')
    }
    
    render() {
        return (
            <div class="container">
                <div class="row justify-content-center">
                    <LoginWrapper className="navbar navbar-expand-sm navbar-dark px-sm-3">
                    <form noValidate onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Username</label>
                                <input type="email" class="form-control" id="username" name ="username" value={this.state.username} onChange={this.onChange} aria-describedby="emailHelp"/>
                                
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.onChange} id="password"/>
                            </div>
                            
                            <button type="submit" class="btn btn-primary" >
                                Login
                            </button>
                            <Link to ="/" className="ml-2">
                                <input type="submit" class="btn btn-primary" value="Back"/>
                            </Link>
                    </form>

                    </LoginWrapper>
                
                </div>
            </div>
        )
    }
}

const LoginWrapper = styled.nav`
background:var(--lightBlue);

.nav-link{
    color:var(--mainBlue) !important;
    font-size:1.3rem;
    text-transform:capitalize;
}
`;
