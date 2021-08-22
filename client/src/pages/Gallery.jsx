import { Component } from "react";
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazy-load';
import axios from "axios";

import BottomNav from '../components/BottomNav/BottomNav';
import Search from '../components/Search/Search';

import redHeart from '../assets/icons/heart_red.svg';
import lightGray1Heart2Filled from '../assets/icons/heart-light-gray-1-2px-filled.svg';
import iconMap from '../assets/icons-feather-1.5px/map.svg';
import iconMaximize from '../assets/icons/maximize-2-1.5px.svg'

import { API_URL } from '../components/Utils/Utils';
// import data from '../data_temp/art_work_final_geom.json';  
// import artWorksData from '../data_temp/art_work'
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
    user_id: parseInt(localStorage.getItem('user_id')),
    art_works: [],                // API
    art_works_to_filter: [],      // API
    // artWorksData: artWorksData,   // JS 
    userFavourites: [],
    userFavouritesByRegistryId: [],
    display: false,
    expand: 0,
    liked: false,
    mapLink: 0, // art[0].registry_id
    id: 1,
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

    // console.log("Gallery: user_id ---> ", this.state.user_id);
    // console.log("User", this.state.user_id, "Faves --> ", this.state.userFavourites);
    // console.log("User", this.state.user_id, "Faves by Reg.ID --> ", this.state.userFavouritesByRegistryId);
   }

  componentDidUpdate() {
    // console.log("Gallery: user_id ---> ", this.state.user_id);
    // console.log("User", this.state.user_id, "Faves --> ", this.state.userFavourites);
    // console.log("User", this.state.user_id, "Faves by Reg.ID --> ", this.state.userFavouritesByRegistryId);

    console.log("API --> ", this.state.art_works_to_filter);
    console.log("JS --> ", this.state.artWorksData);        
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
          art_works_to_filter: response.data.art_works,
        })
      })
      .catch((error) => {console.log('error:', error.response.data)})
  }

  // getUserFavourites() {   // Gallery.jsx
  //   axios
  //     .get(`${API_URL}/favourites/${this.state.user_id}`)
  //     .then((response) => {
  //       this.setState({
  //         userFavourites: response.data,
  //         userFavouritesByRegistryId: response.data.map((fave) => fave.art_works.registry_id)
  //       })
  //       // console.log('USER FAVOURITES -->', this.state.userFavourites)
  //       // const faves = this.state.userFavourites;
  //       // console.log('USER Favourites -- in RENDER ---> ', faves)

  //       // const userArtWorkIdMaped = faves.map((fave => fave.art_work_id)) // User's Favourites have this ID
  //       // console.log('userArtWorkIdMaped ---> ', userArtWorkIdMaped)

  //       // console.log('Does this include 158?-->', userArtWorkIdMaped.includes(158))

  //       // const userRegistryId = faves.map((fave) => fave.art_works.registry_id);
  //       // console.log("userRegistryId ---> ", userRegistryId);
  //     })
  //     .catch((error) => {
  //     console.log('error:', error.response.data);
  //   })
  // }

  getUserFavourites() {   // Saved.jsx
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
  
  
  // // artWorksData is from the JS file 
  // reduceArrayIntoPairs = (artWorksData) => {
  //   const rows = artWorksData.reduce(function (rows, key, index) {
  //     return (
  //       (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
  //       rows
  //     );
  //   }, []);
  //   //console.log(rows);
  //   return rows; // <--- map rows
  // }

  reduceArrayIntoPairs = () => {
    const rows = this.state.art_works_to_filter.reduce(function (rows, key, index) {
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

  placeArtWorkOnMap = (e, data) => {
    console.log('Clicked placeArtWorkOnMap -->', data) // artWork registry_id
    this.setState(state => {
      return {
        mapLink: state.data,
      }
    });
    localStorage.setItem('currently viewing', data)
  }

  //---- Search Bar ----//
  selectNeighbourhood = (location) => {
    // console.log('Search Term (location.target.value) --> ', location.target.value) 
    // console.log('data from JSON (for neighbourhood) --> ', data)                      // 366 entries <-- likely so each area has even numbered art works
    // console.log('data from JS (for neighbourhood) --> ', artWorksData)                // 376 entries 
    // console.log('data from API --> this.state.art_works --> ', this.state.art_works)  // 376 entries 

    if ('Vancouver' === location.target.value || '' === location.target.value ) {
      // this.setState({ art_works: this.state.artWorks }) // do nothing 
      // this.setState({ artWorksData: data })  // artWorksData: artWorksData works too 
      // this.setState({ art_works: this.state.art_works })  // artWorksData: artWorksData works too 
      this.setState({ art_works: this.state.art_works_to_filter })  // artWorksData: artWorksData works too 
      // do nothing // remove statement
    } else {
      // if it's anything else, then filter for that 
      // const data = this.state.art_works  

      // filter data from JSON - JSON has even numbered entries 
      // const filteredData = data.filter(area =>
      //   area.neighbourhood === location.target.value);
      // this.setState({ artWorksData: filteredData })

      // filter data from API
      const filteredData = this.state.art_works_to_filter.filter(area =>
        area.neighbourhood === location.target.value);
        if (filteredData.length % 2 === 0) {
          // console.log("It's even")
        } else {
          // console.log("It was odd")
          filteredData.pop(); // remove the last element
        };
      this.setState({ art_works: filteredData })

      // console.log('filteredData.length', filteredData.length)
      // console.log('Select Neighbourhood - filteredData --> ', filteredData)
    }
    this.forceUpdate()
  }

  sortBySaved = () => {
    console.log("Clicked Sort by Saved - Now sort by saved")
    // -- User Favourites - Reg # - pick those out from all art_works -- // 

    console.log("Faves to look at -->", this.state.userFavourites)
    console.log("How does this compare-->", this.state.art_works_to_filter)
    
    const userFavouritesByRegistryId = this.state.userFavourites.map((fave) => fave.art_works.registry_id)
    
    console.log("by Reg.ID?", userFavouritesByRegistryId)

    // const filteredData = this.state.art_works_to_filter.filter(saved =>
    //  saved.registry_id === .... the registry_id's from the the faves 
    //
    // )

    // filteredData 
    // this.setState({ art_works: filteredData })
    // this.forceUpdate()
  }

  // Previous Logs 
  // console.log('from API -- this.state.artworks -->', this.state.art_works)
  // console.log('ArtWorks Temp Data -->', artWorksData);
  // console.log('ArtWorks Imported Obj -- grouped -->', this.reduceArrayIntoPairs(artWorksData));
  // const rows = this.reduceArrayIntoPairs(artWorksData)
  // console.log('Access Rows -->', rows[0][0])
  // console.log('Rows ==> ', rows)
  // console.log(`Hi, I'm the gallery for user --> `, this.state.user_id)
  // console.log('Array 1 Test --> ', array1.includes(2));
  // const faves = this.state.userFavourites;
  // console.log('USER Favourites -- in RENDER ---> ', faves)
  // const userArtWorkIdMaped = faves.map((fave => fave.art_work_id)) // User's Favourites have this ID
  // console.log('userArtWorkIdMaped ---> ', userArtWorkIdMaped)

  // console.log('Does this include 158?-->', userArtWorkIdMaped.includes(158))

  // const userRegistryId = faves.map((fave) => fave.art_works.registry_id);
  // console.log("userRegistryId ---> ", userRegistryId);
  // console.log(" ****** this.state.userFavouritesByRegistryId ---> ", this.state.userFavouritesByRegistryId);

  render() {

    // console.log("art_works: [] API ---> ", this.state.art_works);   // HAS .ID - Look the same, 376 entires 0: {}, 1:{}
    // console.log("artWorksData: [] JS ---> ", this.state.artWorksData); // NO ID 
    // console.log("User ---> ", this.state.user_id);

    return (
      <div>
        {/* { favourites.inculudes(i) ? (<div>True</div>) : (<div>False</div>) } */}
        <Search
          selectNeighbourhood={this.selectNeighbourhood}
          sortBySaved={this.sortBySaved}
        />
        <div className="gallery">
          {/* ------------ Map ------------*/}
          {/* atWorksData comes from JS */}
          {/* {this.reduceArrayIntoPairs(this.state.artWorksData).map(art => */}
          
          {/* art_works from API */}
          {this.reduceArrayIntoPairs(this.state.art_works).map(art =>
            <div className="gallery__pairs-wrapper" key={art[0].registry_id}>

              <div className="gallery__img-buttons-container">
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
                      <img className="gallery__like-icon" src={lightGray1Heart2Filled} alt="white heart icon, clicking adds to favourites"
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
                      // <img className="gallery__like-icon" onClick={(e) => { this.expandArtWorkDetails(e, art[1].registry_id) }} src={redHeart} alt="red heart icon"
                      //   onClick={(e) => { this.removeFromFavourites(e, art[1].registry_id) }}></img>
                      <img className="gallery__like-icon" src={redHeart} alt="red heart icon, clicking removes from favourites"
                        onClick={(e) => {
                          this.expandArtWorkDetails(e, art[1].registry_id);
                          this.removeFromFavourites(e, art[1].registry_id);
                        }}></img>
                      ) : (
                      <img className="gallery__like-icon" src={lightGray1Heart2Filled} alt="white heart icon, clicking adds to favourites"
                        onClick={(e) => { this.addToFavourites(e, art[1].registry_id)} }></img>
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
                          <button className="button" onClick={(e) => {this.placeArtWorkOnMap(e, art[0].registry_id)}}>
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
                    {art[1].artist_statement === "" ? (<h4 className="expander__card-artist-statement">Artist statement for this artwork is not present in the the City of Vancouver database. </h4>) :
                      <h4 className="expander__card-artist-statement">{art[1].artist_statement}</h4>}
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
                          <button className="button" onClick={(e) => {this.placeArtWorkOnMap(e, art[1].registry_id)}}>
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
                    {art[1].artist_statement === "" ? (<h4 className="expander__card-artist-statement">Artist statement for this artwork is not present in the the City of Vancouver database. </h4>) :
                      <h4 className="expander__card-artist-statement">{art[1].artist_statement}</h4>}
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







