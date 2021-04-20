import { Component } from 'react';
import BottomNav from '../components/BottomNav/BottomNav';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Profile extends Component {

  state = {
    user_id: parseInt(localStorage.getItem('user_id'))
  }

  render() {

    console.log(`Hi, I'm the profile for user --> `, this.state.user_id)

    return (
      <section className="about-me">
        <h1 className="about-me__name">Cristian Niculescu</h1>
        
        <h2>Email:</h2>
        <h4><a href="mailto:Cristian.Niculescu@gmail.com">Cristian.Niculescu@gmail.com</a></h4>
        
        <h2>Github:</h2>
        <h4><a href="https://github.com/CristianNic">https://github.com/CristianNic</a></h4>

        <h2>LinkedIn:</h2>
        <h4><a href="https://www.linkedin.com/in/cristian-niculescu/">https://www.linkedin.com/in/cristian-niculescu/</a></h4>
 
        <div className="notes">
          <h3>Notes:</h3>
          <h3> 1. Show they're links </h3>
          <h3> 2. Add icons </h3>
          <h3> 3. Style unique background </h3>
        </div>


        <h2>Thank you for exploring our beautiful city!</h2>
        {/* <h2>I hope you had fun exploring our beautiful city!</h2> */}
        
        <BottomNav />
      </section>
    );
  }
}

export default Profile;