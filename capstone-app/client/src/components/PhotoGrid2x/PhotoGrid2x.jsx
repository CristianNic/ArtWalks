// https://picsum.photos/
// https://picsum.photos/v2/list  //30 // &limit=20
// import axios from 'axios';
import { Component } from "react";
import { Link } from 'react-router-dom'
import './PhotoGrid2x.scss'
import BottomNav from '../BottomNav/BottomNav';
import LazyLoad from 'react-lazy-load';
// import PhotoGridModal from '../PhotoGridModal/PhotoGridModal';
// import ArtWorks from '../ArtWorks/ArtWorks';     /// was version 2 
import Search from '../Search/Search';

// Max out grid - no margins or min 5px all around 
// check to see how the smallest images look,
// scroll to the bottom
// import img1 from '../../data_temp/images/bure.jpg';
// import img2 from '../../data_temp/images/platform.jpg';
// import img3 from '../../data_temp/images/law42.jpg';
// import img4 from '../../data_temp/images/L1.jpg';
// import img5 from '../../data_temp/images/pollard.jpg';
// import img6 from '../../data_temp/images/lion.jpg';
// import img7 from '../../data_temp/images/pink.jpg'; // faves
// import img8 from '../../data_temp/images/postcard.jpg';
// import img9 from '../../data_temp/images/snake.jpg';
// import img10 from '../../data_temp/images/lamp.jpg';
// import img11 from '../../data_temp/images/animals.jpg'
// import img12 from'../../data_temp/images/platform2.jpg'
// import img13 from'../../data_temp/images/blueLong.jpg'
// import img14 from'../../data_temp/images/L196.jpg'
// import img15 from'../../data_temp/images/oak.jpg'
// import img16 from'../../data_temp/images/bw.jpg'

import artWorksData from '../../data_temp/art_work'

import heartRed from '../../assets/icons/heart_red.svg';
import heartWhite from '../../assets/icons/heart_white.svg';
import iconMap from '../../assets/icons-feather-1.5px/map.svg';


// const img1 = "https://picsum.photos/id/237/650/400";
// const img2 = "https://picsum.photos/id/987/300/200";
// const img3 = "https://picsum.photos/id/217/624/455";
// const img4 = "https://picsum.photos/id/239/467/345";
// const img5 = "https://picsum.photos/id/78/567/540";
// const img6 = "https://picsum.photos/id/98/200/300";

// const apiUrl = 'http://localhost:8090/art_works'



class PhotoGrid2x extends Component {

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
    this.reduceArrayIntoPairs(artWorksData)
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
    // reduceArrayIntoPairs(artWorksData);

    return (
      <div className="myfirst">
        <Search />
        <div className="myfirst">
          {/* ------------ Map ------------*/}
          {rows.map(art =>
            <div className="wrapper">
              {/* {console.log('rows ---> ', rows)}
              {console.log('ART ---> ', art)} */}
              <div className="btn-wrapper">
                <button className="btn" onClick={(e) => { this.expandArtWorkDetails(e, art[0].registry_id) }} >
                  <div className="container">
                    <LazyLoad className="lazyload" offsetVertical={700} overflow={true} >
                      <img className="img" src={art[0].photo_url_jpg} alt={art[0].title}></img>
                    </LazyLoad>
                    {this.state.liked === true ? (
                      <img className="like" src={heartRed} alt="red heart icon"
                        onClick={(e) => { this.removeFromFavourites(e, art[0].registry_id) }}></img>
                      ) : (
                      <img className="like filter-white" src={heartWhite} alt="white heart icon"
                        onClick={(e) => { this.addToFavourites(e, art[0].registry_id)} }></img>
                    )}
                  </div>
                </button>
                <button className="btn" onClick={(e) => { this.expandArtWorkDetails(e, art[1].registry_id) }} >
                  <div className="container">
                    <LazyLoad className="lazyload" offsetVertical={700} overflow={true} >
                      <img className="img" src={art[1].photo_url_jpg} alt={art[1].title}></img>
                    </LazyLoad>    
                    {this.state.liked === true ? (
                      <img className="like" src={heartRed} alt="red heart icon"
                        onClick={(e) => { this.removeFromFavourites(e, art[1].registry_id) }}></img>
                      ) : (
                      <img className="like filter-white" src={heartWhite} alt="white heart icon"
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
                          <img className="filter-white" src={iconMap} alt="map icon"></img>
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
                      <Link to="/map">
                        <img className="filter-white" src={iconMap} alt="map icon"></img>
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

export default PhotoGrid2x;
