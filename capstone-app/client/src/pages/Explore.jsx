import axios from 'axios';
import { Component } from 'react';
// import { BrowserRouter as Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav/BottomNav';
import ArtWorks from '../components/ArtWorks/ArtWorks';     /// was version 2 
import Search from '../components/Search/Search';
// import SearchBar from '../components/SearchBar/SearchBar';

const apiUrl = 'http://localhost:8090/art_works'
const apiUrlUser = 'http://localhost:8090/favourites/1'

// User can Search by: 
// title, artist, [x]neighbourhood, [x]type, artist_statement-keywords (5 things)  
// -->  any empty fields, either not included or returned last.

class Browse extends Component {

  state = {
    art_works: [], // 400 display all  
    liked: [],
    visited: [],     // 3 make red  ID and Art ID for 1 user [ID, ART ID, User]
    // if liked ID = art_work ID do something 
  }

  componentDidMount() {
    this.getArtWorks(); 
    this.getUserFavouritesAndVisted()
    //this.postFavourite()  // [7, 9, 10]
    //this.postLiked()  //
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
  getUserFavouritesAndVisted() {
    axios
      .get(apiUrlUser)
      .then((response) => {
        //console.log('response.data_USER:', response.data)
        //console.log('response.data.art_works:', response.data.art_works)
        this.setState({
          liked: response.data,
          visited: response.data,
        })
      })
      .catch(function(error) {
        // console.log('error:', error.response.data);
      })
  }
  // postFavourite() {
  //   axios
  //     .post(apiUrlUser)
  //     .then((response) => {
  //      // console.log("POST response", response);
  //     })
  //     .catch((error) => console.log(error));
  // }
  // putLiked () {
  //   axios
  //     .put(apiUrlUser)
  //     .then((response) => {
  //       //console.log("PUT response", response);
  //     })
  //     .catch((error) => console.log(error));
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('art work updated');
  //   if (
  //     this.props.match.params.id !== undefined &&
  //       prevState.productDetails.id !== this.props.match.params.id
  //   ) {
  //     this.getProductDetailsData(this.props.match.params.id);
  //   }
  // }
  
  render() {
    
    // console.log('Explore.jsx this.state:', this.state)
    // ==== handle Submit ==== 
    // const handleSearchSubmit = (event) => {
		// 	event.preventDefault();
		// 	event.target.reset();
    // };
    
    return (
      <section className="exp">
        <Search />
        <div clasName="exp__container">
        {this.state.art_works.map(art => 
          <ArtWorks             
            id={art.id}
            title={art.title}
            artists_names={art.artists_names}
            photo_url={art.photo_url}
            //photo_credits={art.photo_credits}
            neighbourhood={art.neighbourhood}
            type={art.type}
            artist_statement={art.artist_statement}
            liked={this.state.liked} // {this.state.liked} [7, 8, 9]
            visited={this.state.visited}
            // postFavourite={postFavourite}
            // putLiked={putLiked}
          />
          )}
        </div>
        <BottomNav />
      </section>
    );
  }
}

export default Browse;