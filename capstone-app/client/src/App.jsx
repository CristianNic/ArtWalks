// import React from 'react';
// import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Map from './pages/Map';
import Search from './pages/Search';
import Favourites from './pages/Favourites';
import Details from './pages/Details';
// import Profile from './pages/Profile';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from='/' to='/login' />
          <Route exact path='/login' component={Login} />  
          <Route exact path='/map' component={Map} />       
          <Route exact path='/search' component={Search} />
          <Route exact path='/favourites' component={Favourites} />
          <Route exact path='/details/:id' component={Details} />
          {/* <Route exact path='/profile/:id' component={Profile} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;

// <Route exact path='/login' component={Auth} />
// <Route exact path='/browse' component={Browse} />  
