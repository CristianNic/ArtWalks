import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { neighbourhoods } from '../utils';

// import data from '../../data_temp/art_work_final_geom.json';

const apiUrl = 'http://localhost:8090/art_works'
      
export default class Search extends Component {

  state = {
    art_works: [],
    // art_works: this.props,
    value: '',
    mixed_search: '',
    TitleArtistMedium: '',
  }

  componentDidMount() {
    this.getArtWorks();
    // this.uniqNeighourhoods();
    // this.New();
    //this.searchTitleArtistMedium()
    console.log('Search Component', this.state.art_works)
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
      .catch(function (error) {
        // console.log('error:', error.response.data);
      })
  }

  //searchTitleArtistMedium = (event) => {
    //console.log(event.target.value)

    //const temp = 'sculpture'
    // const filteredData = this.state.art_works.filter(() => {
    //   this.setState({ TitleArtistMedium: filteredData });
    //   if (
    //     this.state.artWorks.title === event.target.value ||
    //     this.state.artWorks.artists_names === event.target.value ||
    //     this.state.artWorks.type === event.target.value || 
    //    ) {
    //     this.setState({ TitleArtistMedium: filteredData });
    //    }

    //   } else {
    //     this.setState({ TitleArtistMedium: 'No Sculpture' })
    //   }
    // }
      
    // const filteredData2 = this.state.art_works.filter((item) => {
    //   return item.title === event.target.value ||
    //     item.artists === event.target.value ||
    //     item.type === event.target.value;
    // }



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
  // }
  // searchTitleArtistMedium = (event) => {
  // //console.log(event.target.value)      
  //   const test = this.state.art_works.filter(function (item) {
  //     return  item.title === event.target.value ||
  //             item.artists === event.target.value ||
  //             item.type === event.target.value;
  //     }));
  // }
      // if it's there then set it in state ... if it's not then ... print no match found 

    
    
    

  render() {
    // const handleSearchSubmit = (event) => {
    // 	event.preventDefault();
    // 	event.target.reset();
    // };
  //  { console.log('Search Component', this.state.art_works) }
    return (
      <section className="search">
        {/* <div> */}
          <div>
            <select onChange={this.props.handleSelectLocation} name="neighbourhood" id="neighbourhood-select">
              <option value="">Neighbourhood</option>
              {/* {this.state.art_works.map(titles =>
                <option value={this.props.neighbourhood}>{titles.neighbourhood}</option>)}
                <option value={filteredArray.neighbourhood}>{filteredArray.neighbourhood}</option>)} */}
              {neighbourhoods.map((area, i) =>
                <option value={area} key={i}>{area}</option>
              )}
              
            </select>
          </div>
          {/* <div>
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
          </div> */}
          {/* <div>
            <button>visited</button>
          </div>
          <div>
            <button>Liked</button>
          </div> */}
        {/* </div>
        <div> */}
          <div>
            <input type="text"
              //onChange={(e) => this.setState({ searchTitleArtistMedium: e.target.value })}
              onChange={this.state.searchTitleArtistMedium}
              placeholder="Title, Artist or Medium"></input>
            <p>{this.state.searchTitleArtistMedium}</p>
          </div>
          {/* <div>
            <input type="text" onChange={(e) => this.setState({ value: e.target.value })} placeholder="Test =)"></input>
            <p>{this.state.value}</p>
          </div> */}
          <Link className="art-work__link" to={`/map`}>
          {/* <Link className="art-work__link" to={`/art_works/${this.props.id}`}> */}
            <button> Layers </button>
          </Link>

        {/* </div>  */}
      </section>
    )
  }
}
        
        
        
        
        
        
  