import React from "react";
import { Component } from 'react';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { useLeaflet } from "react-leaflet";
// import Control from 'react-leaflet-control';
// import { Icon } from "leaflet";
// import L from 'leaflet';
// import L, { map, Popup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import groupBy from "lodash"

//------------------ Pages -------------------------// 
import BottomNav from '../components/BottomNav/BottomNav';
// import Search from '../components/Search/Search';

//------------------ Map Tiles -----------------------//
import { URL_CUSTOM_OUTDOORS_DARKER } from '../components/Utils/MapboxToken';

//-------------- Ioncs converted for Leaflet ----------// 
import {
  fountain, gateway, memorial, mosaic, mural, siteIntergrated, statue,
  totem, defaultIconSkater, manWalkingRight
} from '../components/Utils/MapIcons';

//---------------- Icons --------------------------// 
import redHeart from '../assets/icons/heart_red.svg';
import blackHeart from '../assets/icons/heart-black-2px.svg';
import iconMaximize from '../assets/icons/maximize-2-1.5px.svg';
//----------------- Data -------------------//
import { neighbourhoods, API_URL } from '../components/Utils/Utils';


class ArtMap extends Component {

  state = {
    art_works: [],
    art_works_to_filter: [],
    userID: parseInt(localStorage.getItem('userID')),
    userCurrentLocation: [parseFloat(localStorage.getItem('userLat')), parseFloat(localStorage.getItem('userLon'))],
    userFavourites: [],
    userFavouritesByRegistryId: [],
    openPopUp: parseInt(localStorage.getItem("openPopUp")),
    // openPopUp: []
  }

  componentDidMount() {
    this.getArtWorks()
    this.getUserLocation()
    this.getUserFavourites()
    // this.getUrlId()
    // this.getOpenPopUp()
    // this.openPopUp()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):   <---- Double Check 
    // if (this.props.userFavourites !== prevProps.userFavourites) {
    //   this.fetchData(this.props.userFavourites);
    // }
    this.openPopUp()
  }

  componentWillUnmount() {
    // this.clearOpenPopUp()  // I removed this ?? 
  }

  // getOpenPopUp() {
  //   const openPopUp = parseInt(localStorage.getItem("openPopUp"))
  //   this.setState({
  //     art_work: openPopUp
  //   })
  //   document.querySelector(`img[alt = "marker-${openPopUp}"]`)?.click()
  // }

  openPopUp() {
    // const id = parseInt(localStorage.getItem('currently viewing'))  // Coming from Details Page 
    // Removed???
    // const id = this.state.openPopUp
    const id = parseInt(localStorage.getItem("openPopUp"))                                   // On Same page ...
    console.log("componentDidMount() --- Open Pop Up", id)
    document.querySelector(`img[alt = "marker-${id}"]`)?.click()
  }
  
  setOpenPopUp(data) {
    // Clicking on Marker makes the page remember which one it is so that when favourites is clicked, 
    // it refreshes shwoing the read heart and witch this one popup open. 
    console.log("Clicked PopUp - artWork.registry_id", data)
    localStorage.setItem("openPopUp", data);  // ??
    // localStorage.setItem("openPopUp", this.state.art_work.registry_id)
    // console.log("openPopUp - registry_id", this.state.art_work.registry_id)
  }
  
