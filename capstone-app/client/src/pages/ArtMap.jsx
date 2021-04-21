import React, { useState } from "react";
import { Component } from 'react';
import axios from 'axios';
import {
  MapContainer, Marker, Popup, TileLayer,
  LayersControl, LayerGroup, Polyline, Polygon, GeoJSON
} from "react-leaflet";
// import Control from 'react-leaflet-control';
import { Icon } from "leaflet";
import L from 'leaflet';
// import L, { map, Popup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import groupBy from "lodash"

//------------------ Pages -------------------------// 
import BottomNav from '../components/BottomNav/BottomNav';
import Search from '../components/Search/Search';

//------------------ Map Tiles -----------------------//
import { URL_CUSTOM_OUTDOORS_DARKER } from '../components/Utils/MapboxToken';


//-------------- Ioncs converted for Leaflet ----------// 
import {
  fountain, gateway, memorial, mosaic, mural, siteIntergrated, statue,
  totem, defaultIconSkater, blackGithub, redGithub
} from '../components/Utils/MapIcons';


//---------------- Icons ------------------// 
import redHeart from '../assets/icons/heart_red.svg';
import blackHeart from '../assets/icons/heart-black-2px.svg';
import lightGray1Heart2 from '../assets/icons/heart-light-gray-1-2px.svg';
import lightGray1Heart2Filled from '../assets/icons/heart-light-gray-1-2px-filled.svg';
import iconMaximize from '../assets/icons/maximize-2-1.5px.svg';

import redGithubicon from '../assets/icons/github-red-2px.svg';
import blackGithubicon from '../assets/icons/github-black-2px.svg';
import { FiHome, FiChevronRight, FiSearch, FiSettings } from "react-icons/fi";
import skateboarding from '../assets/icons/skateboarding.svg';
// import redGithubicon from '../assets/icons/skateboarding.svg';

//------------- Art Work Icons - Nav Bar--------------//
// import Fountain from '../assets/art-works/fountain.svg';
// import Gateway from '../assets/art-works/gateway.svg';
// import Memorial from '../assets/art-works/memorial.svg';
// import Mosaic from '../assets/art-works/mosaic.svg';
// import Mural1 from '../assets/art-works/mural-1.svg';
// import Mural2 from '../assets/art-works/mural-2.svg';
// import Mural3 from '../assets/art-works/mural-3.svg';
// import SiteIntergrated from '../assets/art-works/site-intergrated.svg';
// import Statue from '../assets/art-works/statue.svg';
// import Totem from '../assets/art-works/totem.svg';
// import TotemSolid from '../assets/art-works/totem-solid.svg';

// import icon from 'leaflet/dist/images/marker-icon.png';
import maximize from '../assets/icons/maximize-2-1.5px.svg';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

//----------------- Data -------------------//
import * as parkData from "../data/skateboard-parks.json";
import { API_URL } from '../components/Utils/Utils';
import data from '../data_temp/art_work_final_geom.json';
//import publicArtData from '../data_temp/public-art-smaller.json';
import { restaurants } from "../data_temp/data";
import neighbourhood_boundaries from '../data_temp/local-area-boundary.json';
const Dunbar = neighbourhood_boundaries[0].fields.geom.coordinates
// var poly = L.polygon(Dunbar).addTo(L.map);
 



//-------------- Marker Icons --------------// 

// const mural2 = L.icon({
//   iconUrl: Mural2,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41]
// })
// const mural3 = L.icon({
//   iconUrl: Mural3,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41]
// })

//----------- Marker Icons -----------// 


// L.Marker.prototype.options.icon = DefaultIcon;  //  <------ Default Icon 
// L.Marker.prototype.options.icon = SpecialIcon;

//------------- Experiment -----------// 

const RESTAURANT_TYPES = ["Family Style", "Buffet", "Fast Food", "Cafe"];

// const eventFire = (el, etype) => {
//   if (el.fireEvent) {
//     el.fireEvent('on' + etype);
//   } else {
//     var evObj = document.createEvent('Events');
//     evObj.initEvent(etype, true, false);
//     el.dispatchEvent(evObj);
//   }
// }


class MapArt4_skateVideo_classComp extends Component {

