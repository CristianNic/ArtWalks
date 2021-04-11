import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../components/BottomNav/BottomNav';

class Login extends Component {

  state = {
    // email: 'Cristian.Niculescu@gmail.com',
    // password: '123456789',
    email: '', // email: localStorage.getItem('email') || '',
    password: '' // password: localStorage.getItem('password') || '',
    // user_id: '',  // temp could have it here to pass to the next component
  }

  // Send login information to the API
  handleLogin = (event) => {
    axios.post('http://localhost:8090/signup', this.state)
      .then(response => {
          console.log(response.data);
          // Store the auth token by the server in your session storage
          // sessionStorage.authToken = response.data.token;
        
          // redirect to /map 
        // debugger
        this.props.history.push('/map');
        // https://surajsharma.net/blog/current-url-in-react
        // https://reactrouter.com/web/api/NavLink
        

      }).catch(err => {
          console.log(err);
      })
    console.log('handleLogin Clicked')
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

  componentDidUpdate = (e) => {
    console.log('Hello')
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
                <h2 className="login__title-sub">Sign up to continue!</h2>
              </div>
              <div className="login__form">
                <label className="login__email-label" htmlFor="email">Email</label>
                <input className="login__email" type="email" name="email" placeholder="Email" id="email"
                  value={this.state.email}
                  onChange={this.handleInputChange} />
                  
                <label className="login__password-label" htmlFor="password">Password</label>
                <input className="login__password" type="password" name="password" placeholder="Password" id="password"
                  value={this.state.password}
                  onChange={this.handleInputChange} />
              
                <label className="login__password-label" htmlFor="password">Retype Password</label>
                <input className="login__password" type="password" name="password" placeholder="Retype password" id="password"
                  value={this.state.password}
                  onChange={this.handleInputChange} />
              
                <div className="login__btn-container">
                  {/* <button className="login__btn login__btn--submit" type="submit" name="submit" id="submit" 
                    onClick={this.state.signUp}>Sign Up</button> */}
                <button className="login__btn login__btn--login down" type="submit" name="login" id="login"
                  onClick={this.handleLogin}>Sign Up</button>
              </div>
              <h2 className="or">or</h2>
                <button className="login__btn login__btn--login" type="submit" name="login" id="login"
                  onClick={this.handleLoginGmail}>SignUp with Gmail</button>
                <button className="login__btn login__btn--login" type="submit" name="login" id="login"
                  onClick={this.handleLoginGitHub}>SignUp with Github</button>
              </div>
              <div className="new-user">
                <h2 className="new-user__title">I'm already signed up.</h2>
                <Link className="link" to="/login"><h2>Login</h2></Link>
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

/* 
// <form role="form">
//   <div class="form-group">
//     <label> Team/company name</label>
//     <input type="text" name="team" autofocus="autofocus" class="form-control">
//       <span class="invalid-feedback" style="display: none;">
                
//             </span></div> <div class="form-group"><label>Name</label> <input type="text" name="name" autofocus="autofocus" class="form-control"> <span class="invalid-feedback" style="display: none;">
            
//         </span></div> <div class="form-group"><label>Email Address</label> <input type="email" name="email" class="form-control"> <span class="invalid-feedback" style="display: none;">
            
//         </span></div> <div class="form-group"><label>Password</label> <input type="password" name="password" class="form-control"> <span class="invalid-feedback" style="display: none;">
            
//         </span></div> <div><button class="btn btn-primary mt-4 w-full"><span><i class="fa fa-btn fa-check-circle"></i> <span>Let's get started</span></span></button></div> <input type="hidden"> <input type="hidden"> <input type="hidden"> <input type="hidden"></form> 
*/