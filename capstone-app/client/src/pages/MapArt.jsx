import { Component } from 'react';
import axios from 'axios';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import BottomNav from '../components/BottomNav/BottomNav';
// import { Icon } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L, { Popup } from 'leaflet';
// import L, { map, Popup } from 'leaflet';

//import publicArtData from '../data_temp/public-art-smaller.json';
import 'leaflet/dist/leaflet.css';
import Search from '../components/Search/Search';

import data from '../data_temp/art_work_final_geom.json';
// const areas = [
//   'Downtown', 'Mount Pleasant', 'Downtown Eastside', 'West End', 'Strathcona',
//   'Shaughnessy', 'Stanley Park', 'Grandview-Woodland', 'Kensington-Cedar Cottage',
//   'Kitsilano', 'Fairview', 'Marpole', 'RileyPark', 'Oakridge', 'Renfrew Collingwood',
//   'Sunset', 'Hastings-Sunrise', 'Killarney', 'South Cambie', 'Arbutus Ridge',
//   'Dunbar-Southlands', 'West Point Grey', 'Kerrisdale']
  
// Tile Providers 
// https://www.thunderforest.com/maps/atlas/
//const atlas = `https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=<insert-your-apikey-here>`
//L.tileLayer.provider('Thunderforest.Landscape', {apikey: '<insert api_key here>'}).addTo(map);

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// const OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
// });

// const ACCESS_TOKEN = "pk.eyJ1IjoiY3Jpc3RpYW5uaWMiLCJhIjoiY2ttcGxnaHI4MGZyajJ1bWFwajR4NWxvNCJ9.kcGf_oljKiU4AYGmg88Sfg"
// const outdoors = "mapbox/outdoors-v11"
// const street = "/mapbox/streets-v11"

// const mapBoxLayer = L.tileLayer.provider('MapBox', {
//     id: "mapbox/outdoors-v11",
//     accessToken: `${ACCESS_TOKEN}`
// }).addTo(map);

const dataSmall = data.slice(0, 400)

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

class MapArt extends Component {

  /* Get Geolocation    
  // https://react-leaflet.js.org/docs/example-events   // https://egghead.io/lessons/react-use-leaflet-s-geolocation-api-to-find-a-browser-s-location-to-update-a-react-leaflet-map
  // if user is opening app for the first time center
  // if user comes from favourties site then show users current location
  // https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs

  // geolocation is available
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
    // filtered_art_works: publicArtData,
    // geom: [],
    activeMarker: null,
  }

  // this.handleSelectLocation = this.handleSelectLocation.bind(this);

    // constructor() {
    // super()
    // this.state = {
    //   value: this.props.defaultValue,
    //   setValue: (newValue) => {
    //     this.setState({ value: newValue })
    //   }
    // }
  // constructor() {
  //   super();
  //   this.handleSelectLocation = this.handleSelectLocation.bind(this);
  // }; 

  componentDidMount() {
    this.getLocations()
    // this.setActiveMarker()
    // this.getUserLocation()
    // this.handleSelectLocation()
  }

  // getUserLocation() {
  //   map.locate();
  // }
  // https://egghead.io/lessons/react-use-leaflet-s-geolocation-api-to-find-a-browser-s-location-to-update-a-react-leaflet-map


  // setActiveMarker() {
  //   this.setState({ activeMarker: this.artWork }); 
  // }


  handleFormChange = (e) => {
    this.setState({ activeMarker: e.target.value,
    });
  }

  getLocations() {
    axios
      .get(`http://localhost:8090/art_works`)
      .then((response) => {
        console.log('Inside getLocations(), response.data.art_works:', response.data.art_works)
        this.setState({ art_works: response.data.art_works })
      })
      .catch(function (error) {
      })
  }
  
  // handleSelectLocation = (event) => {
  //   console.log(event.target.value)

  //   const filteredData = this.state.filtered_art_works.filter( (area) => {
  //     return area.neighbourhood === event.target.value
  //   })
  //   if (filteredData.length > 0) {
  //     this.setState({filtered_art_works: filteredData})
  //   }
  //   else {
  //     this.setState({filtered_art_works: publicArtData})
  //   }
  // }
  // handleSelectLocation = (event) => {
  //   console.log(event.target.value)
  //   console.log(dataSmall)

  //   const filteredData = this.state.filtered_art_works.filter( (area) => {
  //     return area.neighbourhood === event.target.value
  //   })
  //   if (filteredData.length > 0) {
  //     this.setState({filtered_art_works: filteredData})
  //   }
  //   else {
  //     this.setState({filtered_art_works: publicArtData})
  //   }
  // }

  handleSelectLocation = (location) => {
    // console.log(location.target.value)
    // console.log(dataSmall)
    // console.log("small data: ", dataSmall[0])

    const filteredData = dataSmall.filter(area => 
      area.neighbourhood === location.target.value);
    
    this.setState({ art_works: filteredData })
    // this.setState(newStateObject, () => {  
    // });
    // this.setState((prevState, props) => {
    //   return { art_works: filteredData };
    // }
    // );

    console.log('handleSelectLocation: filteredData', filteredData)
    console.log('handleSelectLocation: this.state.art_works', this.state.art_works)
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
  
  render() {
    return (
      <section className="map">
        <Search handleSelectLocation={this.handleSelectLocation} />
        <div className="map__container">
        <MapContainer center={[49.2780, -123.1153]} zoom={12}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution={false}
            />
            {console.log('Inside render() this.art_works: ', this.state.art_works) /* <--- correct */}
            {console.log('Inside render() this.activeMarker: ', this.state.activeMarker) /* <--- null to begin with */}
            {this.state.art_works.map(artWork => (
              <Marker
                key={artWork.registry_id}
                position={[
                  artWork.lat,
                  artWork.lon
                ]}
                onClick={() => {
                  console.log("Clicked marker: ")
                  // this.setActiveMarker()
                  this.setState({ activeMarker: artWork })
                  console.log("result: ", this.state.activeMarker)
                }}
                // onClick={this.setActiveMarker}
              />
            ))}

              { this.state.activeMarker && (
                <Popup
                  position={[
                    this.state.activeMarker.lat,
                    this.state.activeMarker.lon
                  ]}
                >
                  <div>
                    <h2>{this.activeMarker.title}</h2>
                  {/* <p>{this.activeMarker.type}</p> */}
                    <button>test, links to artwork page</button>
                  </div>
                </Popup>
                )}
    
              {/* <button className='above_map_layer'></button> */}
              
        </MapContainer>
          </div>
        <BottomNav />
      </section>
    );
  }
}

export default MapArt;
































//