  state = {
    art_works: [],
    user_id: parseInt(localStorage.getItem('user_id')),
    userCurrentLocation: [parseFloat(localStorage.getItem('userLat')), parseFloat(localStorage.getItem('userLon'))],
    userFavourites: [],
    userFavouritesByRegistryId: [],
    neighbourhood_boundaries: neighbourhood_boundaries,
  }

  componentDidMount() {
    this.getAllArtWorks()
    this.getUserLocation()
    this.getUserFavourites()
    // this.getUrlId()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):   <---- Double Check 
    // if (this.props.userFavourites !== prevProps.userFavourites) {
    //   this.fetchData(this.props.userFavourites);
    // }
    this.openPopUp()
  }

  componentWillUnmount() {
    this.clearOpenPopUp()
  }

  clearOpenPopUp() {
    // if the user returns from a page without having selected an artwork,
    // the map will now load without a selected artwork
    localStorage.removeItem('currently viewing');
  }
  
  openPopUp() {

    const id = parseInt(localStorage.getItem('currently viewing'))
    document.querySelector(`img[alt = "marker-${id}"]`)?.click()
  }


  // -------- componentDidMount functions ------ //
  getAllArtWorks() {
    // axios
    //   .get(`http://localhost:8090/art_works`)
    //   .then((response) => {
    //     this.setState({ art_works: response.data.art_works })
    //   })
    //   .catch(function (error) { })
    
    this.setState({ art_works: data })
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        // console.log("Current user Latitude is:", position.coords.latitude);
        // console.log("Current user Longitude is:", position.coords.longitude);
        localStorage.setItem('userLat', position.coords.latitude)
        localStorage.setItem('userLon', position.coords.longitude)
      })
    }
  }

  getUserFavourites() {
    // art_work_id is set by the MySQL database, while registry_id is from the City of Vancouver dataset (req. for matching artist info)
    // userFavourites sets all details on favourite art_works and userFavouritesByRegistryId extracts the matching registry_id's
    axios
      .get(`${API_URL}/favourites/${this.state.user_id}`)
      .then((response) => {
        this.setState({
          userFavourites: response.data,
          userFavouritesByRegistryId: response.data.map((fave) => fave.art_works.registry_id)
        })
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
  
//------------ onClick functions ------------------// 
  
  selectNeighbourhood = (location) => {
    // passed on Search bar as a prop
    // console.log('Search --> location.target.value --> ', location.target.value) // name of neighbourhood
    // console.log('Search --> this.state.art_works --> ', this.state.art_works) // name of neighbourhood
    console.log('Select Neighbourhood - data --> ', data) // name of neighbourhood
      
    // if it's not Vancouver then do this: 

    if ('Vancouver' === location.target.value) {
      // this.setState({ art_works: this.state.artWorks }) // do nothing 
      this.setState({ art_works: data })
      // do nothing
    } else {
    // if it's anything else, then filter for that 
    // const data = this.state.art_works  
    const filteredData = data.filter(area => 
      area.neighbourhood === location.target.value);
    
      this.setState({ art_works: filteredData })

      console.log('Select Neighbourhood - filteredData --> ', filteredData)
    }

    // console.log('Search --> this.state.art_works AFTER --> ', this.state.art_works)
    // console.log('Search --> this.state.art_works AFTER --> ', this.state.userFavourites)
    
    // ----- Works ------ 
    // const filteredData = data.filter(area => 
    //   area.neighbourhood === location.target.value);
    
    // this.setState({ art_works: filteredData })
    // ----- Works ^ ------ 
    
    // if it is Vancouver the just put Vancouver in state 
    

    // const filteredData = this.state.art_works.filter(area => 
    //   area.neighbourhood === location.target.value);
    
    // this.setState(newStateObject, () => {  
    // });
    // this.setState((prevState, props) => {
    //   return { art_works: filteredData };
    // }
    // );

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
  
  selectFavourties = (e, faves) => {
    console.log('Select Favourites - data --> ', data)   // data being filtered 
    console.log('Select Favourites - userFavouritesByRegistryId --> ', this.state.userFavouritesByRegistryId) // by registry_id

    // return from all art_works (data) only those included in the userFavouritesByRegistryId array 
    const selectFavourties = data.filter( i => this.state.userFavouritesByRegistryId.includes( i.registry_id ) );

    console.log('Select Favourites - selectFavourties --> ', selectFavourties)

    this.setState({ art_works: selectFavourties })
  }

  print = () => {
    console.log('Hello')
    console.log('Print', this.state.userFavourites)    
  }
  
  removeFromFavourites = (e, registry_id) => {

    console.log('REMOVE to Favourites --> ', registry_id)
    console.log('this.state.art_works --> ', this.state.art_works) // displays all, 
    // console.log('this.state.userFavouritesByRegistryId -->', this.state.userFavouritesByRegistryId) // lots of duplicates 

    // take all art_works currently in state and remove the registry_id selected, then set the new array in state

    // filter out the selected registry_id from all art_works being displayed 
    const result = this.state.art_works.filter(work => work.registry_id !== registry_id)

    console.log('Filtered --> ', result)


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
    //   .delete(`${API_URL}/favourites/${this.state.user_id}/remove/${artWorkId}`)
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

    localStorage.removeItem('art_work_id');
    // this.forceUpdate()
  }

  addToFavourites = (e, registry_id) => {
    // console.log('Liked state -->', this.state.liked)
    console.log('ADD to Favourites -- registry.id --> ', registry_id)
    //console.log(e)
    console.log('this.state.art_works --> ', this.state.art_works)
    console.log('this.state.userFavouritesByRegistryId -->', this.state.userFavouritesByRegistryId)
    // get art_work_id used in MySQL given given registry_id
    this.state.art_works.forEach(function (item, index) {
      if (item.registry_id === registry_id) {
        const position = index + 1 
        localStorage.setItem('art_work_id_for_user_post', position)
      }
    })
    const art_work_id_for_user_post = parseInt(localStorage.getItem('art_work_id_for_user_post'))
    
    console.log(`${API_URL}/favourites/${this.state.user_id}/${art_work_id_for_user_post}`)

    axios
      .post(`${API_URL}/favourites/${this.state.user_id}/${art_work_id_for_user_post}`)
      .then((response) => {
        // window.location.reload()
        // console.log('this.state.userFavouritesByRegistryId - After Axios-->', this.state.userFavouritesByRegistryId)
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })
    
    // localStorage.removeItem('art_work_id_for_user_post') // neede? 
    this.getUserFavourites()  // update userFavourites in state 

    // localStorage.removeItem('art_work_id_for_user_post');

    // console.log('this.state.userFavouritesByRegistryId -->', this.state.userFavouritesByRegistryId)
   //  window.location.reload() 
    // Get Gray heart Click ... 
    // const grayHeart = document.getElementById('grayHeart');
    //   grayHeart.addEventListener('click', () => { 
    //     document.getElementById("pv-contact-info").innerText; 
    // });
  }

  visitDetailsPage = (e, registry_id) => {
    this.props.history.push(`/details/${registry_id}`)
  }

  // L.CustomHandler = L.Handler.extend({
  //   addHooks: function() {
  //       L.DomEvent.on(document, 'eventname', this._doSomething, this);
  // },

  // <a href="https://www.vecteezy.com/free-vector/human">Human Vectors by Vecteezy</a>
  // Choose your Avatar Character --> https://www.vecteezy.com/free-vector/8-bit-character?license-free=true


  render() {

    console.log('Render -> Art_works --> ', this.state.art_works);
    // console.log('Render -> User Favourties --> ', this.state.userFavourites);
    { console.log('Hello')}
    // console.log(`Hi, I'm the map for user --> `, this.state.user_id)
    // console.log(`User's current location --> `, this.state.userCurrentLocation);
    // console.log('userFavourites --> ', this.state.userFavourites);
    // console.log('userFavouritesByRegistryId --> ', this.state.userFavouritesByRegistryId);

    // console.log('neighbourhood Boundaries: fields.name -->', neighbourhood_boundaries[0].fields.name)
    // console.log('neighbourhood Boundaries: fields.name.coordinates -->', neighbourhood_boundaries[0].fields.geom.coordinates)
    // console.log('neighbourhood Boundaries: geom -->', Dunbar)
    // console.log('neighbourhood Boundaries: inState -->', this.state.neighbourhood_boundaries)

    // const groupedByType = groupBy(restaurants, (restaurant) => restaurant.type);
    // const userFavouritesObj = this.state.userFavourites

    return (
      <section>
        <Search
          selectNeighbourhood={this.selectNeighbourhood}
          selectFavourties={this.selectFavourties}
          faves={this.state.userFavourites}
        />        
        <MapContainer center={[49.2780, -123.1153]} zoom={12}>
          {/* <LayersControl position="topright"> */}

            {/* <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          /> */}
            <TileLayer
              // url={`${URL_CUSTOM_OUTDOORS}`}
              url={`${URL_CUSTOM_OUTDOORS_DARKER}`}
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            />

          {/* //------------- Task Bar ----------//  */}
          {/* <div className="floating-menue__container">
              <img className="floating__icon" src={redHeart} />
              <img className="floating__icon" src={Fountain} />
              <img className="floating__icon" src={Gateway} />
              <img className="floating__icon" src={Memorial} />
              <img className="floating__icon" src={Mosaic} />
              <img className="floating__icon" src={Mural2} />
              <img className="floating__icon" src={SiteIntergrated} />
              <img className="floating__icon" src={Statue} />
              <img className="floating__icon" src={Totem } />
              <img onClick={(e) => { this.print() }} className="floating__icon" src={SiteIntergrated} />
          </div> */}

          {/* <LayersControl position="topright"> */}
            
            {/* {RESTAURANT_TYPES.map((type, index) => (
              <LayersControl.Overlay key={index} checked name={type}>
                <LayerGroup>
                  {groupedByType[type]?.map((restaurant) => (
                    <Marker key={restaurant.id} position={restaurant.coordinates}> */}
                      {/* <Popup>{restaurant.name}</Popup> */}
                    {/* </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
            ))} */}

          {/* </LayersControl>
           */}
          
          {/* //  -------- GitHub test Markers --------  // */}
          <Marker position={[49.2780, -123.1153]} icon={blackGithub}></Marker>

          <Marker className="current-user-location AVATAR"
            position={[
              this.state.userCurrentLocation[0],
              this.state.userCurrentLocation[1]
            ]}
            icon={redGithub}>
            <Popup>
              <h2>Current User Location</h2>
              <h2>{this.state.userCurrentLocation}</h2>
              </Popup>
          </Marker>
          {/* //  -------- GitHub test Markers --------  // */}
          

{/* userCurrentLocation: [parseFloat(localStorage.getItem('userLat')), parseFloat(localStorage.getItem('userLon'))], */}
          
            {/* // ------ Display Markers by Neighbourhood ------ //  */}
              {this.state.art_works.map(artWork => (
                <Marker
                  position={[
                    artWork.lat,
                    artWork.lon
                  ]}
                  id={`marker-${artWork.registry_id}`}
                  className={`marker-${artWork.registry_id}`}
                  // icon={`${artWork.type}`}
                  // icon={artWork.type !== 'Memorial_or_monument' ? DefaultIcon : fountain} // works =) 

                  icon={ artWork.type === 'Fountain'             ? fountain    
                       : artWork.type === 'Gateway'              ? gateway     
                       : artWork.type === 'Memorial_or_monument' ? memorial     
                       : artWork.type === 'Totem_pole'           ? totem      
                       : artWork.type === 'Site_integrated_work' ? siteIntergrated
                       : artWork.type === 'Mural'                ? mural
                       : artWork.type === '2D'                   ? mural        
                       : artWork.type === 'Mosaic'               ? mosaic
                       : artWork.type === 'Relief'               ? mosaic
                       : artWork.type === 'Media_work'           ? mosaic
                       : artWork.type === 'Sculpture'            ? statue
                       : artWork.type === 'Figurative'           ? statue
                                                                 : defaultIconSkater}
                

                  // icon={cool = () => { if (artWork.type !== 'Memorial_or_monument') { DefaultIcon } else { fountain } }}
                  // icon={fountain} // Memorial_or_monument
                  // icon={if artWork is fountatin then place fountain if artWork.type === Sculpture then display sculpture.svg}
                  alt={`marker-${artWork.registry_id}`}
                >
                  
                  <Popup id={`popup-${artWork.registry_id}`}>
                    <div className="popup">
                      <img className="img" src={artWork.photo_url_jpg} alt={artWork.title} />
                      <div className="popup-inside">
                        <div>
                          <h1 onClick={(e) => { this.addToFavourites(e, artWork.registry_id) }}>{artWork.title}</h1>
                          <h2>by {artWork.artists_names}</h2>
                          <h2>{artWork.type}</h2>
                        </div>
                        <div className="popup-icons">
                          <img className="icon-maximize" src={iconMaximize} alt="maximize icon, click to visit details page"
                            onClick={(e) => { this.visitDetailsPage(e, artWork.registry_id) }}></img>
                          
                          {/* {console.log('FROM THE TURNARY ---> ', this.state.userFavouritesByRegistryId.includes(artWork.registry_id))} */}
                          
                          {this.state.userFavouritesByRegistryId.includes(artWork.registry_id) === true ? (
                            
                            <img className="icon" src={redHeart} alt="red heart icon, click to remove from favourites"
                              onClick={(e) => {this.removeFromFavourites(e, artWork.registry_id)}}></img>
                          ) : (
                            // <img className="icon" src={lightGray1Heart2} alt="white heart icon, click to add to favourites"
                            <img className="icon" src={blackHeart} alt="white heart icon, click to add to favourites"
                              onClick={(e) => { this.addToFavourites(e, artWork.registry_id) }}></img>
                          )}
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* // ------ Display userFavourites ------ //  */}

            <Polygon color="blue" positions={this.state.neighbourhood_boundaries[0].fields.geom.coordinates} />
            <GeoJSON key="my-geojson" data={this.state.neighbourhood_boundaries[0].fields.geom.coordinates} />
              {/* <LayersControl.Overlay name="User Favourites">
                <LayerGroup>
                {this.state.userFavourites.map(artWork => (
                  <Marker
                    position={[
                      artWork.art_works.lat,
                      artWork.art_works.lon
                    ]}
                    eventHandlers={{ click: () => { console.log('marker clicked') },}}>
                    <Popup>
                      <div className="popup">
                        <img className="img" src={artWork.art_works.photo_url_jpg} alt={artWork.art_works.title} />
                        <div className="popup-inside">
                          <div>
                            <h1>{artWork.art_works.title}</h1>
                            <h2>by {artWork.art_works.artists_names}</h2>
                          </div>
                          <div>
                            {this.state.userFavouritesByRegistryId.includes(artWork.registry_id) === true ? (
                              <img className="icon" src={redHeart} alt="red heart icon, click to remove from favourites"></img>
                            ) : (
                              // <img src={lightGray1Heart2Filled} alt="white heart icon, click to add to favourites"></img>
                                <img className="icon" id="grayHeart" src={lightGray1Heart2} alt="white heart icon, click to add to favourites"
                                    onClick={(e) => { this.addToFavourites(e, artWork.registry_id)} }></img>
                            )}
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                </LayerGroup>
              </LayersControl.Overlay> */}

              {/* // ------ Neighbourhoods ------ //  */}

              {/* <LayersControl.Overlay checked name="Neighbourhoods">
                <LayerGroup> */}
                  {/* <Polygon pathOptions={{ color: 'green' }} positions={neighbourhood_boundaries[0].fields.geom.coordinates} /> */}
                  
                {/* <Polygon color="blue" positions={this.state.neighbourhood_boundaries[0].fields.geom.coordinates[0]} /> */}
                {/* <GeoJSON key={keyFunction(this.props.map.data.json)} data={this.props.map.data.json} /> */}
                {/* </LayerGroup>
              </LayersControl.Overlay> */}
          {/* </LayersControl>   */}

          
          
          </MapContainer>
        <BottomNav />
      </section>
    );
  }
}

export default MapArt4_skateVideo_classComp;


//---------------- PolyLine Experiment -------------//
// <Polyline pathOptions={limeOptions} positions={multiPolyline} />  // Polyline inside is not colored
// <Polygon pathOptions={purpleOptions} positions={multiPolygon} />



