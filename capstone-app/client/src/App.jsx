// import React from 'react';
// import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MapArt from './pages/MapArt';
import Explore from './pages/Explore';
import Saved from './pages/Saved';
import Details from './pages/Details';
import Profile from './pages/Profile';
import LayeredMap from './pages/LayeredMap/LayeredMap';
import LayeredMapChloro from './pages/LayeredMapChloro/LayeredMapChloro';
import PhotoGrid from './components/PhotoGrid/PhotoGrid'
import PhotoGrid2x from './components/PhotoGrid2x/PhotoGrid2x'
import DropDown from './components/DropDown/DropDown'
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
          <Route exact path='/signup' component={SignUp} />  
          <Route exact path='/map' component={MapArt} />       
          <Route exact path='/art_works' component={Explore} />
          <Route exact path='/art_works/:id' component={Details} />
          {/* <Route exact path='/favourites' component={Saved} /> */}
          <Route exact path='/profile/:id' component={Profile} />
          <Route exact path='/layered_map' component={LayeredMap} />
          <Route exact path='/layered_map_chloro' component={LayeredMapChloro} />
          <Route exact path='/photo-grid' component={PhotoGrid} />
          <Route exact path='/photo-grid2x' component={PhotoGrid2x} />
          <Route exact path='/dropdown' component={DropDown} />
          <Route exact path='/*' component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}
export default App;

// Login calls - gets data - then passes it to map and explore
// how to set data on the parent component  

// Auth
// https://reactrouter.com/native/example/auth-workflow
// https://auth0.com/blog/react-router-4-practical-tutorial/
// https://auth0.com/blog/complete-guide-to-react-user-authentication/
// http://www.passportjs.org/docs/configure/






