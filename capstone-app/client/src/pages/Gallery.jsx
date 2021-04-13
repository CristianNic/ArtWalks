import { Component } from "react";
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazy-load';
//import './Gallery.scss'
import BottomNav from '../components/BottomNav/BottomNav';
import Search from '../components/Search/Search';

//import heartWhite from '../assets/icons/heart_white.svg';
//import whiteHeart3 from '../assets/icons/heart-white-3px.svg';
//import whiteHeart25 from '../assets/icons/heart-white-2.5px.svg';
//import whiteHeart15 from '../assets/icons/heart-white-1.5px.svg';
import redHeart from '../assets/icons/heart_red.svg';
import whiteHeart2 from '../assets/icons/heart-white-2px.svg';
import lightGray1Heart2 from '../assets/icons/heart-light-gray-1-2px.svg';
import iconMap from '../assets/icons-feather-1.5px/map.svg';

import { API_URL } from '../components/utils';
import axios from "axios";


import artWorksData from '../data_temp/art_work'
// const apiUrl = 'http://localhost:8090/art_works'

class Gallery extends Component {

  // state = {
  //   art_works: [],
  // }
  // componentDidMount() {
  //   this.getArtWorks(); 
  // }

  // getArtWorks() {
  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       this.setState({
  //         art_works: response.data.art_works,
  //       })
  //     })
  //     .catch(function(error) {
  //     })
  // }
  // const [showResults, setShowResults] = useState(false);
  // const onClick = () => setShowResults(true)

  state = {
    user_id: 2,
    art_works: [],
    userFavourites: [],
    display: false,
    expand: 0,
    liked: false,
    mapLink: 0, // art[0].registry_id
    // current_art_work: this.state.registry_id,
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
    this.getArtWorks();
    this.getUserFavourites();
    this.reduceArrayIntoPairs(this.state.art_works);
    // localStorage.getItem('user_id', this.state.user_id);
    this.getUserId();
  }

  getUserId = () => {
    const user_id = parseInt(localStorage.getItem('user_id', this.state.user_id));
    this.setState({ user_id: user_id })
  }

  getArtWorks() {
    axios
      .get(`${API_URL}/art_works`)
      .then((response) => {
        this.setState({
          art_works: response.data.art_works,
        })
      })
      .catch((error) => {
      // console.log('error:', error.response.data);
    })
  }

  getUserFavourites() {
    axios
      .get(`${API_URL}/`)
      .then((response) => {
        this.setState({
          userFavourites: response.data.art_works,
        })
      })
      .catch((error) => {
      // console.log('error:', error.response.data);
    })
  }

  reduceArrayIntoPairs = (artWorksData) => {
    const rows = artWorksData.reduce(function (rows, key, index) {
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
  };
  
  addToFavourites = (e, data) => {
    console.log('Liked state -->', this.state.liked)
    console.log('Add to Favourites --> ', data)
    console.log(e)
    this.setState(state => {
      return {
        display: !state.display,
      }
    })
  }

  // Quickly undos the expand function when clicked. This way both buttons are activate. 
  // Click liked and the item id is registered and closes the expand that was opened.
  removeFromFavourites = (e, data) => {
    console.log('Liked State -->', this.state.liked)
    console.log('Remove from Favourties --> ', data)
    console.log(e)
    this.setState(state => {
      return {
        display: !state.display,
      }
    })
    // this.setState({ removeFromFavouritesClicked: !this.removeFromFavouritesClicked })
  }

  placeArtWorkOnMap = (e, data) => {
    console.log('Clicked placeArtWorkOnMap -->', data) // artWork registry_id
    this.setState(state => {
      return {
        mapLink: state.data,
      }
    });
  }


  render() {
    // console.log('ArtWorks Imported Obj -->', artWorksData);
    // console.log('ArtWorks Imported Obj -- grouped -->', this.reduceArrayIntoPairs(artWorksData));
    const rows = this.reduceArrayIntoPairs(artWorksData)
    // console.log('Access Rows -->', rows[0][0])
    console.log('Rows ==> ', rows)

    console.log(`Hi, I'm the gallery for user --> `, this.state.user_id)

    return (
      <div>
        <Search />
        <div className="gallery">
          {/* ------------ Map ------------*/}
          {rows.map(art =>
            <div className="gallery__pairs-wrapper" key={art[0].registry_id}>
              {/* {console.log('rows ---> ', rows)}
              {console.log('ART ---> ', art)} */}
              <div className="gallery__imgs-buttons-container">
                <button className="gallery__img-button" onClick={(e) => { this.expandArtWorkDetails(e, art[0].registry_id) }} >
                  <div className="gallery__img-container">
                    <LazyLoad className="gallery__img-lazyload" offsetVertical={700} overflow={true} >
                      <img className="gallery__img-img" src={art[0].photo_url_jpg} alt={art[0].title}></img>
                    </LazyLoad>
                    {this.state.liked === true ? (
                      // <img className="gallery__like-icon" src={redHeart} alt="red heart icon, clicking removes from favourites"
                      //   onClick={(e) => { this.removeFromFavourites(e, art[0].registry_id) }}></img>
                      <img className="gallery__like-icon" src={redHeart} alt="red heart icon, clicking removes from favourites"
                        onClick={(e) => { this.removeFromFavourites(e, art[0].registry_id) }}></img>
                      ) : (
                      <img className="gallery__like-icon white-filter" src={lightGray1Heart2} alt="white heart icon, clicking adds to favourites"
                        onClick={(e) => { this.addToFavourites(e, art[0].registry_id)} }></img>
                    )}
                  </div>
                </button>
                <button className="gallery__img-button" onClick={(e) => { this.expandArtWorkDetails(e, art[1].registry_id) }} >
                  <div className="gallery__img-container">
                    <LazyLoad className="gallery__img-lazyload" offsetVertical={700} overflow={true} >
                      <img className="gallery__img-img" src={art[1].photo_url_jpg} alt={art[1].title}></img>
                    </LazyLoad>    
                    {this.state.liked === true ? (
                      <img className="gallery__like-icon" src={redHeart} alt="red heart icon"
                        onClick={(e) => { this.removeFromFavourites(e, art[1].registry_id) }}></img>
                      ) : (
                      <img className="gallery__like-icon white-filter" src={lightGray1Heart2} alt="white heart icon"
                        onClick={(e) => { this.addToFavourites(e, art[1].registry_id)} }></img>
                    )}
                  </div>
                </button>
              </div>
              {this.state.display && this.state.expand === art[0].registry_id && (
                <div className="expander">
                  <div className="arrow-down">
                    <ul className="ul">
                      <h1>{art[0].title}</h1>
                      <h2>{art[0].artists_names}</h2>
                      <Link to={`/map/${art[0].registry_id}`}>
                        <button onClick={(e) => {this.placeArtWorkOnMap(e, art[0].registry_id)}}>
                          <img className="white-filter" src={iconMap} alt="map icon"></img>
                        </button>
                      </Link>
                      <h3>{art[0].neighbourhood}</h3>
                      <h3>{art[0].type}</h3>
                      <h4>{art[0].artist_statement}</h4>
                      <p>Statement Statement Statement Statement Statement Statement</p>
                    </ul>
                  </div>
                </div>
              )}
              {this.state.display && this.state.expand === art[1].registry_id && (
                <div className="expander">
                  <div className="arrow-down">
                    <ul>
                      <h1>{art[1].title}</h1>
                      <h2>{art[1].artists_names}</h2>
                      <Link to={`/map/${art[0].registry_id}`}>
                        <button onClick={(e) => {this.placeArtWorkOnMap(e, art[1].registry_id)}}>
                          <img className="white-filter" src={iconMap} alt="map icon"></img>
                        </button>
                      </Link>
                      <h3>{art[1].neighbourhood}</h3>
                      <h3>{art[1].type}</h3>
                      <h4>{art[1].artist_statement}</h4>
                      <p>Statement Statement Statement Statement Statement Statement</p>
                    </ul>
                  </div>
                </div>)}
            </div>
          )} 
          <BottomNav />
        </div>
      </div>
    );
  }
}

export default Gallery;
