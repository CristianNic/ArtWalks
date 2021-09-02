import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../components/Utils/Utils';

class Login extends Component {
  
  state = {
    email: 'john.piry@gmail.com',
    password: 'johnpiry',
  }

  handleLogin = (event) => {
    event.preventDefault();
    axios.post(`${API_URL}/login`, this.state)
      .then(response => {
        localStorage.setItem('userID', response.data.user_id);
        this.props.history.push('/gallery');        
      }).catch(err => {
          console.log(err);
      })
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  render() {

    return (
      <div>
        <section className="login">
          <div className="login__container">    
            <div>
              <h1 className="login__title-welcome">Welcome to </h1>
              <h1 className="login__title-logo">ArtWalks</h1>
            </div>
            <div className="login__form-container">
              <h2 className="login__sign-in">Sign in</h2>
              <form className="login__form">
                <input className="login__input" type="email" name="email" placeholder="Email" id="email" autofocus="autofocus"
                  value={this.state.email}
                  onChange={this.handleInputChange} />
                <input className="login__input" type="password" name="password" placeholder="Password" id="password" autofocus="autofocus"
                  value={this.state.password}
                  onChange={this.handleInputChange} />    
                <button className="login__btn" type="submit" name="login" id="login"
                  onClick={this.handleLogin}>Log In</button>
              </form>
              <div className="new-user">
                <h2 className="new-user__title">I'm a new user.</h2>
                <Link to="/signup">
                  <h2 className="new-user__sign-up">Sign Up</h2>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
