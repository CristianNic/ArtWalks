import { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import BottomNav from '../components/BottomNav/BottomNav';
import { API_URL } from '../components/Utils/Utils';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import iconBackArrow from '../assets/icons/maximize-2-1.5px.svg'
import iconMapPin from '../assets/icons/map-pin-1.5px.svg';
import iconMap from '../assets/icons-feather-1.5px/map.svg';


class Details extends Component {

  state = {
    art_work: {},
    // artists: '',
    // url_photo: '', 
    // photo_credits: '',
    // type: '',
    // primary_material: '',
  }
  //.get(`${apiUrl}`)
  //.get(`http://localhost:8090/art_works${apiUrl}`)
  //.get(`http://localhost:8090/art_works/${this.props.match.params.id}`)
  state = {
    art_work: [],
  }
  
  componentDidMount() {

    this.getArtWorkDetails()
   

    // axios
    // //.get(`http://localhost:8090/art_works/9`)
    // .get(`http://localhost:8090/art_works/${this.props.match.params.id}`)
    //   .then(response => {
    //     console.log('response.data:', response.data)
       
    //     console.log('params.id', this.props.match.params.id) // <--- what is params.id here? 
    //     this.setState(
    //       //art_works: response.data,
    //       response.data,
    //     );
    //     // console.log(this.state)
    //   })
    // console.log('this.state', this.state)
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
    this.setArtWorIdInLocalStorage()
  }

  // http://localhost:8090/art_works/registry_id/316
  getArtWorkDetails() {
    axios
      .get(`${API_URL}/art_works/registry_id/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          art_work: response.data
        })
      })
      .catch((error) => {
      console.log('error:', error.response.data);
    })
  }

  setArtWorIdInLocalStorage() {
    console.log(this.state.art_work.registry_id)
    localStorage.setItem('currently viewing', this.state.art_work.registry_id)
  }

  render() {

    console.log('API RESPONSE --->', this.state.art_work)

    const { registry_id, title, artists_names, work_description, photo_url, photo_credits,
      type, primary_material, artist_statement, geo_local_area, installation_year,
      address, ownership, site_name, status, url} = this.state.art_work

    return (
      <section className="details">
        <div className="details__card">
    
          <img className="details__img" src={photo_url} alt={title} />

          <div className="details__container">
            <h1 className="details__title">{title}</h1>
            <h2 className="details__artists-names">by {artists_names}</h2>

            {photo_credits === "" ? (<div></div>) :
              (<h2 className="details__photo-credits">Photo Credits: {photo_credits}</h2>)}
            
            {/* <h2 className="details__photo-credits">Photo Credits: {photo_credits}</h2> */}
              <Link to={`/map/${registry_id}`}>
                {/* <button className="favourites__links-button" */}
                  {/* onClick={(e) => { this.placeArtWorkOnMap(e, registry_id) }} > */}
                    <img className="favourites__links-map-icon" src={iconMap} alt="map icon"></img>
                {/* </button> */}
            </Link>
            
            <h2 className="details__type">Type: {type}</h2>
            <h2 className="details__primary-material">Primary Material: {primary_material}</h2>
            <h2 className="details__artist-statement">Artist Statement: {artist_statement}</h2>
            <h2 className="details__work-description">Work Description: {work_description}</h2>
            <h2 className="details__neighbourhood">Neighbourhood: {geo_local_area}</h2>
            <h2 className="details__address">Address: {address}</h2>
            <h2 className="details__ownership">Ownership: {ownership}</h2>
            <h2 className="details__installation-year">Installation Year: {installation_year}</h2>
            <h2 className="details__site-name">Site Name: {site_name}</h2>
            <h2 className="details__status">Status: {status}</h2>
            <a className="details__link" href={url}><h2>--- City of Vancouver URL ---</h2></a>
            <h2 className="details__disclaimer">Disclaimer: where data is available</h2>
          </div>
        </div>
        
        
        
        <BottomNav />
      </section>
    );
  }
}

export default Details;








