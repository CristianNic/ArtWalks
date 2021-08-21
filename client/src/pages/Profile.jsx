import { Component } from 'react';
import BottomNav from '../components/BottomNav/BottomNav';
import iconLinkedin from '../assets/icons-feather-1.5px/linkedin.svg';
import iconGithub from '../assets/icons-feather-1.5px/github.svg';
import iconEmail from '../assets/icons-feather-1.5px/mail.svg';

class Profile extends Component {

  render() {

    return (
      <section className="about">
        <h1 className="about__name">Cristian Niculescu</h1>
        <div className="about__link-container">
          <a className="about__link" href="mailto:Cristian.Niculescu@gmail.com">
            <img className="about__icon" src={iconEmail} alt="email icon" />
            <h4 className="about__text">Cristian.Niculescu@gmail.com</h4>
          </a>
          <a className="about__link" href="https://github.com/CristianNic">
            <img className="about__icon" src={iconGithub} alt="github icon" />
            <h4 className="about__text">Github.com/CristianNic</h4>
          </a>
          <a className="about__link" href="https://github.com/CristianNic">
            <img className="about__icon" src={iconLinkedin} alt="linkedin icon" />
            <h4 className="about__text">Linkedin.com/in/cristian-niculescu/</h4>
          </a>
        </div>
        <div className="about__farewell">
          <h2 className="about__farewell-mesg">Hope you had fun exploring</h2>
          <h2 className="about__farewell-mesg">our beautiful city!</h2>
        </div>
        <BottomNav />
      </section>
    );
  }
}

export default Profile;