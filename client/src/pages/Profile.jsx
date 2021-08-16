import { Component } from 'react';
import BottomNav from '../components/BottomNav/BottomNav';

import iconLinkedin from '../assets/icons-feather-1.5px/linkedin.svg';
import iconGithub from '../assets/icons-feather-1.5px/github.svg';
import iconEmail from '../assets/icons-feather-1.5px/mail.svg';

class Profile extends Component {

  // Each user would have their own profile
  // state = {
  //   user_id: parseInt(localStorage.getItem('user_id'))
  // }

  render() {

    return (
      <section className="about-me">
        <h1 className="about-me__name">Cristian Niculescu</h1>
        <div className="links">
          <a className="link" href="mailto:Cristian.Niculescu@gmail.com">
            <img className="icon" src={iconEmail} alt="email icon" />
            <h4>Cristian.Niculescu@gmail.com</h4>
          </a>
          <a className="link" href="https://github.com/CristianNic">
            <img className="icon" src={iconGithub} alt="github icon" />
            <h4>Github.com/CristianNic</h4>
          </a>
          <a className="link" href="https://github.com/CristianNic">
            <img className="icon" src={iconLinkedin} alt="linkedin icon" />
            <h4>Linkedin.com/in/cristian-niculescu/</h4>
          </a>
        </div>
        <div className="farewell">
          <h2>Hope you had fun exploring</h2>
          <h2>our beautiful city!</h2>
        </div>
        <BottomNav />
      </section>
    );
  }
}

export default Profile;