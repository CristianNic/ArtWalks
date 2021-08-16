import React from 'react'
import { Link } from 'react-router-dom'
import { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import heart_red from "../../assets/icons/heart_red.svg";
import heart_white from "../../assets/icons/heart_white.svg";

export class SavedItems extends Component {

  state = {
    liked: false,    // if item 1 from props.liked = props.id 
    visted: 0,
  };

render() {
    return (
      <article className="art-work__container" key={this.props.id}> 
        <Link className="art-work__link" to={`/art_works/${this.props.id}`}>
          <div className="art-work__li-card">
            <div className="art-work__li-card__top">
              <div className="art-work__li-card__left">
                <h1 className="art-work__title">{this.props.title}</h1>
                <h3 className="art-work__artists-names">{this.props.artists_names}</h3>
              </div>
              {/*//--------- Liked & Seen ------------ */}
              <div className="art-work__li-card__right">
                {this.state.liked === true ? (
                  <img src={heart_red} className="art-work__icon" alt="Favourited"></img> // callback - post req.
                  ) : (
                  <img src={heart_white} className="art-work__icon" onClick={this.props.postFavourite} alt="add to favourites"></img> 
                )}
                </div>
              </div>
            {/* <div className="art-work__photo-container"> */}
            {/* <LazyLoad height={300} offsetVertical={300}> */}
            {/* <LazyLoad className="art-work__photo-container" offsetVertical={2000}> */}
            <LazyLoad className="art-work__photo-container" offsetVertical={700} overflow={true} >
            {/* <LazyLoad className="art-work__photo-container" offsetVertical={700}> */}
              <img className="art-work__photo" src={this.props.photo_url} alt="artwork"></img>
            </LazyLoad>
            <h4 className="art-work__neighbourhood">{this.props.neighbourhood}</h4>
            <h4 className="art-work__type">{this.props.type}</h4>
            <h4 className="art-work__artist-statement">{this.props.artist_statement}</h4>
          </div>
        </Link>
      </article>
    )
  }
}

export default SavedItems;
