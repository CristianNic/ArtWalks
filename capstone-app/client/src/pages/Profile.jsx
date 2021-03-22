import { Component } from 'react';
import BottomNav from '../components/BottomNav/BottomNav';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
      <section className="profile">
        <h1>Name: Eric Johnson</h1>
        <h2>Logout: OK</h2>
        <h2>Update Email</h2>
        <h2>Would you like be be notified of upcoming exibits? [yes]</h2>
        <BottomNav />
      </section>
    );
  }
}

export default Profile;