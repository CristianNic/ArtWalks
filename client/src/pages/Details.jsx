import { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import BottomNav from '../components/BottomNav/BottomNav';
import { API_URL } from '../components/Utils/Utils';
import iconMap from '../assets/icons-feather-1.5px/map.svg';
import heartRed from '../assets/icons/heart_red.svg';
import heartBlack from '../assets/icons/heart-black-2px.svg';

class Details extends Component {

  state = {
    artWork: [],
    artWorkInFavourites: true,
    userID: parseInt(localStorage.getItem('userID')),
    userFavourites: [],
    artistStatement: [],
    workDescription: [],
    siteName: []
  }
  
  componentDidMount() {
    this.getArtWorkDetails()
    this.setArtWorIdInLocalStorage()
    this.getUserFavourites()
    // this.setOpenPopUp()
  }
      
  componentDidUpdate(prevProps) {
    this.setOpenPopUp()
  }
      
  getArtWorkDetails() {
    axios
      .get(`${API_URL}/art_works/registry_id/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          artWork: response.data,
          artistStatement: this.replaceUnknownChar(response.data.artist_statement),
          workDescription: this.replaceUnknownChar(response.data.work_description),
          siteName: this.replaceUnknownChar(response.data.site_name)
      })
    })
    .catch((error) => {
    console.log('error:', error.response.data);
    })
  }

  setArtWorIdInLocalStorage() {
    // console.log(this.state.artWork.registry_id)
    localStorage.setItem('currently viewing', this.state.artWork.registry_id)
    // localStorage.setItem("openPopUp", art_work_id);
  }
  
  setOpenPopUp() {
    // for going back to the map - Details sends back Art_work_registry ID ... while PopUp Wants art_work_Id
    // localStorage.setItem("openPopUp", this.state.artWork.id)
    // console.log("openPopUp - registry_id", this.state.artWork.registry_id)
    console.log("openPopUp - registry_id --> ", this.state.artWork.registry_id)
    localStorage.setItem("openPopUp", this.state.artWork.registry_id)
  }

  getUserFavourites() {
    // art_work_id is set by the MySQL database, while registry_id is from the City of Vancouver dataset (req. for matching artist info)
    // userFavourites sets all details on favourite art_works and userFavouritesByRegistryId extracts the matching registry_id's
    axios
      .get(`${API_URL}/favourites/${this.state.userID}`)
      .then((response) => {
        console.log("Response Favourites", response.data)
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
        // console.log("ARRRR", result) // <------ Do I need the above? 

        // if the current details page art work in the user's favourites, 
        // then set a red heart on load  // could use registry_id or ${this.props.match.params.id}
        const currentArtWork = this.state.artWork.registry_id
        const userFavouritesByRegistryId = result.map(artWorks => artWorks.art_works.registry_id)
        const isInFaves = userFavouritesByRegistryId.includes(currentArtWork)
        this.setState({
          userFavourites: result, // response.data
          artWorkInFavourites: isInFaves
        })
        console.log("API Response - Faves", result)
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })
  }

  removeFromFavourites = () => {
    axios
      .delete(`${API_URL}/favourites/${this.state.userID}/remove/${this.state.artWork.id}`)
      .then((response) => {
        this.setState({
          artWorkInFavourites: false
        })
      })
      .catch((error) => {
      console.log('error:', error.response.data);
    })
  }

  addToFavourites = () => {
    console.log("Add to Favourites ID -->", this.state.artWork)
    // const filteredData = this.state.art_works.filter(item =>
    //   item.registry_id === registry_id);
    // const art_work_id = filteredData[0].id
    // console.log("art_work_id ", art_work_id)
    axios
      .post(`${API_URL}/favourites/${this.state.userID}/${this.state.artWork.id}`)
      .then((response) => {
        this.setState({
          artWorkInFavourites: true
        })
      })
      .catch((error) => {
      console.log('error:', error.response.data);
      })
  }

  replaceUnknownChar = (text) => {
    return text.replace(/\uFFFD/g, '')
  }
    
  render() {

    console.log("Add to Favourites ID ART WORDKM  -->", this.state.artWork)
    console.log("Add to Favourites ID BFJDABFHWFHDW-->", this.state.artWork.id)
    console.log("User ID-->", this.state.userID)

    const { registry_id, title, artists_names, work_description, photo_url, photo_credits,
      type, primary_material, artist_statement, neighbourhood, installation_year,
      address, ownership, site_name, status, url} = this.state.artWork

    return (
      <section className="details">
        <div className="details__card">
          <img className="details__img" src={photo_url} alt={title} />
          <div className="details__top">
            <div className="details__top-info">
              <h1 className="details__title">{title}</h1>
              {artists_names === "" ?
                (<h2 className="faves__artist">Artist(s) currently unavailable</h2>)
              : (<h2 className="faves__artist">by {artists_names}</h2>)}
            </div>
            <div className="details__top-links">
              {this.state.artWorkInFavourites === true ? (
                <img className="details__top-links_icon" src={heartRed} alt="red heart icon" 
                  onClick={(e) => {this.removeFromFavourites()}}>
                </img>
              ) : (
                <img className="details__top-links_icon" src={heartBlack} alt="black heart icon"
                  onClick={(e) => {this.addToFavourites()}}>
                </img>     
              )}
              <Link to={`/map/${registry_id}`}>
                <img className="details__top-links_icon" src={iconMap} alt="map icon"></img>
              </Link>
            </div>
          </div>
          <div className="details__line"></div>
          <div className="details__bottom">
            {photo_credits === "" ? (<div></div>) :
              (<h2><span className="bold">Photo Credits:</span> {photo_credits}</h2>)}
            { type === "" ? (<div></div>)
            : type === "Memorial_or_Monument" ?     (<h2><span className="bold">Type:</span> Memorial or Monument</h2>)
            : type === "Two_dimensional_artwork" ?  (<h2><span className="bold">Type:</span> 2D Artwork</h2>)
            : type === "Welcome_figure" ?           (<h2><span className="bold">Type:</span> Welcome figure</h2>)
            : type === "Totem_pole" ?               (<h2><span className="bold">Type:</span> Totem Pole</h2>)
            : type === "Site_integrated_work" ?     (<h2><span className="bold">Type:</span> Site integrated work</h2>)
            :                                       (<h2><span className="bold">Type:</span> {type}</h2>)}
            {primary_material === "" ? (<div></div>) :
              (<h2><span className="bold">Primary Material:</span> {primary_material}</h2>)}
            {artist_statement === "" ? (<div></div>) :
              (<h2><span className="bold">Artist Statement:</span> {this.state.artistStatement}</h2>)}
            {work_description === "" ? (<div></div>) :
              (<h2><span className="bold">Work Description:</span> {this.state.workDescription}</h2>)}
            {neighbourhood === "" ? (<div></div>) :
              (<h2><span className="bold">Neighbourhood:</span> {neighbourhood}</h2>)}
            {address === "" ? (<div></div>) :
              (<h2><span className="bold">Address:</span> {address}</h2>)}
            {ownership === "" ? (<div></div>) :
              (<h2><span className="bold">Ownership:</span> {ownership}</h2>)}
            {installation_year === "" ? (<div></div>) :
              (<h2><span className="bold">Installation Year:</span> {installation_year}</h2>)}
            {site_name === "" ? (<div></div>) :
              (<h2><span className="bold">Site Name:</span> {this.state.siteName}</h2>)}
            {status === "" ? (<div></div>) :
              (<h2><span className="bold">Status:</span> {status}</h2>)}
            <a href={url}><h2><span className="bold">Find out more:</span> <span className="underline"> City of Vancouver</span></h2></a>
          </div>
        </div>
        <BottomNav />
      </section>
    );
  }
}

export default Details;