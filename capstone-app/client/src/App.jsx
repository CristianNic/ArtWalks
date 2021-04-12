import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MapArt from './pages/MapArt';
import Explore from './pages/Explore';
// import Saved from './pages/Saved';
import Details from './pages/Details';
import Profile from './pages/Profile';
import Gallery from './components/Gallery/Gallery'
import PageNotFound from './components/PageNotFound/PageNotFound';

// Test pages: 
// import LayeredMap from './pages/LayeredMap/LayeredMap';
// import LayeredMapChloro from './pages/LayeredMapChloro/LayeredMapChloro';

class App extends Component {

  render() {

    return (
      <Router>
        <Switch>
          <Redirect exact from='/' to='/login' />
          {/* <Route exact path='/login' component={Login} handleLogin={this.handleLogin()}/>   */}
          {/* <Route exact path='/login' render={props => <Login {...props} />} /> */}
          {/* <Route exact path='/login' render={props => <Login handleLogin = {this.handleLogin} />} /> */}
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={SignUp} />  
          <Route exact path='/map' component={MapArt} />       
          <Route exact path='/art_works' component={Explore} />
          <Route exact path='/art_works/:id' component={Details} />
          {/* <Route exact path='/favourites' component={Saved} /> */}
          <Route exact path='/profile/:id' component={Profile} />
          {/* <Route exact path='/layered_map' component={LayeredMap} />
          <Route exact path='/layered_map_chloro' component={LayeredMapChloro} /> */}
          <Route exact path='/gallery' component={Gallery} />
          <Route exact path='/*' component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}
export default App;


// Auth
// https://reactrouter.com/native/example/auth-workflow
// https://auth0.com/blog/react-router-4-practical-tutorial/
// https://auth0.com/blog/complete-guide-to-react-user-authentication/
// http://www.passportjs.org/docs/configure/





