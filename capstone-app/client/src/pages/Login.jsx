import { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav/BottomNav';
import TopNav from '../components/TopNav/TopNav';

class Login extends Component {

  state = {
    user: '',
    email: '',
    password: '',
  }

  formSumbit = (event) => {
    event.preventDefault();
  }

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
        <TopNav />
          <section className="login">
            <div className="login__container">
              <h1 className="login__title">Welcome</h1>
              <form className="login__form">
                <label className="login__email-label" htmlFor="email">Email</label>
                <input className="login__email" type="email" name="email" placeholder="Email" id="email"
                  value={this.state.email}
                  onChange={this.state.handleChange} />
                  
                <label className="login__password-label" htmlFor="password">Password</label>
                <input className="login__password" type="password" name="password" placeholder="Password" id="password"
                  value={this.state.password}
                  onChange={this.state.handleChange} />
              
                <div className="login-btn-container">
                  <button className="login__btn login__btn--submit" type="submit" name="submit" id="submit" 
                    onClick={this.state.signUp}>Sign Up</button>

                  <button className="login__btn login__btn--login" type="submit" name="login" id="login"
                    onClick={this.state.login}>Log In</button>
                </div>
                
              </form>

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