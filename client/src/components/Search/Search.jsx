import React, { Component } from 'react'
import axios from 'axios';
import { neighbourhoods, API_URL } from '../Utils/Utils';
import redHeart from '../../assets/icons/heart_red.svg';

export default class Search extends Component {

  state = {
    art_works: [],
    value: '',
    mixed_search: '',
    TitleArtistMedium: '',
    userFavourites: [],
    userFavouritesByRegistryId:[],
  }

  componentDidMount() {
    this.getArtWorks()
    // this.setState({ userFavourites: this.props.userFavourites })
    this.getUserFavourites() 
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
      })
      .catch((error) => {
      console.log('error:', error.response.data);
    })
  }

  getArtWorks() {
    axios
      .get(`${API_URL}/art_works`)
      .then((response) => {
        this.setState({
          art_works: response.data.art_works,
        })
      })
      .catch(function (error) {
        console.log('error:', error.response.data);
      })
  }

  render() {
    
    // console.log('this.state.userFavouritesByRegistryId -->', this.userFavourites)
    // console.log('this.state.userFavouritesByRegistryId -->', this.userFavouritesByRegistryId)

    return (
      <section className="search">
        <div className="search__divider"></div>
        <div className="search__select-div">
          <select className="search__select" onChange={this.props.selectNeighbourhood} name="neighbourhood" id="neighbourhood-select">
            <option className="search__select-items" value="">Neighbourhood</option>
              <option className="search__select-items" value="Vancouver">All of Vancouver</option>
                {neighbourhoods.map((area, i) =>
                  <option className="search__select-items" value={area} key={i}>{area}</option>
                )}
          </select>
        </div>
        <div className="search__divider"></div>
        <div className="search__btn-container">
          <img onClick={() => this.props.selectFavourties()} className="search__icon" src={redHeart}/>
        </div>
      </section>
    )
  }
}
        
        
        
        
        
        
  