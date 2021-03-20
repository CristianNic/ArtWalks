import { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import TopNav from '../../components/TopNav/TopNav';

class Login extends Component {
  render() {
    return (
      <div>
        <TopNav />
          <section className="login">
            {/* <div className="login__container">
              <h1 className="login__title">Vancouver Art Walk</h1>
              <h4 className="login-p">A friendly public art walking your</h4>
            </div> */}
            <form action="" className="login-form">
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
            </form>
            <form action="" className="login-form">
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
            </form>
            <form action="" className="login-form">
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
            </form>
            <form action="" className="login-form">
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
            </form>
            <form action="" className="login-form">
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
            </form>
            <form action="" className="login-form">
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
            </form>
            <form action="" className="login-form">
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
            </form>
            <form action="" className="login-form">
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
            </form>
          </section>
        <BottomNav />
      </div>
    );
  }
}

export default Login;


// <form role="form">
//   <div class="form-group">
//     <label> Team/company name</label>
//     <input type="text" name="team" autofocus="autofocus" class="form-control">
//       <span class="invalid-feedback" style="display: none;">
                
//             </span></div> <div class="form-group"><label>Name</label> <input type="text" name="name" autofocus="autofocus" class="form-control"> <span class="invalid-feedback" style="display: none;">
            
//         </span></div> <div class="form-group"><label>Email Address</label> <input type="email" name="email" class="form-control"> <span class="invalid-feedback" style="display: none;">
            
//         </span></div> <div class="form-group"><label>Password</label> <input type="password" name="password" class="form-control"> <span class="invalid-feedback" style="display: none;">
            
//         </span></div> <div><button class="btn btn-primary mt-4 w-full"><span><i class="fa fa-btn fa-check-circle"></i> <span>Let's get started</span></span></button></div> <input type="hidden"> <input type="hidden"> <input type="hidden"> <input type="hidden"></form>