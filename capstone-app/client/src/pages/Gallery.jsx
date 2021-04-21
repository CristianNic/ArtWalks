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
// import whiteHeart2 from '../assets/icons/heart-white-2px.svg';
import lightGray1Heart2 from '../assets/icons/heart-light-gray-1-2px.svg';
import lightGray1Heart2Filled from '../assets/icons/heart-light-gray-1-2px-filled.svg';
import iconMap from '../assets/icons-feather-1.5px/map.svg';

import { API_URL } from '../components/Utils/Utils';
import axios from "axios";

import data from '../data_temp/art_work_final_geom.json';
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
    artWorksData: artWorksData,
    userFavourites: [],
    userFavouritesByRegistryId: [],
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
    this.getUserId();
    this.getArtWorks();
    // this.getArtWorksData();
    this.getUserFavourites();
    this.reduceArrayIntoPairs(this.state.art_works);
  }

  getUserId = () => {
    const user_id = parseInt(localStorage.getItem('user_id', this.state.user_id));
    this.setState({ user_id: user_id })
  }

  getArtWorks() {
    axios
      .get(`${API_URL}/art_works`)
      .then((response) => {
        this.setState({art_works: response.data.art_works })
      })
      .catch((error) => {console.log('error:', error.response.data)})
  }

  // getArtWorksData() {
  //   this.setState({ArtWorksData: data.ArtWorksData })
  // }

  getUserFavourites() {
    axios
      .get(`${API_URL}/favourites/${this.state.user_id}`)
      .then((response) => {
        this.setState({
          userFavourites: response.data,
          userFavouritesByRegistryId: response.data.map((fave) => fave.art_works.registry_id)
        })
        console.log('USER FAVOURITES -->', this.state.userFavourites)
        // const faves = this.state.userFavourites;
        // console.log('USER Favourites -- in RENDER ---> ', faves)

        // const userArtWorkIdMaped = faves.map((fave => fave.art_work_id)) // User's Favourites have this ID
        // console.log('userArtWorkIdMaped ---> ', userArtWorkIdMaped)

        // console.log('Does this include 158?-->', userArtWorkIdMaped.includes(158))

        // const userRegistryId = faves.map((fave) => fave.art_works.registry_id);
        // console.log("userRegistryId ---> ", userRegistryId);
      })
      .catch((error) => {
      console.log('error:', error.response.data);
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
  
  // addToFavourites = (e, data) => {
  //   console.log('Liked state -->', this.state.liked)
  //   console.log('Add to Favourites --> ', data)
  //   console.log(e)
  //   this.setState(state => {
  //     return {
  //       display: !state.display,
  //     }
  //   })
  // }

  // // Quickly undos the expand function when clicked. This way both buttons are activate. 
  // // Click liked and the item id is registered and closes the expand that was opened.
  // removeFromFavourites = (e, data) => {
  //   console.log('Liked State -->', this.state.liked)
  //   console.log('Remove from Favourties --> ', data)
  //   console.log(e)
  //   this.setState(state => {
  //     return {
  //       display: !state.display,
  //     }
  //   })
  //   // this.setState({ removeFromFavouritesClicked: !this.removeFromFavouritesClicked })
  // }

  // -------------------
  // removeFromFavourites = (e, data) => {
  //   console.log('Liked State -->', this.state.liked)
  //   console.log('Remove from Favourties (clicked on red heart) --> ', data)
  //   console.log(e)
    
  //   // grab art_work_id, not registry_id --> // can only retreive registry_id
  //   // search all art_works for matching registry_id
    
  //   // search/filter userFavourites for art_work_id given a registry_id 

  //   const find = this.state.userFavourites.includes()

  //  //  userFavouritesByRegistryId: response.data.map((fave) => fave.art_works.registry_id)


     
  //   console.log('******   Find Test  *****  --> ', this.state.userFavourites)
  //   console.log('******   userFavouritesByRegistryId  *****  --> ', this.state.userFavouritesByRegistryId)
  //   console.log('******   Find Test  *****  --> ', find)
  //   // send art_work_id 

  //   // const newArray = this.state.userFavourites.filter(function (el) {
  //   //   return el.art_works.registry_id === 836;
  //   // });
    
  //   // if (art_works.registry_id === 836)
    
  //   // const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
  //   // const result = words.filter(word => word.length > 6);

  //   const test = this.state.userFavourites

  //   // works 
  //   // const filtered = test.filter((thing) => thing.art_work_id === 150)
  //   // console.log('ADQD@DQEDDQWDQW --->>> ', filtered)

  //   // const filtered = test.filter((thing) => thing.art_works.filter((thing2) => thing2.registry_id === 826))

  //   // console.log('ADQD@DQEDDQWDQW --->>> ', filtered)

  //   // const found = test.find(x => x.art_work_id === 150)

  //   // console.log('ADQD@DQEDDQWDQW --->>> ', found)

  //   const found2 = test.find(element => element.id === 2)
    
  //   console.log('ADQD@DQEDDQWDQW --->>> ', found2)
  
  
  //   const hello = {
  //     hello: 'world',
  //     foo: 'bar'
  //   };

  //   const qaz = {
  //     hello: 'stevie',
  //     foo: 'baz'
  //   }

  //   const myArray3 = [];
  //     myArray3.push(hello, qaz);
    
  //   console.log('ADQD@DQEDDQWDQW --->>> ', myArray3)

  //   const pos = myArray3.map(function (e) { return e.hello; }).indexOf('stevie');
    
  //   console.log('ADQD@DQEDDQWDQW --->>> ', pos)

  //   // const test = this.state.userFavourites.map(function (e) { return e.art_works.registry_id; }).indexOf(318); 

  //   console.log('TEST--->>> ', test)

  //   // now retreive the object with this index 

  //   // const alligatorFacts = ["thick scales", 80, "4 foot tail", "rounded snout", 80];
  //   // alligatorFacts.find((el, idx) => typeof el === "string" && idx === 2);

  //   const found = this.state.userFavourites.find(el => el === 0);

  //   console.log('ADQD@DQEDDQWDQW --->>> ', found)

  //   // userfavs.filter((item) => registry_id(from click) === item.art_works.registry_id}
  //   // const ok = this.state.userFavourites.filter((item) => { item.id === wanted.id })
      
  //   // console.log('ADQD@DQEDDQWDQW --->>> ', ok)

  //   const userfavs = this.state.userFavourites
    
  //   const test7 = userfavs.filter((item) => { return 816 === item.art_works.registry_id })
    
  //   const test8 = userfavs.filter((item) => { return 150 === item.art_works_id })
    
  //   console.log('ADQD@DQEDDQWDQW --->>> ', test8)

  //   console.log('UserFaves LATEST ONE --->>> ', userfavs)

  //   // for each item in this array 
  //   // check if the object has inside it a value of art_works.registry_id === registry_id 
  //   // if it does then return the object 
  //   // from the object extract the obj.art_work_id number 

  //   // userfavs.forEach(function (item, index) {

  //   //   if (item.art_works.registry_id === 826) {
  //   //     console.log('Happy =)', item)
  //   //   } else {
  //   //     console.log('Sad =(')
  //   //   }
  //   //  //  console.log(item.art_works, item.art_works.registry_id, index)
      
  //   // });
  //   this.state.userFavourites.forEach(function (item, index) {
  //     if (item.art_works.registry_id === data) {
  //       console.log('found art_work obj: ', item)
  //       console.log('Pass to axios.delete() --> art_work_id: ', item.art_work_id)
  //       const art_work_id = item.art_work_id
  //     }      
  //   });



  //   // axios
  //   //   .delete(`${API_URL}/favourites/${this.state.user_id}/remove/${data}`)
  //   //   .then((response) => {
  //   //   })
  //   //   .catch((error) => {
  //   //   console.log('error:', error.response.data);
  //   // })

  //   this.setState(state => {
  //     return {
  //       display: !state.display,
  //     }
  //   })
  //   // this.setState({ removeFromFavouritesClicked: !this.removeFromFavouritesClicked })
  // }
  // -------------------



  // removeFromFavourites = (e, data) => {
  //   console.log('Liked State -->', this.state.liked)
  //   console.log('Remove from Favourties (clicked on red heart) --> ', data)
  //   console.log(e)

  //   this.state.userFavourites.forEach(function (item, index) {
  //     // const art_work_id = 0
  //     if (item.art_works.registry_id === data) {
  //       // console.log('found art_work obj: ', item)
  //       console.log('Pass to axios.delete() --> art_work_id: ', item.art_work_id)
  //       // const art_work_id = item.art_work_id

  //       console.log('URL', `${API_URL}/favourites/remove/`)

  //       axios
  //         .delete(`${API_URL}/favourites/${this.state.user_id}/remove/${item.art_work_id}`)
  //         .then((response) => { })
  //         .catch((error) => { console.log('error:', error.response.data) })

  //       this.setState(state => {
  //         return {
  //           display: !state.display,
  //         }
  //       })
      

  //       // return art_work_id
  //     }
  //     // return art_work_id
  //     // console.log('OUTSIDE of IT', art_work_id)

  //   });

  //  // console.log('OUTSIDE of IT', cool)

  //   // axios
  //   //   .delete(`${API_URL}/favourites/${this.state.user_id}/remove/${data}`)
  //   //   .then((response) => {
  //   //   })
  //   //   .catch((error) => {
  //   //   console.log('error:', error.response.data);
  //   // })
  //   // this.setState(state => {
  //   //   return {
  //   //     display: !state.display,
  //   //   }
  //   // })
  //   // this.setState({ removeFromFavouritesClicked: !this.removeFromFavouritesClicked })
  // }


  // removeFromFavourites = (e, data) => {
  //   console.log('Liked State -->', this.state.liked)
  //   console.log('Remove from Favourties (clicked on red heart) --> ', data)

  //   this.state.userFavourites.forEach(function (item, index) {
  //     if (item.art_works.registry_id === data) {
  //       // console.log('found art_work obj: ', item)
  //       // console.log('Pass to axios.delete() --> art_work_id: ', item.art_work_id)
  //       // return item.art_work_id
  //       localStorage.setItem('art_work_id', item.art_work_id)
  //     }
  //   })

  //   const artWorkId = parseInt(localStorage.getItem('art_work_id'))
    
  //   axios
  //     .delete(`${API_URL}/favourites/${this.state.user_id}/remove/${artWorkId}`)
  //     .then((response) => {
  //       this.setState(state => {
  //         return {display: !state.display}
  //       })
  //     })
  //     .catch((error) => {
  //     console.log('error:', error.response.data);
  //     })
    
  //   //  window.location.reload()
  //   this.forceUpdate()
  //     this.setState(state => {
  //       return {display: !state.display}
  //     })
      
  //  //  this.forceUpdate()   // -- try his one 
  //   window.location.reload() 
  //   this.forceUpdate()
    
  // }


  removeFromFavourites = (e, data) => {
    this.state.userFavourites.forEach(function (item, index) {
      if (item.art_works.registry_id === data) {
        localStorage.setItem('art_work_id', item.art_work_id)
      }
    })

    const artWorkId = parseInt(localStorage.getItem('art_work_id'))
    
    axios
      .delete(`${API_URL}/favourites/${this.state.user_id}/remove/${artWorkId}`)
      .then((response) => {
        this.setState(state => {
          return {display: !state.display}
        })
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })

    this.forceUpdate()
  
    this.setState(state => {
      return {display: !state.display}
    })

     window.location.reload() 
    this.forceUpdate()

    localStorage.removeItem('art_work_id');
    this.forceUpdate()
  }



  addToFavourites = (e, data) => {
    // console.log('Liked state -->', this.state.liked)
    // console.log('Add to Favourites --> ', data)
    // console.log(e)

    this.setState(state => {
        return {display: !state.display}
    })

    this.state.art_works.forEach(function (item, index) {
      if (item.registry_id === data) {
        const position = index + 1 
        localStorage.setItem('art_work_id_for_user_post', position)
      }
    })

    const art_work_id_for_user_post = parseInt(localStorage.getItem('art_work_id_for_user_post'))


    // this.setState(state => {
    //     return {display: !state.display}
    // })
    
    console.log(`${API_URL}/favourites/${this.state.user_id}/${art_work_id_for_user_post}`)

    axios
      .post(`${API_URL}/favourites/${this.state.user_id}/${art_work_id_for_user_post}`)
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



  placeArtWorkOnMap = (e, data) => {
    console.log('Clicked placeArtWorkOnMap -->', data) // artWork registry_id
    this.setState(state => {
      return {
        mapLink: state.data,
      }
    });
    localStorage.setItem('currently viewing', data)
  }

  selectNeighbourhood = (location) => {
    // passed on Search bar as a prop
    console.log('Search --> location.target.value --> ', location.target.value) // name of neighbourhood
    // console.log('Search --> this.state.art_works --> ', this.state.art_works) // name of neighbourhood
    console.log('Select Neighbourhood - data --> ', data) // name of neighbourhood
      
    // if it's not Vancouver then do this: 

    if ('Vancouver' === location.target.value) {
      // this.setState({ art_works: this.state.artWorks }) // do nothing 
      this.setState({ artWorksData: data })
      // do nothing
    } else {
      // if it's anything else, then filter for that 
      // const data = this.state.art_works  
      const filteredData = data.filter(area =>
        area.neighbourhood === location.target.value);
    
      this.setState({ artWorksData: filteredData })

      console.log('Select Neighbourhood - filteredData --> ', filteredData)
    }
    this.forceUpdate()
  }
  

  render() {

    // Previous Logs 
    // console.log('from API -- this.state.artworks -->', this.state.art_works)
    // console.log('ArtWorks Temp Data -->', artWorksData);
    // console.log('ArtWorks Imported Obj -- grouped -->', this.reduceArrayIntoPairs(artWorksData));
    // const rows = this.reduceArrayIntoPairs(artWorksData)
    // console.log('Access Rows -->', rows[0][0])
    // console.log('Rows ==> ', rows)
    // console.log(`Hi, I'm the gallery for user --> `, this.state.user_id)
    

    // { favourites.inculudes(i) ? ( <div>True</div>) : ( <div>False</div> ) }

    // const array1 = [1, 2, 3];

    // console.log('Array 1 Test --> ', array1.includes(2));

    // const faves = this.state.userFavourites;
    // console.log('USER Favourites -- in RENDER ---> ', faves)

    // const userArtWorkIdMaped = faves.map((fave => fave.art_work_id)) // User's Favourites have this ID
    // console.log('userArtWorkIdMaped ---> ', userArtWorkIdMaped)

    // console.log('Does this include 158?-->', userArtWorkIdMaped.includes(158))

    // const userRegistryId = faves.map((fave) => fave.art_works.registry_id);
    // console.log("userRegistryId ---> ", userRegistryId);

    console.log(" ****** this.state.userFavouritesByRegistryId ---> ", this.state.userFavouritesByRegistryId);
    
    return (
      <div>
        {/* { favourites.inculudes(i) ? (<div>True</div>) : (<div>False</div>) } */}
        
        <Search
          selectNeighbourhood={this.selectNeighbourhood}
        />
        <div className="gallery">
          {/* ------------ Map ------------*/}
          {this.reduceArrayIntoPairs(this.state.artWorksData).map(art =>
            <div className="gallery__pairs-wrapper" key={art[0].registry_id}>
              {/* {console.log('rows ---> ', rows)}
              {console.log('ART ---> ', art)} */}
              <div className="gallery__imgs-buttons-container">
                {/* <button className="gallery__img-button" onClick={(e) => { this.expandArtWorkDetails(e, art[0].registry_id) }} > */}
                {/* // Moved onClick from button to img */}
                <button className="gallery__img-button" >
                  <div className="gallery__img-container">
                    <LazyLoad className="gallery__img-lazyload" offsetVertical={700} overflow={true} >
                      <img className="gallery__img-img" onClick={(e) => { this.expandArtWorkDetails(e, art[0].registry_id) }} src={art[0].photo_url_jpg} alt={art[0].title}></img>
                    </LazyLoad>
                    {/* {this.state.liked === true ? (
                      // <img className="gallery__like-icon" src={redHeart} alt="red heart icon, clicking removes from favourites"
                      //   onClick={(e) => { this.removeFromFavourites(e, art[0].registry_id) }}></img>
                      <img className="gallery__like-icon" src={redHeart} alt="red heart icon, clicking removes from favourites"
                        onClick={(e) => { this.removeFromFavourites(e, art[0].registry_id) }}></img>
                      ) : (
                      <img className="gallery__like-icon white-filter" src={lightGray1Heart2} alt="white heart icon, clicking adds to favourites"
                        onClick={(e) => { this.addToFavourites(e, art[0].registry_id)} }></img>
                    )} */}
                    
                    {/* {userRegistryId.includes(art[0].registry_id) === true ? ( */}
                    {this.state.userFavouritesByRegistryId.includes(art[0].registry_id) === true ? (


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
                {/* </button> */}
                <button className="gallery__img-button" onClick={(e) => { this.expandArtWorkDetails(e, art[1].registry_id) }} >
                {/* <button className="gallery__img-button" onClick={(e) => { this.expandArtWorkDetails(e, art[1].registry_id) }} > */}
                  <div className="gallery__img-container">
                    <LazyLoad className="gallery__img-lazyload" offsetVertical={700} overflow={true} >
                      <img className="gallery__img-img" src={art[1].photo_url_jpg} alt={art[1].title}></img>
                    </LazyLoad>    
                    {/* {this.state.liked === true ? ( */}
                    {this.state.userFavouritesByRegistryId.includes(art[1].registry_id) === true ? (
                      <img className="gallery__like-icon" onClick={(e) => { this.expandArtWorkDetails(e, art[1].registry_id) }} src={redHeart} alt="red heart icon"
                        onClick={(e) => { this.removeFromFavourites(e, art[1].registry_id) }}></img>
                      ) : (
                      <img className="gallery__like-icon white-filter" src={lightGray1Heart2Filled} alt="white heart icon, clicking adds to favourites"
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
