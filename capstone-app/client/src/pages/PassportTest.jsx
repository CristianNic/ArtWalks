import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './PassportTest/components/PrivateRoute';
import AuthButton from './PassportTest/components/AuthButton';
import LoginPage from './PassportTest/components/LoginPage';
import PublicPage from './PassportTest/components/PublicPage';
import ProtectedPage from '/PassportTest./components/ProtectedPage';
// import './PassportTest/App.scss';

// Authentication server URL
export const API_URL = 'http://localhost:3000';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <AuthButton />
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          <Route path="/login" component={LoginPage} />
          <Route path="/public" component={PublicPage} />
          <PrivateRoute path="/protected" component={ProtectedPage} />
        </div>
      </Router>
    );
  }
}
