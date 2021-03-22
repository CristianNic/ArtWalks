import React from 'react'
import { Link } from 'react-router-dom'

// import iconSearch from '../../assets/icons-feather/search.svg'
// import iconMap from '../../assets/icons-feather/map.svg'
// import iconSaved from '../../assets/icons-feather/heart.svg'
// import iconDetails from '../../assets/icons-feather/archive.svg'
// import iconProfile from '../../assets/icons-feather/align-justify.svg'

import iconSearch from '../../assets/icons-feather-1px/search.svg'
import iconMap from '../../assets/icons-feather-1px/map.svg'
import iconSaved from '../../assets/icons-feather-1px/heart.svg'
import iconDetails from '../../assets/icons-feather-1px/archive.svg'
import iconProfile from '../../assets/icons-feather-1px/align-justify.svg'

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__container">
        <div className="bottom-nav__btn">
          <Link to="/search">
            <img className="bottom-nav__icon" src={iconSearch} alt="search icon" />
            <h4>Explore</h4>
            {/* <h4>Search</h4> */}
          </Link>
        </div>
        <div className="bottom-nav__btn">
          <Link to="/map">
            <img className="bottom-nav__icon" src={iconMap} alt="map icon" />
            <h4>Map</h4>
          </Link>
        </div>
        <div className="bottom-nav__btn">
          <Link to="/favourites">
            <img className="bottom-nav__icon" src={iconSaved} alt="favourites icon" />
            {/* <h4>Favourites</h4> */}
            <h4>Saved</h4>
          </Link>
        </div>
        <div className="bottom-nav__btn">
          <Link to="/details/:id">
            <img className="bottom-nav__icon" src={iconDetails} alt="details icon" />
            <h4>Details</h4>
          </Link>
        </div>
        <div className="bottom-nav__btn">
          <Link to="/profile/:id">
            <img className="bottom-nav__icon" src={iconProfile} alt="profile icon" />
            <h4>Profile</h4>
          </Link>
        </div>
      </div>
    </nav>
  )
}






// <nav className="l-footer">
// 	{/* <h3 className="l-footer__text">© Vancouver Art Walk. All Rights Reserved.</h3> */}
// 	<h3 className="l-footer__text">Happy Walking</h3>
// </nav>

