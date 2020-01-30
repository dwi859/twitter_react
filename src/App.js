import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Landing from './components/Landing';
import Register from './components/Register';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
      <Route exact path="/" component={Landing} />
        <Route exact path="/landing" component={Landing} /> 
         <Route exact path="/login" component={Login} />
         <Route exact path="/register" component={Register} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
