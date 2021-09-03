import { Component } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';
import { API_URL } from '../utils/Utils'; 
import BottomNav from '../components/BottomNav/BottomNav';
import Search from '../components/Search/Search';
import heartRed from '../assets/icons/heart_red.svg';
import lightGray1Heart2Filled from '../assets/icons/heart-light-gray-1-2px-filled.svg';
import iconMap from '../assets/icons-feather-1.5px/map.svg';
import iconMaximize from '../assets/icons/maximize-2-1.5px.svg'

class Saved extends Component {

  state = {
    userID: parseInt(localStorage.getItem('userID')),
    userFavouritesToFilter: [],
    userFavourites: [],
    userNeighbourhoods: [],
    userFavouritesByArtWorkID: []
  }

  componentDidMount() {
    this.getUserFavourites()
  }
  
  componentDidUpdate() {
  }

  getUserFavourites() {
    axios
      .get(`${API_URL}/favourites/${this.state.userID}`)
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
        // list unique neighbourhoods within users favourites
        const userNeighbourhoods = result.map((faves) => faves.art_works.neighbourhood)
        const uniqueUserNeighbourhoods = [...new Set(userNeighbourhoods)]
        const filtered = uniqueUserNeighbourhoods.filter(function (value, index, arr) {
          return value !== "";
        })
        this.setState({
          userFavourites: result,
          userFavouritesToFilter: result,
          userFavouritesByArtWorkID: result.map(art_work_id => art_work_id.art_work_id),
          userNeighbourhoods: filtered
        })
        
      })
      .catch((error) => {
      console.log('error:', error.response.data);
    })
  }

  addToFavourites = (e, art_work_id) => {
    axios
      .post(`${API_URL}/favourites/${this.state.userID}/${art_work_id}`)
      .then((response) => {
        this.setState({
          userFavouritesByArtWorkID: this.state.userFavouritesByArtWorkID.concat(art_work_id)
        })
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })
  }
  
  removeFromFavourites = (e, art_work_id) => {
    console.log("Remove from Favourites ID -->", art_work_id)
    axios
      .delete(`${API_URL}/favourites/${this.state.userID}/remove/${art_work_id}`)
      .then((response) => {
        this.setState({
          userFavouritesByArtWorkID: this.state.userFavouritesByArtWorkID.filter(item => item !== art_work_id),
        })
      })
      .catch((error) => {
      console.log('error:', error.response.data);
    })
    // reload window removes saved item immediately from view w/o a chance to re-add to faves
    // window.location.reload()
  }

  placeArtWorkOnMap = (registry_id) => {
    localStorage.setItem('openPopUp', registry_id)
  }

  selectNeighbourhood = (location) => {  
    const filteredData = this.state.userFavouritesToFilter.filter(area =>
      area.art_works.neighbourhood === location.target.value);
    if ('Vancouver' === location.target.value || '' === location.target.value) {
      this.setState({ userFavourites: this.state.userFavouritesToFilter })
    } else {
      this.setState({ userFavourites: filteredData })
    };
  }

  sortBySaved = () => {
    this.setState({ userFavourites: this.state.userFavouritesToFilter })
    window.location.reload()
  }

  render() {

    return (
      <section>
        <Search
          neighbourhoods={this.state.userNeighbourhoods}
          selectNeighbourhood={this.selectNeighbourhood}
          sortBySaved={this.sortBySaved} />
        <section className="faves">
          {/* {this.state.userFavourites.map((faves, i) => (
            <div className="faves__card" key={i}> */}
          {this.state.userFavourites.map(faves => (
            <div className="faves__card" key={faves.art_work_id}>
              <div className="faves__card-container">
                <div className="faves__card-top">
                  <LazyLoad className="faves__media-lazyload" offsetVertical={700} overflow={true} >
                    <img className="faves__media-img" src={faves.art_works.photo_url_jpg} alt={faves.art_works.title}></img>
                  </LazyLoad>
                  {/* {this.state.artWorkInFavourites === true ? ( */}
                  {this.state.userFavouritesByArtWorkID.includes(faves.art_work_id) === true ? (
                    <img className="faves__media-icon" src={heartRed} alt="red heart icon"
                      onClick={(e) => {this.removeFromFavourites(e, faves.art_work_id)}}>
                    </img>
                  ) : (
                    <img className="faves__media-icon" src={lightGray1Heart2Filled} alt="red heart icon"
                      onClick={(e) => {this.addToFavourites(e, faves.art_work_id)}}>
                    </img>
                  )}
                </div>
                <div className="faves__card-bottom">
                  <div className="faves__info">
                    <h1 className="faves__title">{faves.art_works.title}</h1>
                    {faves.art_works.artists_names === "" ?
                      (<h2 className="faves__artist">Artist(s) currently unavailable</h2>)
                      : (<h2 className="faves__artist">by {faves.art_works.artists_names}</h2>)}
                  </div>
                  <div className="faves__links">
                    <Link to={`/map/${faves.art_works.registry_id}`}>
                      <button className="faves__links-button"
                        onClick={(e) => { this.placeArtWorkOnMap(faves.art_works.registry_id) }}>
                        <img className="faves__links" src={iconMap} alt="map icon"></img>
                      </button>
                    </Link>
                    <Link to={`/details/${faves.art_works.registry_id}`}>
                      <button className="faves__links-button">
                        <img className="faves__links-details-icon" src={iconMaximize} alt="map icon"></img>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <BottomNav />
      </section>
    );
  }
}

export default Saved;