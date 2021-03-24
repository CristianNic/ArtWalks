import React, { Component } from 'react'
import axios from 'axios';
const apiUrl = 'http://localhost:8090/art_works'

const areas = [
  'Downtown', 'Mount Pleasant', 'Downtown Eastside', 'West End', 'Strathcona',
  'Shaughnessy', 'Stanley Park', 'Grandview-Woodland', 'Kensington-Cedar Cottage',
  'Kitsilano', 'Fairview', 'Marpole', 'RileyPark', 'Oakridge', 'Renfrew Collingwood',
  'Sunset', 'Hastings-Sunrise', 'Killarney', 'South Cambie', 'Arbutus Ridge',
  'Dunbar-Southlands', 'West Point Grey', 'Kerrisdale' ]
                
export default class Search extends Component {

  state = {
    // art_works: [],
    art_works: this.props,
  }

  componentDidMount() {
   // this.getArtWorks();
   // this.uniqNeighourhoods();
    // this.New();
  }

  uniqNeighourhoods() {
    // const test = this.state.art_works
    // console.log('Search State: ', this.state.art_works)
    // const uniqueNeighbourhoods = [...new Set(test.map(item => item.art_works.neighbourhood))]
    // console.log('uniqueNeighbourhoods', uniqueNeighbourhoods)

    // const New = this.state.art_works
   //  New
    // yourArrayName.filter((item, index) => yourArrayName.indexOf(item) === index)

  }
  // New() {
  //   const stateArray = this.state.art_works
  //   const Hello = stateArray.filter((item, index) => stateArray.indexOf(stateArray) === index)
  //   console.log('stateArray: ', stateArray)
  //   console.log('stateArray: ', Hello)
  // }

New() {
  // let filteredArray = this.state.art_works.filter((item, index) => this.state.art_works.indexOf(item) === index)
  // console.log('filteredArray: ', filteredArray)
  // console.log('this.props: ', this.props)

  // console.log('this.props: ', this.state.art_works)
  // let filteredArray = this.props.art_works2.filter((item, index) => this.props.art_works2.indexOf(item) === index)

  // let filteredArray = this.props.art_works.filter((item, index) => this.props.art_works.indexOf(item) === index)
  // console.log('filteredArray: ', filteredArray)
  }

  getArtWorks() {
    axios
      .get(apiUrl)
      // .get(`${url}`)
      .then((response) => {
        // console.log('response.data:', response.data)
        //console.log('response.data.art_works:', response.data.art_works)
        this.setState({
          art_works: response.data.art_works,
        })
      })
      .catch(function(error) {
        // console.log('error:', error.response.data);
      })
  }


  render() {
    // const handleSearchSubmit = (event) => {
		// 	event.preventDefault();
		// 	event.target.reset();
    // };

    return (
      <section className="search">
        <div>
          <select onChange={this.props.handleSelectLocation} name="pets" id="pet-select">
            <option value="">Neighbourhood</option>
            
            {/* {this.state.art_works.map(titles =>
              <option value={this.props.neighbourhood}>{titles.neighbourhood}</option>)}
              <option value={filteredArray.neighbourhood}>{filteredArray.neighbourhood}</option>)} */}
            
            {areas.map(area =>
              <option value={area}>{area}</option>)}

          </select>
        </div>
        
        <div>
          <select name="search__form-neighbourhood" id="pet-select">
            <option value="">Artist</option>

            <option value="dog">Dog</option>

      
          </select>
        </div>
        <div>
          <select name="search__form-neighbourhood" id="pet-select">
            <option value="">Medium</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <div>
          <button>visited</button>
        </div>
        <div>
          <button>Liked</button>
        </div>
      </section>
    )
  }
}
        
        
        
        
        
        
  