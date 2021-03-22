// import React from 'react';
// import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Map from './pages/Map';
import Explore from './pages/Explore';
import Favourites from './pages/Favourites';
import Details from './pages/Details';
import Profile from './pages/Profile';
import Test from './pages/Test';
import TestImg from './pages/TestImg';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from='/' to='/login' />
          <Route exact path='/login' component={Login} />  
          <Route exact path='/map' component={Test} />       
          <Route exact path='/search' component={Explore} />
          <Route exact path='/favourites' component={Favourites} />
          <Route exact path='/details/:id' component={Details} />
          <Route exact path='/profile/:id' component={Profile} />
        </Switch>
      </Router>
    );
  }
}

export default App;

// <Route exact path='/login' component={Auth} />
// <Route exact path='/browse' component={Browse} />  
