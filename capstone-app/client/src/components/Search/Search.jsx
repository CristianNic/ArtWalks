import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { neighbourhoods, API_URL } from '../Utils/Utils';
import redHeart from '../../assets/icons/heart_red.svg';

// ---------- Icons ----------- // 
import icon1 from '../../assets/icons/heart_red.svg';
import icon2 from '../../assets/icons/heart-black-2px.svg';
import icon3 from '../../assets/icons/heart-light-gray-1-2px.svg';
import icon4 from '../../assets/icons/heart-light-gray-1-2px-filled.svg';
import icon5 from '../../assets/icons/maximize-2-1.5px.svg';
import icon6 from '../../assets/icons/github-red-2px.svg';
import icon7  from '../../assets/icons/github-black-2px.svg';
// ----------- Icons -----------  // 


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

        {/* https://www.w3schools.com/howto/howto_custom_select.asp */}

          <div>
            <select onChange={this.props.selectNeighbourhood} name="neighbourhood" id="neighbourhood-select">
            <option value="">Select a neighbourhood</option>
                <option value="Vancouver">All of Vancouver</option>
              {neighbourhoods.map((area, i) =>
                <option value={area} key={i}>{area}</option>
              )}
            </select>
          </div>
          <div>
            <input className="search-input" type="text"
              //onChange={(e) => this.setState({ searchTitleArtistMedium: e.target.value })}
              onChange={this.state.searchTitleArtistMedium}
              placeholder="Search: Title, Artist or Medium"></input>
            <p>{this.state.searchTitleArtistMedium}</p>
          </div>
          {/* <div>
            <input type="text" onChange={(e) => this.setState({ value: e.target.value })} placeholder="Test =)"></input>
            <p>{this.state.value}</p>
          </div> */}
        

        {/* <select className="medium" name="medium" id="neighbourhood-select">
            <option value="">Medium</option>
              <option value="Vancouver">
                <svg className="search-icon" src={icon1}/>
              </option>
              <option value="Vancouver">
                <img className="search-icon" src={icon2}></img>
              </option>
              <option value="Vancouver">
                <img className="search-icon" src={icon3}></img>
              </option>
        </select>
         */}
        {/* <div class="dropdown">  
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">  
                Dropdown button  
            </button>  
            <div class="dropdown-menu">  
                <a class="dropdown-item" href="#"> <i class="fa fa-home"></i> Home </a>  
                <a class="dropdown-item" href="#"> <i class="fa fa-address-book"></i> Contact </a>  
                <a class="dropdown-item" href="#"> <i class="fa fa-bell"></i> Notifications </a>  
                <a class="dropdown-item" href="#"><i class="fa fa-cog"></i> Setting </a>  
            </div>  
        </div>   */}


        {/* // ----  Favourites Icon ---- //          */}

        {/* <img onClick={this.props.selectFavourties} className="search-icon" src={redHeart}/> */}
        <img onClick={() => this.props.selectFavourties()} className="search-icon" src={redHeart}/>

      </section>
    )
  }
}
        
        
        
        
        
        
  