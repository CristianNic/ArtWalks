import { Component } from "react";
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazy-load';
import axios from 'axios';
import { neighbourhoods, API_URL } from '../components/Utils/Utils';
import BottomNav from '../components/BottomNav/BottomNav';
import Search from '../components/Search/Search';
import redHeart from '../assets/icons/heart_red.svg';
import lightGray1Heart2Filled from '../assets/icons/heart-light-gray-1-2px-filled.svg';
import iconMap from '../assets/icons-feather-1.5px/map.svg';
import iconMaximize from '../assets/icons/maximize-2-1.5px.svg'

class Gallery extends Component {

  state = {
    userID: parseInt(localStorage.getItem('userID')),
    artWorks: [],                
    artWorksToFilter: [],      
    userFavourites: [],
    userFavouritesByRegistryID: [],
    display: false,
    expand: 0,
    liked: false,
    mapLink: 0, // art[0].registry_id
    id: 1,
    neighbourhoods: [],
    artistStatement: [],
    sortBySavedClicked: true
  }

  // handleButtonClick = () => {
  //   this.setState(state => {
  //     return {
  //       display: !state.display,
  //       expand: 7, // this.props.id,
  //     };
  //   });
  //   console.log('can I add more features?', this.state.display)
  // };

  // handleChange = (event) => {
  // this.setState({
  //   [event.target.name]: event.target.value,
  // });
  
  componentDidMount() {
    this.getUserId();
    this.getArtWorks();
    // this.getArtWorksData();
    this.getUserFavourites();
    this.reduceArrayIntoPairs(this.state.artWorks);
   }

  componentDidUpdate() {
    // console.log("User", this.state.userID, "Faves by Reg.ID --> ", this.state.userFavouritesByRegistryID);
    // console.log("UserFavourites --> ", this.state.userFavourites);
  }

  getUserId = () => {
    const userID = parseInt(localStorage.getItem('userID', this.state.userID));
    this.setState({ userID: userID })
  }

  getArtWorks() {
    axios
      .get(`${API_URL}/art_works`)
      .then((response) => {

        // const artistStatement = this.replaceUnknownChar(response.data.art_works.map(item => item.artist_statement))
        const artistStatement = response.data.art_works.map(item => item.artist_statement)

        this.setState({
          artWorks: response.data.art_works,
          artWorksToFilter: response.data.art_works,
          artistStatement: artistStatement,
          neighbourhoods: neighbourhoods
        })
      })
      .catch((error) => {console.log('error:', error.response.data)})
  }

  // getUserFavourites() {   // Gallery.jsx
  //   axios
  //     .get(`${API_URL}/favourites/${this.state.userID}`)
  //     .then((response) => {
  //       this.setState({
  //         userFavourites: response.data,
  //         userFavouritesByRegistryID: response.data.map((fave) => fave.artWorks.registry_id)
  //       })
  //       // console.log('USER FAVOURITES -->', this.state.userFavourites)
  //       // const faves = this.state.userFavourites;
  //       // console.log('USER Favourites -- in RENDER ---> ', faves)

  //       // const userArtWorkIdMaped = faves.map((fave => fave.art_work_id)) // User's Favourites have this ID
  //       // console.log('userArtWorkIdMaped ---> ', userArtWorkIdMaped)

  //       // console.log('Does this include 158?-->', userArtWorkIdMaped.includes(158))

  //       // const userRegistryId = faves.map((fave) => fave.artWorks.registry_id);
  //       // console.log("userRegistryId ---> ", userRegistryId);
  //     })
  //     .catch((error) => {
  //     console.log('error:', error.response.data);
  //   })
  // }

