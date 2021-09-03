import React from 'react'
import { Link } from 'react-router-dom'
import { Component } from 'react';
import iconSearch from '../../assets/icons-feather-1.5px/search.svg'
import iconMap from '../../assets/icons-feather-1.5px/map.svg'
import iconSaved from '../../assets/icons-feather-1.5px/heart.svg'
import iconDetails from '../../assets/icons-feather-1.5px/archive.svg'
import iconProfile from '../../assets/icons-feather-1.5px/align-justify.svg'

class BottomNav extends Component {

  state = {
    openPopUp:  []
  }

  componentDidMount() {
    this.getLastOpened()
  }
  
  getLastOpened() {
    this.setState({
      openPopUp: parseInt(localStorage.getItem("openPopUp"))
    })
  }

  render() {

    return (
      <nav className="bottom-nav">
        <div className="bottom-nav__container">
          <div className="bottom-nav__btn">
            <Link to="/gallery">
              <img className="bottom-nav__icon" src={iconSearch} alt="search icon" />
              <h4>Explore</h4>
            </Link>
          </div>
          <div className="bottom-nav__btn">
            <Link to="/map">
              <img className="bottom-nav__icon" src={iconMap} alt="map icon" />
              <h4>Map</h4>
            </Link>
          </div>
          <div className="bottom-nav__btn">
            <Link to="/saved">
              <img className="bottom-nav__icon" src={iconSaved} alt="favourites icon" />
              <h4>Saved</h4>
            </Link>
          </div>
          <div className="bottom-nav__btn">
            <Link to={`/details/${this.state.openPopUp}`}>
              <img className="bottom-nav__icon" src={iconDetails} alt="details icon" />
              <h4>Details</h4>
            </Link>
          </div>
          <div className="bottom-nav__btn">
            <Link to="/profile">
              <img className="bottom-nav__icon" src={iconProfile} alt="profile icon" />
              <h4>Profile</h4>
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}
 
export default BottomNav;

