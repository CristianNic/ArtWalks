import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../components/utils';
import BottomNav from '../components/BottomNav/BottomNav';

class Login extends Component {
  
  state = {
    email: '', // email: localStorage.getItem('email') || '',
    password: '', // password: localStorage.getItem('password') || '',
    user_id: '',
  }

  handleLogin = (event) => {
    event.preventDefault();
    axios.post(`${API_URL}/login`, this.state)
      .then(response => {
        console.log('user_id', response.data);
        // Store the auth token by the server in your session storage
        // sessionStorage.authToken = response.data.token;
        this.setState({
          user_id: response.data.user_id,
        })
        
        window.location = `http://localhost:3000/map/${this.state.user_id}`;

        // Get current url location
        // https://surajsharma.net/blog/current-url-in-react
        // https://reactrouter.com/web/api/NavLink
        
      }).catch(err => {
          console.log(err);
      })
    // console.log('handleLogin Clicked')
  }

  handleLoginGmail = (e) => {
  }
  handleLoginGitHub = (e) => {
  }

  // Update the state with form information
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
    // localStorage.setItem(event.target.name, event.target.value);  // place them here - and then they become state to be passed along ... 
  }

  // formSumbit = (event) => {
  //   event.preventDefault();
  // }
  
  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
      return re.test(email);
    } else {
      alert("Enter a valid Email");
      return false;
    }
  }

  render() {

    return (
      <div>
        {/* <TopNav /> */}
          <section className="login">
            <div className="login__container">
              <div className="login__title">
                <h1 className="login__title-top">Welcome,</h1>
                <h2 className="login__title-sub">Sign in to continue!</h2>
              </div>
              <form className="login__form">
                <label className="login__email-label" htmlFor="email">Email</label>
                <input className="login__email" type="email" name="email" placeholder="Email" id="email" autofocus="autofocus"
                  value={this.state.email}
                  onChange={this.handleInputChange} />
                  
                <label className="login__password-label" htmlFor="password">Password</label>
                <input className="login__password" type="password" name="password" placeholder="Password" id="password" autofocus="autofocus"
                  value={this.state.password}
                  onChange={this.handleInputChange} />
                <h3 className="forgot">Forgot Password?</h3>
              
                <div className="login__btn-container">
                  {/* <button className="login__btn login__btn--submit" type="submit" name="submit" id="submit" 
                    onClick={this.state.signUp}>Sign Up</button> */}
                <button className="login__btn login__btn--login" type="submit" name="login" id="login"
                  onClick={this.handleLogin}>Log In</button>
              </div>
              <h2 className="or">or</h2>
                <button className="login__btn login__btn--login" type="submit" name="login" id="login"
                  onClick={this.handleLoginGmail}>Connect with Gmail</button>
                <button className="login__btn login__btn--login" type="submit" name="login" id="login"
                  onClick={this.handleLoginGitHub}>Connect with Github</button>
              </form>
              <div className="new-user">
                <h2 className="new-user__title">I'm a new user.</h2>
                <Link className="link" to="/signup"><h2>Sign Up</h2></Link>
              </div>
          </div>
            {/* <form action="" className="login-form">
              <div className="login-form__container">
                <div className="login-form__guest">
                  <label htmlFor="" className="login-form__label">Guest</label>
                  <button className="login-form__buton">Proceed as Guest</button>
                </div>
                <h2>----- or -----</h2>
                <div className="login-form__signup">
                  <label htmlFor="" className="login-form__label">Sign Up</label>
                  <button className="login-form__buton">Proceed as Guest</button>
                </div>
                <h2>----- or -----</h2>
                <div className="login-form__signup">
                  <label htmlFor="" className="login-form__label">Sign Up</label>
                  <button className="login-form__buton">Proceed as Guest</button>
                </div>
              </div>
            </form> */}

          </section>
        <BottomNav />
      </div>
    );
  }
}

export default Login;
