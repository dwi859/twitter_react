import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { ButtonContainer2 } from "./Button2";
import logo from '../logo.svg'
import jwt_decode from 'jwt-decode'

 class Landing extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
           
        }
    }

    componentDidMount(){
        const token = localStorage.usertoken
        if(token){
        const decoded = jwt_decode(token)
        this.setState({
          username : decoded.username,
          password : decoded.password,
          
            
        })
        console.log(decoded)
      }
        
        
    }

    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/landing')
        
    }
    render() {
        const loginRegLink = (
        <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
            <div className="container">
                <img src={require('../image/twitter.png')} width="30px"/>
                <div class="icon">
                    <input class="input" type="text" placeholder="Search" aria-label="Search"/>
                </div>
                <Link to="/login" className="ml-auto">
                    <ButtonContainer2>
                        Login
                    </ButtonContainer2>
                </Link>
                <Link to="/register" className="ml-2">
                    <ButtonContainer>
                        Sign Up
                    </ButtonContainer>
                </Link>
                </div>
             </NavWrapper>
        )
        const userLink = (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                <div className="container">
                    <img src={require('../image/twitter.png')} width="30px"/>
                    <div class="icon">
                        <input class="input" type="text" placeholder="Search" aria-label="Search"/>
                    </div>
                    <Link to="" className="ml-auto">
                        {this.state.username}
                    </Link>
                    <Link to="" onClick={this.logOut.bind(this)} className="ml-2">
                    <ButtonContainer>
                        Logout
                    </ButtonContainer>
                </Link>
                </div>
             </NavWrapper>
            )
        return (
            <div>
                {localStorage.usertoken ? userLink : loginRegLink}
            </div>
        )
    }
}

const NavWrapper = styled.nav`
background:var(--mainWhitee);
.nav-link{
    color:var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
}
`;

export default withRouter(Landing)
