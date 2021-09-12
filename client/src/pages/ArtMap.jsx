import React from "react";
import { Component } from 'react';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import BottomNav from '../components/BottomNav/BottomNav';
import redHeart from '../assets/icons/heart_red.svg';
import blackHeart from '../assets/icons/heart-black-2px.svg';
import iconMaximize from '../assets/icons/maximize-2-1.5px.svg';
import {
  fountain, gateway, memorial, mosaic, mural, siteIntergrated, statue,
  totem, defaultIconSkater, legoMan
} from '../utils/MapIcons';
import { neighbourhoods, API_URL } from '../utils/Utils';
import { URL_CUSTOM_OUTDOORS_DARKER } from '../utils/MapboxToken';


class ArtMap extends Component {

  state = {
    art_works: [],
    art_works_to_filter: [],
    userID: parseInt(localStorage.getItem('userID')),
    userCurrentLocation: [parseFloat(localStorage.getItem('userLat')), parseFloat(localStorage.getItem('userLon'))],
    userFavourites: [],
    userFavouritesByRegistryId: [],
    openPopUp: parseInt(localStorage.getItem("openPopUp")),
  }

  componentDidMount() {
    this.getArtWorks()
    this.getUserLocation()
    this.getUserFavourites()
  }

  componentDidUpdate(prevProps) {
    this.openPopUp()
  }

  openPopUp() {
    const id = parseInt(localStorage.getItem("openPopUp"))                                  
    document.querySelector(`img[alt = "marker-${id}"]`)?.click()
  }
  
  setOpenPopUp(data) {
    localStorage.setItem("openPopUp", data);
  }
  
  clearOpenPopUp() {
    localStorage.removeItem('openPopUp');
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        localStorage.setItem('userLat', position.coords.latitude)
        localStorage.setItem('userLon', position.coords.longitude)
      })
    }
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
  }

  getUserFavourites() {
    // art_work_id is set by the MySQL database, while registry_id is from the City of Vancouver dataset (required for matching artist info)
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
          userFavouritesByRegistryId: result.map((fave) => fave.art_works.registry_id)
        })
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })
  }
  
//------------ onClick functions ------------------// 
  selectNeighbourhood = (location) => {
    if ('Vancouver' === location.target.value || '' === location.target.value) {
      this.setState({ art_works: this.state.art_works_to_filter })
      this.clearOpenPopUp()
      // or do nothing
    } else {
    const filteredData = this.state.art_works_to_filter.filter(area => 
      area.neighbourhood === location.target.value);  
      this.setState({ art_works: filteredData })
    }
  }
  
  selectFavourties = () => {
    const userFavourites = this.state.userFavourites.map((faves) => faves.art_works)
    this.setState({ art_works: userFavourites })
  }
  
  removeFromFavourites = (e, registry_id) => {
    const filteredData = this.state.userFavourites.filter(item =>
      item.art_works.registry_id === registry_id);
    const art_work_id = filteredData[0].art_work_id
    
    axios
      .delete(`${API_URL}/favourites/${this.state.userID}/remove/${art_work_id}`)
      .then((response) => {
        this.getUserFavourites()
        document.querySelector(`img[alt = "marker-${registry_id}"]`)?.click()
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })
  }
  
  addToFavourites = (e, registry_id) => {
    const filteredData = this.state.art_works.filter(item =>
      item.registry_id === registry_id);
    const art_work_id = filteredData[0].id

    axios
      .post(`${API_URL}/favourites/${this.state.userID}/${art_work_id}`)
      .then((response) => {
        this.getUserFavourites()
        document.querySelector(`img[alt = "marker-${registry_id}"]`)?.click()
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })
  }

  visitDetailsPage = (e, registry_id) => {
    this.props.history.push(`/details/${registry_id}`)
    localStorage.setItem("openPopUp", this.state.openPopUp)
  }

  render() {
    
    return (
      <section>
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
            // icon={manWalkingRight}>
            icon={legoMan}>
            <Popup>
              <h2>Current User Location</h2>
              <h2>{this.state.userCurrentLocation}</h2>
            </Popup>
          </Marker>
              {this.state.art_works.map(artWork => (
                <Marker
                  position={[
                    artWork.lon,
                    artWork.lat
                  ]}
                  id={`marker-${artWork.registry_id}`}
                  className={`marker-${artWork.registry_id}`}
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
                  eventHandlers={{click: () => {this.setOpenPopUp(artWork.registry_id)}}}
                >
                  <Popup id={`popup-${artWork.registry_id}`}>
                    <div className="popup">
                      <img className="popup__img" src={artWork.photo_url_jpg} alt={artWork.title} />
                      <div className="popup__inside">
                        <div>
                          <h1 className="popup__title"
                            onClick={(e) => {this.addToFavourites(e, artWork.registry_id)}}>{artWork.title}</h1>
                          {artWork.artists_names === "" ?
                            (<h2 className="popup__artist">artist(s) currently unavailable</h2>)
                          : (<h2 className="popup__artist">by {artWork.artists_names}</h2>)}
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