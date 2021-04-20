// import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';
import './Saved.scss'
import BottomNav from '../components/BottomNav/BottomNav';
import Search from '../components/Search/Search';
// import ArtWorks from '../components/ArtWorks/ArtWorks'; 
// import SavedItems from '../components/SavedItems/SavedItems';
import { API_URL } from '../components/utils'; 

import heartRed from '../assets/icons/heart_red.svg';
import lightGray1Heart2Filled from '../assets/icons/heart-light-gray-1-2px-filled.svg';
// import heartWhite from '../assets/icons/heart_white.svg';
import iconMap from '../assets/icons-feather-1.5px/map.svg';
// import redHeart from '../assets/icons/heart_red.svg';
// import whiteHeart2 from '../assets/icons/heart-white-2px.svg';
// import lightGray1Heart2 from '../assets/icons/heart-light-gray-1-2px.svg';
// import iconDetails from '../assets/icons-feather-1.5px/archive.svg'
import iconMaximize from '../assets/icons/maximize-2-1.5px.svg'


class Saved extends Component {

  state = {
    user_id: parseInt(localStorage.getItem('user_id')),
    userFavourites: [],
    mapLink: 0,
  }

  componentDidMount() {
    this.getUserFavourites()
    // this.removeDuplicatsOK()
  }

  componentDidUpdate() {
    // this.removeDuplicatsOK()
  }

  getUserFavourites() {
    axios
      .get(`${API_URL}/favourites/${this.state.user_id}`)
      .then((response) => {

        // remove duplicates
        const arr = response.data 
        const SymbolArray = [];
        arr.forEach((item, index) => {
          const { art_work_id, art_works } = item;
          let keyStr = `${art_work_id}_${art_works}`;
          SymbolArray.push(Symbol.for(keyStr));
        });

        const result = [];
          SymbolArray.forEach((item, index) => {
            if (SymbolArray.indexOf(item) === index) {
              result.push(arr[index]);
            }
          });
        // console.log('filtered array w/o duplicates', result)
        this.setState({
          userFavourites: result,
        })
      })
      .catch((error) => {
      console.log('error:', error.response.data);
    })
  }
  
  
  removeFromFavourites = (e, data) => {
    axios
      .delete(`${API_URL}/favourites/${this.state.user_id}/remove/${data}`)
      .then((response) => {
      })
      .catch((error) => {
      console.log('error:', error.response.data);
    })
    window.location.reload()
  }

  addToFavourites = (e, data) => {

    this.state.userFavourites.forEach(function (item, index) {
      if (item.registry_id === data) {
        const position = index + 1 
        localStorage.setItem('art_work_id_for_user_post', position)
      }
    })

    const art_work_id_for_user_post = parseInt(localStorage.getItem('art_work_id_for_user_post'))

    axios
      .post(`${API_URL}/favourites/${this.state.user_id}/${art_work_id_for_user_post}`)
      //.delete(`${API_URL}/favourites/${this.state.user_id}/remove/${data}`)
      .then((response) => {
      })
      .catch((error) => {
      console.log('error:', error.response.data);
    })
    window.location.reload()
  }


  placeArtWorkOnMap = (e, data) => {
    console.log('Clicked placeArtWorkOnMap -->', data) // artWork registry_id
    this.setState(state => {
      return {
        mapLink: state.data,
      }
    });
    // console.log(this.state.art_work.registry_id)
    localStorage.setItem('currently viewing', data)
  }

  render() {

    console.log(`Hi, I'm the favourites for user --> `, this.state.user_id)
    console.log(`User's favourties --> `, this.state.userFavourites)
 
    return (
      <div>
        <Search />
        <section className="favourites">

          {this.state.userFavourites.map((faves, i) => (
            <div className="favourites__card" key={i}>
              <div className="favourites__card-container">

                <div className="favourites__card-top">
                  <LazyLoad className="favourites__media-lazyload" offsetVertical={700} overflow={true} >
                    <img className="favourites__media-img" src={faves.art_works.photo_url_jpg} alt={faves.art_works.title}></img>
                  </LazyLoad>

                  {/* // ----------- Working - once read heart removed page refreshes --------- //  */}
                  <img className="favourites__media-icon" src={heartRed} alt="red heart icon"
                    // onClick={(e) => {this.removeFromFavourites(e, faves.art_works.registry_id)}}></img>  
                    onClick={(e) => {this.removeFromFavourites(e, faves.art_work_id)}}></img>  
                    {/* onClick={(e) => {this.removeFromFavourites(e, i)}}></img>   */}
                  
                  {/* // ----------- Display gray heart to add back --------- //  */}
                  {/* {this.state.userFavourites.map((fave) => fave.art_works).includes(faves.registry_id) === true ? (
                    
                    <img className="favourites__media-icon" src={heartRed} alt="red heart icon, click to remove from favourites"
                      onClick={(e) => {this.removeFromFavourites(e, faves.registry_id)}}></img>
                  ) : (
                    // <img className="icon" src={lightGray1Heart2} alt="white heart icon, click to add to favourites"
                    <img className="favourites__media-icon" src={lightGray1Heart2Filled} alt="white heart icon, click to add to favourites"
                      onClick={(e) => { this.addToFavourites(e, faves.registry_id) }}></img>
                  )} */}

                </div>

                <div className="favourites__card-bottom">
                  <div className="favourites__info">
                    <h1 className="favourites__title">{faves.art_works.title}</h1>
                    <h2 className="favourites__artist">by {faves.art_works.artists_names}</h2>
                  </div>

                  {/* <div> */}
                    <div className="favourites__links">
                      <Link to={`/map/${faves.art_works.registry_id}`}>
                        <button className="favourites__links-button"
                          onClick={(e) => { this.placeArtWorkOnMap(e, faves.art_works.registry_id) }} >
                            <img className="favourites__links-map-icon" src={iconMap} alt="map icon"></img>
                        </button>
                      </Link>
                      {/* <Link to={`/details/${faves.art_works.registry_id}`}> */}
                      <Link to={`/details/${faves.art_works.registry_id}`}>
                        <button className="favourites__links-button">
                            {/* onClick={(e) => { this.placeArtWorkOnMap(e, faves.art_works.registry_id) }} > */}
                              {/* <img className="favourites__links-details-icon" src={iconDetails} alt="map icon"></img> */}
                              <img className="favourites__links-details-icon" src={iconMaximize} alt="map icon"></img>
                        </button>
                      </Link>
                    </div>
                  {/* </div> */}
            
                </div>
              </div>
            </div>
          ))}
        </section>
        <BottomNav />
      </div>
    );
  }
}

export default Saved;