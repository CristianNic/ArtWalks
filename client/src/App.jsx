import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Gallery from './pages/Gallery'
import ArtMap from './pages/ArtMap';
import Saved from './pages/Saved';
import Details from './pages/Details';
import Profile from './pages/Profile';
import PageNotFound from './components/PageNotFound/PageNotFound';
import ScrollToTop from './components/Utils/ScrollToTop';

class App extends Component {

  render() {

    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Redirect exact from='/' to='/login' />
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={SignUp} />  
            <Route exact path='/gallery' component={Gallery} />
            <Route path='/map' component={ArtMap} />       
            <Route exact path='/saved' component={Saved} />
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





