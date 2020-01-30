import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { ButtonContainer3 } from "./Button3";
import { ButtonContainer2 } from "./Button2";
import Comment from './Comment';
import Sidebar from './Sidebar';
import Sidebar2 from './Sidebar2';


class Landing extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            submit: false
           
        }
    }

    componentDidMount(){
        const token = localStorage.usertoken
        if(token){
        const decoded = jwt_decode(token)
        this.setState({
          username : decoded.username,
          password : decoded.password,
          submit : true,
        })
        console.log(decoded)
      }
        
        
    }
  render() {
    const submit = this.state.submit;
    return (
      <div className="container">
          <div class='row'>
              <div className="col-md-8">
                  <div className="gambar">
                    <img src="https://pbs.twimg.com/profile_banners/63786611/1562601846/600x200" width="670px"/>
                  </div>
                  <div className="adobe">
                    <img src={require('../image/adobe.jpg')} width="150px" className="adobe2"/>
                  </div>
                  <div className="content-header">
                  <h5> Adobe  <img src={require('../image/ceklist.PNG')} /></h5>
                  <span className="span">@Adobe</span>
                  <p>Changing the world through digital experience. Need help? visit us at <a href="helpx.adobe.com/support.html">helpx.adobe.com/support.html</a> or reach out to <a href="helpx.adobe.com/support.html">@AdobeCare</a></p>    
                  <img src={require('../image/location.PNG')} /> <span className="span">Location: All over the world</span>  <img src={require('../image/blog.PNG')} /> <a href="#">theblog.adobe.com</a> <img src={require('../image/date.PNG')} /> <span className="span">Joined August 2009</span>
                  <br/>
                  <strong>185</strong> <span className="span">Following</span>  <strong>652.1K</strong> <span className="span">Followers</span>
                  </div>
              </div>
              {!submit ? (
                <Sidebar/>
              ) : (
                <Sidebar2/>
              )}

          </div>
          <Comment />
</div>
    )
  }
}

export default Landing