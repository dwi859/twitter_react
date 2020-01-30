import React, { Component } from 'react'
import { register } from './userFunction'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import logo from '../logo.svg'

import {useAlert} from 'react-alert';

export default class Register extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      email: '',
      telp: '',
      address: ''
    
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const NewUser = {
      username: this.state.username,
      telp: this.state.telp,
      email: this.state.email,
      address: this.state.address,
      password: this.state.password
    }

    register(NewUser).then(res => {
      console.log(NewUser)
      console.log(res)
      if(res){
      if(res.error){
          alert(res.error)
      }
    }
    else{
      alert('Verified!!')
      this.props.history.push('/login')
    }
    })
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
                    <div class="form-group">
                        <label for="exampleInputPassword1">email</label>
                        <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.onChange} id="email"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">telp</label>
                        <input type="number" class="form-control" name="telp" value={this.state.telp} onChange={this.onChange} id="telp"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">address</label>
                        <textarea class="form-control" name="address" value={this.state.address} onChange={this.onChange} id="address"/>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" >
                        Register
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
