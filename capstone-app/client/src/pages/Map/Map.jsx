import { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
// import TopNav from '../../components/TopNav/TopNav';
import BottomNav from '../../components/BottomNav/BottomNav';
// import { Icon } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

// import * as publicArtData from '../../data_temp/public-art.json';
// import publicArtData from '../../data_temp/public-art.json';
import publicArtData from '../../data_temp/public-art-smaller.json';
import 'leaflet/dist/leaflet.css';

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

  render() {
    return (
      <section className="map">
      <MapContainer center={[49.2827, -123.1207]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
        <button className="btn"></button>
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