import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
// import MapArt from './pages/MapArt';
// import MapArt2 from './pages/MapArt2';
// import MapArt4 from './pages/MapArt4_skateVideo';
import ArtMap from './pages/ArtMap';
// import Explore from './pages/Explore';
import Saved from './pages/Saved';
import Details from './pages/Details';
import Profile from './pages/Profile';
import Gallery from './pages/Gallery'
import PageNotFound from './components/PageNotFound/PageNotFound';

// Test pages: 
// import LayeredMap from './pages/LayeredMap/LayeredMap';
// import LayeredMapChloro from './pages/LayeredMapChloro/LayeredMapChloro';

// import { withRouter } from "react-router";
import ScrollToTop from './components/Utils/ScrollToTop';

class App extends Component {

  render() {

    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Redirect exact from='/' to='/login' />
            {/* <Route exact path='/login' component={Login} handleLogin={this.handleLogin()}/>   */}
            {/* <Route exact path='/login' render={props => <Login {...props} />} /> */}
            {/* <Route exact path='/login' render={props => <Login handleLogin = {this.handleLogin} />} /> */}
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={SignUp} />  
            {/* <Route path='/map' component={MapArt} />        */}
            <Route path='/map' component={ArtMap} />       
            {/* <Route exact path='/art_works' component={Explore} />
            <Route exact path='/art_works/:id' component={Details} /> */}
            <Route exact path='/saved' component={Saved} />
            {/* <Route exact path='/layered_map' component={LayeredMap} />
            <Route exact path='/layered_map_chloro' component={LayeredMapChloro} /> */}
            <Route exact path='/gallery' component={Gallery} />
            <Route path='/details/:id' component={Details} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/*' component={PageNotFound} />
          </Switch>
        </ScrollToTop>
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