  getUserFavourites() {   // Saved.jsx
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
        // list unique neighbourhoods within user's favourites
        // const userNeighbourhoods = result.map((faves) => faves.artWorks.neighbourhood)
        // const uniqueUserNeighbourhoods = [...new Set(userNeighbourhoods)]
        // const filtered = uniqueUserNeighbourhoods.filter(function (value, index, arr) {
        //   return value != "";
        // })
        console.log("Result", result)

        const userFavouritesByRegistryID = result.map(item => item.art_works.registry_id)

        console.log("INSIDE GET --> userFavouritesByRegistryID --> ", userFavouritesByRegistryID)

        const userFavouritesByArtWorkID = result.map(item => item.art_work_id)

        console.log("INSIDE GET --> userFavouritesByArtWorkID --> ", userFavouritesByArtWorkID)

        this.setState({
          userFavourites: result,
          // userNeighbourhoods: filtered
          userFavouritesByRegistryID: userFavouritesByRegistryID,
          userFavouritesByArtWorkID: userFavouritesByRegistryID
        })
      })
      .catch((error) => {
      console.log('error:', error.response.data);
    })
  }

  addToFavourites = (e, data) => {
    console.log("Clicked addToFavourites")
    this.setState(state => {
        return {display: !state.display}
    })
    this.state.artWorks.forEach(function (item, index) {
      if (item.registry_id === data) {
        const position = index + 1 
        localStorage.setItem('art_work_id_for_user_post', position)
      }
    })
    const art_work_id_for_user_post = parseInt(localStorage.getItem('art_work_id_for_user_post'))
    //console.log(`${API_URL}/favourites/${this.state.userID}/${art_work_id_for_user_post}`)

    axios
      .post(`${API_URL}/favourites/${this.state.userID}/${art_work_id_for_user_post}`)
      .then((response) => {
        // this.forceUpdate()
        // this.setState(state => {
        //   return {display: !state.display}
        // })
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })
    window.location.reload() 
    // this.forceUpdate()
  
    this.setState(state => {
      return {display: !state.display}
    })
    //  window.location.reload() 
    // this.forceUpdate()
    // localStorage.removeItem('art_work_id_for_user_post');
    // this.forceUpdate()
    localStorage.removeItem('art_work_id_for_user_post');
  }

  removeFromFavourites = (e, registry_id) => {
    console.log("removeFromFaves Clicked --> ", registry_id)
    console.log("removeFromFaves Clicked --> this.state.userFavourites", this.state.userFavourites)

    const userFavourites = this.state.userFavourites.map(item => item.art_works)
    const ArtWorkID = userFavourites.find(item => item.registry_id === registry_id).id

    console.log("artWorkID", ArtWorkID)
    
    axios
      .delete(`${API_URL}/favourites/${this.state.userID}/remove/${ArtWorkID}`)
      .then((response) => {
        this.setState(state => {
          return {display: !state.display}
        })
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })
    this.setState(state => {
      return {display: !state.display}
    })
    window.location.reload() 
  }

  reduceArrayIntoPairs = () => {
    const rows = this.state.artWorks.reduce(function (rows, key, index) {
      return (
        (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
        rows
      );
    }, []);
    //console.log(rows);
    return rows; // <--- map rows
  }
  
  expandArtWorkDetails = (e, data) => {
    e.currentTarget.style.boxshadow = "none";
    this.setState(state => {
      return {
        display: !state.display,
        //expand: 7, // this.props.id,
        expand: data,
      };
    });
    // console.log('Display --> ', this.state.display)
    // console.log('Expand --> ', this.state.expand)
    // console.log('Expand --> ', data)
  }
  
  placeArtWorkOnMap = (registry_id) => {

    localStorage.setItem("openPopUp", registry_id)
    // localStorage.setItem("openPopUp", data); 
    
    console.log("registry_ID", registry_id)
    // this.context.router.push(`/map/${registry_id}`)
    // console.log('Clicked placeArtWorkOnMap -->', data) // artWork registry_id
    // this.setState(state => {
    //   return {
    //     mapLink: state.data,
    //   }
    // });
    // localStorage.setItem('currently viewing', data)
  }

  // setOpenPopUp() {
  //   localStorage.setItem("openPopUp",)
  // }

  //---- Search Bar ----//
  selectNeighbourhood = (location) => {
    if ('Vancouver' === location.target.value || '' === location.target.value ) {
      this.setState({ artWorks: this.state.artWorksToFilter })  
    } else {
      const filteredData = this.state.artWorksToFilter.filter(area =>
        area.neighbourhood === location.target.value);
      if (filteredData.length % 2 === 0) {
      } else {
        filteredData.pop();
      }
    this.setState({ artWorks: filteredData })
    }
  }

  sortBySaved = () => {
    const userFavouritesArtWorks = this.state.userFavourites.map(faves => faves.art_works)
    if (userFavouritesArtWorks.length % 2 === 0) {
    } else {
      userFavouritesArtWorks.pop(); 
    }
    this.setState({ artWorks: userFavouritesArtWorks })
  }

  replaceUnknownChar = (text) => {
    return text.replace(/\uFFFD/g, '')
  }
  render() {

    // console.log("this.state.userFavourites ---> ", this.state.userFavourites); // must include art[1].registry_id
    // console.log("art works--> ", this.state.artWorks)
    // console.log("artistStatement--> ", this.state.artistStatement)

    return (
      <div>
        <Search
          neighbourhoods={this.state.neighbourhoods}
          selectNeighbourhood={this.selectNeighbourhood}
          sortBySaved={this.sortBySaved}
        />
        <div className="gallery">
          {this.reduceArrayIntoPairs(this.state.artWorks).map(art =>
            <div className="gallery__pairs-wrapper" key={art[0].registry_id}>
              <div className="gallery__img-buttons-container">
                <button className="gallery__img-button">
                  <div className="gallery__img-container">
                    <LazyLoad className="gallery__img-lazyload" offsetVertical={700} overflow={true} >
                      <img className="gallery__img-img" onClick={(e) => {this.expandArtWorkDetails(e, art[0].registry_id) }} src={art[0].photo_url_jpg} alt={art[0].title}></img>
                    </LazyLoad>
                    {this.state.userFavouritesByRegistryID.includes(art[0].registry_id) === true ? (
                      <img className="gallery__like-icon" src={redHeart} alt="red heart icon, clicking removes from favourites"
                        onClick={(e) => {this.removeFromFavourites(e, art[0].registry_id)}}></img>
                      ) : (
                      <img className="gallery__like-icon" src={lightGray1Heart2Filled} alt="white heart icon, clicking adds to favourites"
                        onClick={(e) => {this.addToFavourites(e, art[0].registry_id)}}></img>
                    )}
                  </div>
                </button>
                <button className="gallery__img-button">
                  <div className="gallery__img-container">
                    <LazyLoad className="gallery__img-lazyload" offsetVertical={700} overflow={true} >
                      <img className="gallery__img-img" onClick={(e) => {this.expandArtWorkDetails(e, art[1].registry_id) }} src={art[1].photo_url_jpg} alt={art[1].title}></img>
                    </LazyLoad>    
                    {this.state.userFavouritesByRegistryID.includes(art[1].registry_id) === true ? (
                      <img className="gallery__like-icon" src={redHeart} alt="red heart icon, clicking removes from favourites"
                        onClick={(e) => {this.removeFromFavourites(e, art[1].registry_id)}}></img>
                      ) : (
                      <img className="gallery__like-icon" src={lightGray1Heart2Filled} alt="white heart icon, clicking adds to favourites"
                        onClick={(e) => {this.addToFavourites(e, art[1].registry_id)} }></img>
                    )}
                  </div>
                </button>
              </div>
              {this.state.display && this.state.expand === art[0].registry_id && (
                <div className="expander">
                  <div className="expander__arrow-down left-arrow"></div>
                  <div className="expander__card">
                    <div className="expander__card-top">
                      <div className="expander__card-info">
                        <h1 className="expander__card-title">{art[0].title}</h1>
                        <h2 className="expander__card-text italic">by {art[0].artists_names}</h2>
                        <h3 className="expander__card-text">{art[0].type}, {art[0].neighbourhood}</h3>
                      </div>
                      <div className="expander__card-links">
                        <Link to={`/map/${art[0].registry_id}`}>
                          <button className="button" onClick={(e) => {this.placeArtWorkOnMap(art[0].registry_id)}}>
                            <img src={iconMap} alt="map icon"></img>
                          </button>
                        </Link>
                        <Link to={`/details/${art[0].registry_id}`}>
                          <button className="button">
                            <img src={iconMaximize} alt="map icon"></img>
                          </button>
                        </Link>
                      </div>
                    </div>
                    {art[1].artist_statement === "" ? (
                      <h4 className="expander__card-artist-statement">Artist statement for this artwork is not present in the the City of Vancouver database. </h4>
                      ) : (
                      <h4 className="expander__card-artist-statement">{this.replaceUnknownChar(art[1].artist_statement)}</h4>)}
                  </div>
                </div>
              )}
              {this.state.display && this.state.expand === art[1].registry_id && (              
                <div className="expander">
                  <div className="expander__arrow-down right-arrow"></div>
                  <div className="expander__card">
                    <div className="expander__card-top">
                      <div className="expander__card-info">
                        <h1 className="expander__card-title">{art[1].title}</h1>
                        <h2 className="expander__card-text italic">by {art[1].artists_names}</h2>
                        <h3 className="expander__card-text">{art[1].type}, {art[1].neighbourhood}</h3>
                      </div>
                      <div className="expander__card-links">
                        <Link to={`/map/${art[1].registry_id}`}>
                          <button className="button" onClick={(e) => {this.placeArtWorkOnMap(art[1].registry_id)}}>
                            <img src={iconMap} alt="map icon"></img>
                          </button>
                        </Link>
                        <Link to={`/details/${art[1].registry_id}`}>
                          <button className="button">
                            <img src={iconMaximize} alt="map icon"></img>
                          </button>
                        </Link>
                      </div>
                    </div>
                    {art[1].artist_statement === "" ? (
                      <h4 className="expander__card-artist-statement">Artist statement for this artwork is not present in the the City of Vancouver database. </h4>
                      ) : (
                      <h4 className="expander__card-artist-statement">{this.replaceUnknownChar(art[1].artist_statement)}</h4>)}
                  </div>
                </div>
              )}
            </div>
          )} 
          <BottomNav />
        </div>
      </div>
    );
  }
}

export default Gallery;