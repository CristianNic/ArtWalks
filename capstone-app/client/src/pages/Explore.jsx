import axios from 'axios';
import { Component } from 'react';
// import { BrowserRouter as Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav/BottomNav';
import ArtWorks from '../components/ArtWorks/ArtWorks2';
import Search from '../components/Search/Search';



// ================== Cache ================== 
// import { setupCache } from 'axios-cache-adapter'
// // Create `axios-cache-adapter` instance
// const cache = setupCache({
//   maxAge: 15 * 60 * 1000
// })
// // Create `axios` instance passing the newly created `cache.adapter`
// const api = axios.create({
//   adapter: cache.adapter
// })
// ================== Cache ================== 

const apiUrl = 'http://localhost:8090/art_works'

// User can Search by: 
// title, artist, [x]neighbourhood, [x]type, artist_statement-keywords (5 things)  // -->  any empty fields, either not included or returned last.

class Browse extends Component {

// initial state? On loading page Displays All Entries
  // state = {
  //   // id: '',
  //   // title: '',
  //   // artists_names: '',
  //   // photo_url: '',
  //   // neighbourhood: '',
  //   // type: '',
  //   // artist_statement: '',
  //   id: [],
  //   title: [],
  //   artists_names: [],
  //   photo_url: [],
  //   neighbourhood: [],
  //   type: [],
  //   artist_statement: [],
  // }

  state = {
    art_works: [],
    liked: [], 
  }

  componentDidMount() {
    this.getArtWorks(); 
    // this.getUserFavourites()
    // this.getUserLikes()
  }

  // getArtWorks() {
  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       console.log('response.data:', response.data.art_works)
  //       response.data.art_works.map((artWorks) => {
  //         this.setState({
  //           id: artWorks.id,
  //           title: artWorks.title,
  //           artists_names: artWorks.artists_names,
  //           photo_url: artWorks.photo_url,
  //           neighbourhood: artWorks.neighbourhood,
  //           type: artWorks.type,
  //           artist_statement: artWorks.artist_statement,
  //         })
  //       })
  //     })
  //     .catch(function(error) {
  //       console.log('error:', error.response.data);
  //     })
  // }
  // ======================= Works ========================  
  getArtWorks() {
    axios
      .get(apiUrl)
      .then((response) => {
        // console.log('response.data:', response.data)
        console.log('response.data.art_works:', response.data.art_works)
        this.setState({
          art_works: response.data.art_works,
        })
      })
      .catch(function(error) {
        // console.log('error:', error.response.data);
      })
  }

// ========================= Cache ========================= 
// * When returning back to the page it needs to pull data from the cache.
// getArtWorks() {
//   // axios
//     api(apiUrl)
//     .then(async (response) => {
//       // console.log('response.data:', response.data)
//       // console.log('response.data.art_works:', response.data.art_works)
//       // this.setState({
//       //   art_works: response.data.art_works,
//       // })
//       // Interacting with the store, see `localForage` API.
//       this.setState({
//         art_works: response.data.art_works,
//       })
//       const length = await api.cache.length()
//       console.log('Cache store length:', length)
//     })
//     .catch(function(error) {
//       // console.log('error:', error.response.data);
//     })
// }
// ========================= Cache ========================= 

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
    
    const handleSearchSubmit = (e) => {
			e.preventDefault();
			e.target.reset();
    };
    console.log('this.state.art_works', this.state.art_works)

    console.log('this.state.art_works', this.state.art_works.id)
    
    return (
      <section className="exp">
        <Search />
        {/* <h1 className="exp__search">Search</h1>
        <form action="submit" onSubmit={handleSearchSubmit}>
          <input type="text" placeholder="Explore local art..." autoFocus />
          <button>Search</button>
          <hr/>
        </form> */}

        {/* <ul>
          <li>
            <h1 className="exp__title">{this.state.title}</h1>  
            <h2 className="exp__artists-names">{this.state.artists_names}</h2>
            <img className="exp__photo" src={this.state.photo_url} alt="artwork"></img>
            <h4 className="exp__photo-credits">{this.photo_credits}</h4>
            <h4 className="exp__neighbourhood">{this.neighbourhood}</h4>
            <h4 className="exp__type">{this.type}</h4>
            <h4 className="exp__artist-statement">{this.artist_statement}</h4>
          </li>
        </ul> */}

       {/* Map this entire list */}

        {this.state.art_works.map(art => 
          <ArtWorks 
        //   // key={art.art_works.id}
        //   // title={art.art_works.title}
        //   // artists_names={art.art_works.artists_names}
        //   // photo_url={art.art_works.photo_url}
        //   // photo_credits={art.art_works.photo_credits}
        //   // neighbourhood={art.art_works.neighbourhood}
        //   // type={art.art_works.type}
        //   // artist_statement={art.art_works.artist_statement}
            
            id={art.id}
            title={art.title}
            artists_names={art.artists_names}
            photo_url={art.photo_url}
            photo_credits={art.photo_credits}
            neighbourhood={art.neighbourhood}
            type={art.type}
            artist_statement={art.artist_statement}
        //  liked={}
          />
          //<ArtWorks {…art} />
          )} 


        {/* {this.state.map((item) => (
          <li key={item.id}>
            <Link to={`/details/${item.id}`}> 
              <h1>{this.state.title}</h1>
            </Link>
          </li>
                    
        ))} */}
        
        {/* {this.state.reviews.map(reviews => 
            <Reviews 
            reviews={reviews}
            key={reviews.id}
            name={reviews.name}
            comment={reviews.comment}
            timestamp={reviews.timestamp}
            />
        )} */}
        
        <BottomNav />
      </section>
    );
  }
}

export default Browse;