  clearOpenPopUp() {
    // if the user returns from a page without having selected an artwork,
    // map will now load without a selected artwork
    // localStorage.removeItem('currently viewing');
    localStorage.removeItem('openPopUp');
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        // console.log("User Lat:", position.coords.latitude, "Lon:", position.coords.longitude );
        // console.log("Current user Longitude is:", position.coords.longitude);
        localStorage.setItem('userLat', position.coords.latitude)
        localStorage.setItem('userLon', position.coords.longitude)
      })
    }
  }

  // -------- componentDidMount functions ------ //
  getArtWorks() {  // <--- rename to getArtWorks()
    // axios
    //   .get(`http://localhost:8090/art_works`)
    //   .then((response) => {
    //     this.setState({ art_works: response.data.art_works })
    //     console.log("AXIOS response.data.art_works", response.data.art_works )
    //   })
    //   .catch(function (error) { })
    
    // this.setState({ art_works: data });  // <<< Currently from JSON File 
    // console.log("JSON data", data)          // has only RegID# (no ID#)
    
    axios
      .get(`${API_URL}/art_works`)
      .then((response) => {
       // console.log("API Response", response.data.art_works)   // WHY THESE TWO DIFF DATA >>>??
        this.setState({
          art_works: response.data.art_works, // had id# & RegID#
          art_works_to_filter: response.data.art_works,
        })
      })
    //   .catch((error) => {console.log('error:', error.response.data)})
  }

  getUserFavourites() {
    // art_work_id is set by the MySQL database, while registry_id is from the City of Vancouver dataset (req. for matching artist info)
    // userFavourites sets all details on favourite art_works and userFavouritesByRegistryId extracts the matching registry_id's
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
        this.setState({
          userFavourites: result, // response.data
          userFavouritesByRegistryId: result.map((fave) => fave.art_works.registry_id) // response.data
        })
        console.log("API Response - Faves", result)
        // console.log("API Response - Faves - Render", this.userFavourites)
        console.log("API Response - Faves by Reg Id", result.map((fave) => fave.art_works.registry_id))
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })
  }
  
