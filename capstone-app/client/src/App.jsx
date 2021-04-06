// import React from 'react';
// import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import MapArt from './pages/MapArt';
import Explore from './pages/Explore';
import Saved from './pages/Saved';
import Details from './pages/Details';
import Profile from './pages/Profile';
import LayeredMap from './pages/LayeredMap/LayeredMap';
import LayeredMapChloro from './pages/LayeredMapChloro/LayeredMapChloro';
import PageNotFound from './components/PageNotFound/PageNotFound';

// import axios from "axios"; <-- make call here and pass data down

// Deploying with Git | Heroku Dev Center
// const API_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://git.heroku.com/name-of-project.git"
//     : "http://localhost:8090";


// import Test from './pages/Test';
// import TestImg from './pages/TestImg';


// <Route exact path='/login' component={Auth} />
// <Route exact path='/browse' component={Browse} />  
// Write art_works routes = use here less confusion, maybe same page can be loaded in two ways?
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from='/' to='/login' />
          <Route exact path='/login' component={Login} />  
          <Route exact path='/map' component={MapArt} />       
          <Route exact path='/art_works' component={Explore} />
          <Route exact path='/art_works/:id' component={Details} />
          <Route exact path='/favourites' component={Saved} />
          <Route exact path='/profile/:id' component={Profile} />
          <Route exact path='/layered_map' component={LayeredMap} />
          <Route exact path='/layered_map_chloro' component={LayeredMapChloro} />
          <Route exact path='/*' component={PageNotFound} />

        </Switch>
      </Router>
    );
  }
}
export default App;

