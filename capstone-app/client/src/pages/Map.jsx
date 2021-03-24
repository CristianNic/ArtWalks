import { Component } from 'react';
import axios from 'axios';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
// import TopNav from '../../components/TopNav/TopNav';
import BottomNav from '../components/BottomNav/BottomNav';
// import { Icon } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

// import * as publicArtData from '../../data_temp/public-art.json';
// import publicArtData from '../../data_temp/public-art.json';
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
    geom: []
  }

  // Browse page passes params back [neighbourhood, title, artist, medium]
  // 4 different axios calls based on this, 
  // skips slowdown of all items displayed at once and faster then parsing all works 

  componentDidMount() {
    axios
      .get(`http://localhost:8090/art_works`)
      .then((response) => { 
        console.log('response.data:', response.data)
        console.log('Art Works:', response.data.art_works)
      
        response.data.art_works.map((artWorks) => {
          const geom = {};
          this.setState({
            geom: geom[artWorks.geom]
          })
          // this.setState({
          //  geom: artWorks.geom,
          // })
          })
        })
        // this.setState({ favourties: response.data})
      .catch(function(error) {
        //console.log('error:', error.response.data);
      })
  }



  
  
  render() {
    return (
      <section className="map">
        {console.log('this state:', this.state)}
      <Search />
      <MapContainer center={[49.2780, -123.1153]} zoom={12}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution={false}
          />
          {publicArtData.map(artWork => (
            <Marker
            key={artWork.recordid}
            position={[
              artWork.geom.coordinates[1],
              artWork.geom.coordinates[0]
            ]}
            />  
            ))}
        <button className='btn'></button>
      </MapContainer>
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