//------------ onClick functions ------------------// 
  selectNeighbourhood = (location) => {
    // passed on Search bar as a prop
    // console.log('Search --> location.target.value --> ', location.target.value) // name of neighbourhood
    console.log('Search --> this.state.art_works --> ', this.state.art_works) // name of neighbourhood
    
    // console.log('Select Neighbourhood - art_works --> ', this.state.art_works) // name of neighbourhood
    console.log('location.target.value --> ', location.target.value) // name of neighbourhood
      
    // if it's not Vancouver then do this: 

    if ('Vancouver' === location.target.value || '' === location.target.value) {
      this.setState({ art_works: this.state.art_works_to_filter })
      this.clearOpenPopUp()
      // or do nothing
    } else {
    // if it's anything else, then filter for that 
    // const data = this.state.art_works  
    const filteredData = this.state.art_works_to_filter.filter(area => 
      area.neighbourhood === location.target.value);
    
      this.setState({ art_works: filteredData })

      console.log('Select Neighbourhood - filteredData --> ', filteredData)
    }

    // console.log('Search --> filteredData --> ', filteredData)
      
    // const filteredData = this.state.filtered_art_works.filter( (area) => {
    //   return area.neighbourhood === event.target.value
    // })
    // if (filteredData.length > 0) {
    //   this.setState({filtered_art_works: filteredData})
    // }
    // else {
    //   this.setState({filtered_art_works: publicArtData})
    // } 

  }
  
  selectFavourties = () => {
    console.log('Hello, Nav-Bar Show Faves only')
    const userFavourites = this.state.userFavourites.map((faves) => faves.art_works   )
     console.log('this.state.userFavourites -->', userFavourites )
     console.log('this.state.art_works -->', this.state.art_works)
    // console.log('Select Favourites - data --> ', data)   // data being filtered 
    // console.log('Select Favourites - userFavouritesByRegistryId --> ', this.state.userFavouritesByRegistryId) // by registry_id

    // // return from all art_works (data) only those included in the userFavouritesByRegistryId array 
    // const selectFavourties = data.filter( i => this.state.userFavouritesByRegistryId.includes( i.registry_id ) );

    // console.log('Select Favourites - selectFavourties --> ', selectFavourties)

    this.setState({ art_works: userFavourites })
  }
  
  removeFromFavourites = (e, registry_id) => {
    // console.log('REMOVE from Favourites - registry_id  --> ', registry_id)
    // console.log("User Favourites API --> ", this.state.userFavourites)

    const filteredData = this.state.userFavourites.filter(item =>
      item.art_works.registry_id === registry_id);
    
    // console.log("Filtered Data -->", filteredData)

    const art_work_id = filteredData[0].art_work_id
    
    // console.log("Art_work_ID -->", art_work_id)
    console.log("Registry_ID -->", registry_id)

    // Get Variable from local storage
    // const openPopUp =
    // localStorage.setItem("openPopUp", art_work_id);
    /////////  localStorage.setItem("openPopUp", registry_id);  // not needed // setOpenPopUp() does it 
      
    //  penPopUp = parseInt(localStorage.getItem("currently viewing"));

    // if ('Vancouver' === location.target.value || '' === location.target.value) {
    //   this.setState({ userFavourites: this.state.userFavouritesToFilter })
    // } else {
    //   this.setState({ userFavourites: filteredData })
    // };

    axios
      // .delete(`${API_URL}/favourites/${this.state.userID}/remove/${registry_id}`)
      .delete(`${API_URL}/favourites/${this.state.userID}/remove/${art_work_id}`)
      .then((response) => {
        this.getUserFavourites()
        document.querySelector(`img[alt = "marker-${registry_id}"]`)?.click()
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })
    // console.log("Faves after removal --> ", this.state.userFavourites)
    
    // remove art-work from the state obj - by filtering it out and removing it or by recalling 
    // window.location.reload()

    // this.getUserFavourites()
  
    // console.log("Faves after removal afger getUserFaves --> ", this.state.userFavourites)
    // console.log('removeFaves - left over by Rq ID -->', this.state.userFavouritesByRegistryId)

    // localStorage.removeItem('art_work_id');
    // this.forceUpdate()

    // this.getUserFavourites()  // update userFavourites in state 

  }
  
  // const afterRemovingArtWork = this.state.art_works.filter( i => this.state.userFavouritesByRegistryId.includes( !i.registry_id ))
    // this.setState(state => {
    //   return {display: !state.display}
    // })
    

    // this.state.userFavourites.forEach(function (item, index) {
    //   if (item.art_works.registry_id === data) {
    //     localStorage.setItem('art_work_id', item.art_work_id)
    //   }
    // })

    // const artWorkId = parseInt(localStorage.getItem('art_work_id'))
  
    // // Send remove 
    // axios
    //   .delete(`${API_URL}/favourites/${this.state.userID}/remove/${artWorkId}`)
    //   .then((response) => {
    //     this.setState(state => {
    //       return {display: !state.display}
    //     })
    //   })
    //   .catch((error) => {
    //   console.log('error:', error.response.data);
    //   })

    // this.getUserFavourites()

    // this.forceUpdate()
  
    // this.setState(state => {
    //   return {display: !state.display}
    // })

    //  window.location.reload() 
    // this.forceUpdate()

  //   localStorage.removeItem('art_work_id');
  //   // this.forceUpdate()
  // }

  // addToFavourites 
  // if (reg id already in user favourites ) {  // no need? b/c site already only displays faves, red hearts
  //   then do noting 
  // } else {
  //   send axios call and add
  // }
  
  addToFavourites = (e, registry_id) => {

    // console.log('ADD to Favourites -- registry.id --> ', registry_id)
    // console.log('Pre-Add - User Favourites --> ', this.state.userFavourites)
    console.log('Art Works this.state.art_works --> ', this.state.art_works)
    // console.log("EVENT e ", e)
    // console.log('this.state.userFavouritesByRegistryId -->', this.state.userFavouritesByRegistryId)
    // this.state.art_works.forEach(function (item, index) {               // get art_work_id (used in MySQL) given registry_id
    //   if (item.registry_id === registry_id) {
    //     const position = index + 1 
    //     localStorage.setItem('art_work_id_for_user_post', position)
    //     console.log("What is this position? - i.e. art_work_id_for_user_post", position)
    //   }
    // })
    // const art_work_id_for_user_post = parseInt(localStorage.getItem('art_work_id_for_user_post'))

    const filteredData = this.state.art_works.filter(item =>
      item.registry_id === registry_id);
    const art_work_id = filteredData[0].id
    // console.log("art_work_id ", art_work_id)

    console.log("Registry ID set in storage -->", registry_id)
    // localStorage.setItem("openPopUp", registry_id) // no needed setOpenPopUP() does it 

    // console.log(`Send to API -->${API_URL}/favourites/${this.state.userID}/${art_work_id_for_user_post}`)
    axios
      // .post(`${API_URL}/favourites/${this.state.userID}/${art_work_id_for_user_post}`)
      .post(`${API_URL}/favourites/${this.state.userID}/${art_work_id}`)
      .then((response) => {
        // localStorage.setItem("openPopUp", registry_id)
        this.getUserFavourites()
        document.querySelector(`img[alt = "marker-${registry_id}"]`)?.click()
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })
    
    console.log("Clicked Save - OpenPopUp in SetStorage --> ", parseInt(localStorage.getItem("openPopUp")))
    
    // this.getUserFavourites()   // only shows up next round!  // update userFavourites in state
    // instead/or also - add this item reg id to userFaveState used to render - it'll over written with API call after 


    // this.openPopUp()
    // document.querySelector(`img[alt = "marker-${registry_id}"]`)?.click()

    console.log('Post-Add - User Favourites --> ', this.state.userFavourites)


    ////// 
    
    // localStorage.setItem("flip", 0)




    // localStorage.removeItem('art_work_id_for_user_post') // neede? 
    // this.setState({
    //     openPopUp: localStorage.setItem("openPopUp", registry_id) // force refresh 
    //   })
    
    // localStorage.setItem("openPopUp", registry_id)  // set to local storage before or after page is reloaed? i.e. after getUserFaves
    // this.openPopUp()
    //window.location.reload();

    // localStorage.removeItem('art_work_id_for_user_post');

    // console.log('this.state.userFavouritesByRegistryId -->', this.state.userFavouritesByRegistryId)
   
    // Get Gray heart Click ... 
    // const grayHeart = document.getElementById('grayHeart');
    //   grayHeart.addEventListener('click', () => { 
    //     document.getElementById("pv-contact-info").innerText; 
    // });
  }

  visitDetailsPage = (e, registry_id) => {
    this.props.history.push(`/details/${registry_id}`)
    // localStorage.setItem("openPopUp", this.state.art_work.id)
    localStorage.setItem("openPopUp", this.state.openPopUp)
  }

  render() {

    // console.log("OpenPopUp in SetStorage - Coming back from Details --> ", parseInt(localStorage.getItem("openPopUp")))
    // console.log("... --> ", this.state.openPopUp)
    // console.log("art --> ", this.state.art_works)
    // console.log('RENDER() - User Favourites --> ', this.state.userFavourites)
    // console.log(this.state.art_works)
    
    return (
      <section>

        {/* <Search></Search> */}
        <section className="navbar">
          <section className="navbar__container" >
            <select className="navbar__select" onChange={this.selectNeighbourhood} name="neighbourhood" id="neighbourhood-select">
              <option value="">Neighbourhood</option>
                <option value="Vancouver">All of Vancouver</option>
                {neighbourhoods.map((area, i) =>
                <option value={area} key={i}>{area}</option>
                )}
              </select>
            <div className="navbar__btn">
              <img className="navbar__icon" onClick={this.selectFavourties} src={redHeart} alt="favourites"/>
            </div>
          </section>
        </section>

        <MapContainer center={[49.2780, -123.1153]} zoom={12}>
            {/* <TileLayer    
              // Use OpenStreetMap tiles if Mapbox account was not created. See utils/MapboxToken-Sample.js
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            /> */}
            <TileLayer
              url={`${URL_CUSTOM_OUTDOORS_DARKER}`}
              attribution="© <a href='http://osm.org/copyright'>OpenStreetMap</a> <a href='https://www.mapbox.com/about/maps/'>Mapbox</a>"
            />
          <Marker
            position={[
              this.state.userCurrentLocation[0],
              this.state.userCurrentLocation[1]
            ]}
            icon={manWalkingRight}>
            <Popup>
              <h2>Current User Location</h2>
              <h2>{this.state.userCurrentLocation}</h2>
            </Popup>
          </Marker>
            {/* // ------ Display Markers by Neighbourhood ------ //  */}
              {this.state.art_works.map(artWork => (
                <Marker
                  position={[
                    artWork.lon,
                    artWork.lat
                  ]}
                  id={`marker-${artWork.registry_id}`}
                  className={`marker-${artWork.registry_id}`}
                  // onClick={(e) => { console.log('marker clicked') } }
                  // onClick={this.test()}
                  // onClick={ e => console.log('Hello')}

                  icon={ artWork.type === 'Fountain'                ? fountain    
                       : artWork.type === 'Gateway'                 ? gateway     
                       : artWork.type === 'Memorial_or_monument'    ? memorial     
                       : artWork.type === 'Memorial_or_Monument'    ? memorial     
                       : artWork.type === 'Totem_pole'              ? totem      
                       : artWork.type === 'Site_integrated_work'    ? siteIntergrated
                       : artWork.type === 'Mural'                   ? mural
                       : artWork.type === '2D'                      ? mural        
                       : artWork.type === 'Two_dimensional_artwork' ? mural        
                       : artWork.type === 'Mosaic'                  ? mosaic
                       : artWork.type === 'Relief'                  ? mosaic
                       : artWork.type === 'Media_work'              ? mosaic
                       : artWork.type === 'Sculpture'               ? statue
                       : artWork.type === 'Figurative'              ? statue
                                                                    : defaultIconSkater}

                  alt={`marker-${artWork.registry_id}`}
                  eventHandlers={{
                    click: () => {
                      // console.log('Marker clicked', `${artWork.registry_id}`);
                      // localStorage.setItem("openPopUp", artWork.registry_id)
                      this.setOpenPopUp(artWork.registry_id);
                    }
                  }}
                >
                  <Popup id={`popup-${artWork.registry_id}`}>
                  {/* <Popup id={`popup-${artWork.registry_id}`} onClick={ e => console.log('Hello')} onClick={(e) => { console.log('marker clicked') } }> */}
                    <div className="popup">
                      <img className="popup__img" src={artWork.photo_url_jpg} alt={artWork.title} />
                      <div className="popup__inside">
                        <div>
                          <h1 className="popup__title"
                            onClick={(e) => {this.addToFavourites(e, artWork.registry_id)}}>{artWork.title}</h1>
                          {artWork.artists_names === "" ?
                            (<h2 className="popup__artist">artist(s) currently unavailable</h2>)
                          : (<h2 className="popup__artist">by {artWork.artists_names}</h2>)}


                          <h2>Registry-ID {artWork.registry_id}</h2>
                          <h2>ID {artWork.id}</h2>
                          {/* { artWork.artists_names === "" ? (<h2 className="popup__artist">Not available</h2>)
                          : artWork.artists_names === "" ?? (<h2 className="popup__artist">{artWork.artists_names}</h2>)} */}
                          {artWork.type === "" ? (<div></div>)
                          : artWork.type === "Memorial_or_Monument" ?     (<h2>Memorial or Monument</h2>)
                          : artWork.type === "Two_dimensional_artwork" ?  (<h2>2D Artwork</h2>)
                          : artWork.type === "Welcome_figure" ?           (<h2>Welcome figure</h2>)
                          : artWork.type === "Totem_pole" ?               (<h2>Totem Pole</h2>)
                          : artWork.type === "Site_integrated_work" ?     (<h2>Site integrated work</h2>)
                          :                                               (<h2>{artWork.type}</h2>)}
                        </div>
                        <div className="popup__icon-container">
                          {this.state.userFavouritesByRegistryId.includes(artWork.registry_id) === true ? (
                            // || this.state.flip === 1 ? (
                            <img className="popup__icon" src={redHeart} alt="red heart, remove saved"
                              onClick={(e) => {this.removeFromFavourites(e, artWork.registry_id)}}></img>
                          ) : (
                            <img className="popup__icon" src={blackHeart} alt="black heart, add to saved"
                              onClick={(e) => {this.addToFavourites(e, artWork.registry_id)}}></img>
                          )}
                            <img className="popup__icon" src={iconMaximize} alt="maximize icon, visit details page"
                              onClick={(e) => {this.visitDetailsPage(e, artWork.registry_id)}}></img>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        <BottomNav />
      </section>
    );
  }
}

export default ArtMap;