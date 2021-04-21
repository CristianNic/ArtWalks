import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../components/Utils/Utils';
// import BottomNav from '../components/BottomNav/BottomNav';

class Login extends Component {
  
  state = {
    email: '', // email: localStorage.getItem('email') || '',
    password: '', // password: localStorage.getItem('password') || '',
    user_id: '', 
    // user_id: localStorage.setItem(this.state.user_id)
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
        localStorage.setItem('user_id', this.state.user_id);
        // sessionStorage.setItem('user_id', this.state.user_id); // deleted after tab is closed

        // window.location = `http://localhost:3000/map/${this.state.user_id}`;
        // window.location = `http://localhost:3000/map/`;
        // this.props.history.push('/map');
        this.props.history.push('/gallery');
        // Get current url location
        // https://surajsharma.net/blog/current-url-in-react
        // https://reactrouter.com/web/api/NavLink
        
      }).catch(err => {
          console.log(err);
      })
    // console.log('handleLogin Clicked')
  }
  // populateStorage = () => {
  //   localStorage.setItem('user_id', this.state.user_id);
  // }

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
        <section className="login">
          <div className="login__container">
           
            <h1 className="login__title">Welcome to ArtWalks</h1>
 
            <div className="login__form-container">

              <h2 className="login__sign-in">Sign in</h2>
              
              <form className="login__form">

                <input className="login__input" type="email" name="email" placeholder="Email" id="email" autofocus="autofocus"
                  value={this.state.email}
                  onChange={this.handleInputChange} />
                  
                <input className="login__input" type="password" name="password" placeholder="Password" id="password" autofocus="autofocus"
                  value={this.state.password}
                  onChange={this.handleInputChange} />
            
                {/* <h3 className="forgot">Forgot Password?</h3> */}
              
                <button className="login__btn" type="submit" name="login" id="login"
                  onClick={this.handleLogin}>Log In</button>
   
              </form>

              <div className="new-user">
                <h2 className="new-user__title">I'm a new user.</h2>
                <Link className="link" to="/signup"><h2>Sign Up</h2></Link>
              </div>

            </div>

          </div>
        </section>
        {/* <BottomNav /> */}
      </div>
    );
  }
}

export default Login;
