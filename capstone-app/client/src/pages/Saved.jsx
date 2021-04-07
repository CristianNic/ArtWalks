// import React from 'react';
import axios from 'axios';
import { Component } from 'react';
import BottomNav from '../components/BottomNav/BottomNav';
import Search from '../components/Search/Search';
import ArtWorks from '../components/ArtWorks/ArtWorks'; 
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Saved extends Component {

  state = {
    // favourties: [] // and parse later?
    id: {},
    art_works: [],
    visted: {},
    geom: {}
  }

  // look explore page 
  // store in all works in state -- then filter by user  
  componentDidMount() {
    this.getArtWorks()
  }

  getArtWorks() {
    axios
      .get(`http://localhost:8090/favourites/1`) // get favs by /:user_id
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
    return (
      <section className="favourites">
        <Search
          art_works2={this.state.art_works}/>
        <div className="exp__container">
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

export default Saved;