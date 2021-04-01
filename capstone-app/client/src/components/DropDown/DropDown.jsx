// https://codedaily.io/tutorials/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked
// consider addingmouse clicks outside of drop down to close it 
import { React, Component } from "react";
import BottomNav from '../BottomNav/BottomNav';
import './DropDown.scss'

class DropDown extends Component {

  state = {
    open: false,
  };

  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open,
      };
    });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <button type="button" class="button" onClick={this.handleButtonClick}>
            ☰
          </button>
          {this.state.open && (
            <div class="dropdown">
              <ul>
                <h1>Title</h1>
                <h2>Artist</h2>
                <h2>Neighbourhood</h2>
                <h2>Medium</h2>
                <h2>Statement</h2>
              </ul>
            </div>
          )}

        </div>
        <BottomNav/>
      </div>
    );
  };
}

export default DropDown;


