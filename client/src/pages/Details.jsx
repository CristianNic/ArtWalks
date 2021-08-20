import { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import BottomNav from '../components/BottomNav/BottomNav';
import { API_URL } from '../components/Utils/Utils';
import iconMap from '../assets/icons-feather-1.5px/map.svg';


class Details extends Component {

  // state = {
  //   art_work: {},
  // }
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
          <div className="details__top">
            <div className="details__top-info">
              <h1 className="details__title">{title}</h1>
              <h2 className="details__artists-names">by {artists_names}</h2>
            </div>
            <div className="details__top-links">
              <Link to={`/map/${registry_id}`}>
                <img className="favourites__links-map-icon" src={iconMap} alt="map icon"></img>
              </Link>
            </div>
          </div>
          <div className="details__line"></div>
          <div className="details__bottom">
            {photo_credits === "" ? (<div></div>) :
              (<h2><span className="bold">Photo Credits:</span> {photo_credits}</h2>)}
            {type === "" ? (<div></div>) :
              (<h2><span className="bold">Type:</span> {type}</h2>)}
            {primary_material === "" ? (<div></div>) :
              (<h2><span className="bold">Primary Material:</span> {primary_material}</h2>)}
            {artist_statement === "" ? (<div></div>) :
              (<h2><span className="bold">Artist Statement:</span> {artist_statement}</h2>)}
            {work_description === "" ? (<div></div>) :
              (<h2><span className="bold">Work Description:</span> {work_description}</h2>)}
            {geo_local_area === "" ? (<div></div>) :
              (<h2><span className="bold">Neighbourhood:</span> {geo_local_area}</h2>)}
            {address === "" ? (<div></div>) :
              (<h2><span className="bold">Address:</span> {address}</h2>)}
            {ownership === "" ? (<div></div>) :
              (<h2><span className="bold">Ownership:</span> {ownership}</h2>)}
            {installation_year === "" ? (<div></div>) :
              (<h2><span className="bold">Installation Year:</span> {installation_year}</h2>)}
            {site_name === "" ? (<div></div>) :
              (<h2><span className="bold">Site Name:</span> {site_name}</h2>)}
            {status === "" ? (<div></div>) :
              (<h2><span className="bold">Status:</span> {status}</h2>)}
            <a href={url}><h2><span className="bold">Link:</span> <span className="underline"> City of Vancouver</span></h2></a>
          </div>
        </div>
        <BottomNav />
      </section>
    );
  }
}

export default Details;