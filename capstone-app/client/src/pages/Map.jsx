import { Component } from 'react';
import axios from 'axios';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import BottomNav from '../components/BottomNav/BottomNav';
// import { Icon } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

import publicArtData from '../data_temp/public-art-smaller.json';
import 'leaflet/dist/leaflet.css';
import Search from '../components/Search/Search';

// Tile Providers 
// https://www.thunderforest.com/maps/atlas/
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// const customMarkerOptions = {
//   radius: 8,
//   fillColor: "#ff7800",
//   color: "#000",
//   weight: 1,
//   opacity: 1,
//   fillOpacity: 0.8
// }
// const myLayer = L.geoJSON(geojsonFeature, {
//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, geojsonMarkerOptions);
//     }
// }).addTo(map);



class Map extends Component {

  /* Get Geolocation 
  // https://react-leaflet.js.org/docs/example-events   // https://egghead.io/lessons/react-use-leaflet-s-geolocation-api-to-find-a-browser-s-location-to-update-a-react-leaflet-map
  // if user is opening app for the first time center
  // if user comes from favourties site then show users current location
  // https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs
  // componentDidMount() {
  //   if ("geolocation" in navigator) {
  //     console.log("Available");
  //   } else {
  //     console.log("Not Available");
  //   }
  // } 
  */

  state = {
    art_works: [],
    filtered_art_works: publicArtData,
    geom: []
  }

  // Browse page passes params back [neighbourhood, title, artist, medium]
  // 4 different axios calls based on this, 
  // skips slowdown of all items displayed at once and faster then parsing all works 

  componentDidMount() {
    // axios
    //   .get(`http://localhost:8090/art_works`)
    //   .then((response) => { 
    //     //console.log('response.data:', response.data)
    //     console.log('Art Works:', response.data.art_works)
    //     console.log('Art Works:', response.data.art_works[0].geom) // each works location
      
    //     response.data.art_works.map((artWorks) => {
    //       const geom = {};
    //       this.setState({
    //         geom: geom[artWorks.geom]
    //       })
    //       // this.setState({
    //       //  geom: artWorks.geom,
    //       // })
    //     })
    //     console.log(this.state.geom)
    //   })
    //     // this.setState({ favourties: response.data})
    //   .catch(function(error) {
    //     //console.log('error:', error.response.data);
    //   })
    this.getLocations()
  }

  getLocations() {
    axios
      .get(`http://localhost:8090/art_works`)
      .then((response) => {
        //console.log('response.data:', response.data)
        console.log('response.data.art_works:', response.data.art_works)
        console.log('response.data.art_works[0].geom:', response.data.art_works[0].geom) // each works location
        
        this.setState({
          art_works: response.data.art_works,
        })
        // response.data.art_works.map((artWorks) => {
        //   // const geom = {};
        //   // this.setState({
        //   //  geom: artWorks.geom,
        //   // })
        // })
        console.log('inside axios() - this.state: ', this.state)
      })
      // this.setState({ favourties: response.data})
      .catch(function (error) {
        //console.log('error:', error.response.data);
      })
  }
  // getLocations_v1() {
  //   axios
  //     .get(`http://localhost:8090/art_works`)
  //     .then((response) => {
  //       //console.log('response.data:', response.data)
  //       console.log('Art Works:', response.data.art_works)
  //       console.log('Art Works:', response.data.art_works[0].geom) // each works location
      
  //       response.data.art_works.map((artWorks) => {
  //         const geom = {};
  //         this.setState({
  //           geom: geom[artWorks.geom]
  //         })
  //         // this.setState({
  //         //  geom: artWorks.geom,
  //         // })
  //       })
  //       console.log(this.state.geom)
  //     })
  //     // this.setState({ favourties: response.data})
  //     .catch(function (error) {
  //       //console.log('error:', error.response.data);
  //     })
  // }
  handleSelectLocation = (event) => {
    console.log(event.target.value)

    const filteredData = this.state.filtered_art_works.filter( (area) => {
      return area.neighbourhood === event.target.value
    })
    if (filteredData.length > 0) {
      this.setState({filtered_art_works: filteredData})
    }
    else {
      this.setState({filtered_art_works: publicArtData})
    }
  }

  render() {
    {console.log('inside render() -- this.state:', this.state)} 
    {console.log('inside render() -- this.filtered_art_works:', this.state)} 
    
    return (
      <section className="map">
        <Search handleSelectLocation={this.handleSelectLocation}/>
        <div className="map__container">
        <MapContainer center={[49.2780, -123.1153]} zoom={12}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution={false}
            />
            {/* {this.state.filtered_art_works.map(artWork => (
              <Marker
              key={artWork.recordid}
              position={[
                artWork.geom.coordinates[1],
                artWork.geom.coordinates[0]
              ]}
              />  
              ))} */}
            {/* {this.state.art_works.map(artWork => (
              <Marker
              key={artWork.id}
              position={[
                artWork.geom[0],
                artWork.geom[1]
              ]}
              />  
              ))} */}
            {/* {publicArtData.map(artWork => (
              <Marker
              key={artWork.recordid}
              position={[
                artWork.geom.coordinates[1],
                artWork.geom.coordinates[0]
              ]}
              />  
              ))} */}
          <button className='btn'></button>
          </MapContainer>
          </div>
        <BottomNav />
      </section>
    );
  }
}

export default Map;
        // <Marker position={[49.2827, -123.1207]}>
        //   <Popup>
        //     A pretty CSS3 popup
        //   </Popup>
        // </Marker>