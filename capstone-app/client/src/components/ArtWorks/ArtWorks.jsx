import React from 'react'
import { Link } from 'react-router-dom'
import { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import heart_red from "../../assets/icons/heart_red.svg";
import heart_white from "../../assets/icons/heart_white.svg";
// console.log('props.match.params.id: ', props.match.params.id)

export class ArtWorks extends Component {

  state = {
    liked: true,
  }
  render() {
    return (
      <ul className="art-work__constainer" key={props.id}>
        <Link to={`/art_works/${props.id}`}>
          <li className="art-work__li-card">
            <h1 className="art-work__title">{props.title}</h1>
            <h2 className="art-work__artists-names">{props.artists_names}</h2>
            {/*//--------- Liked & Seen ------------ */}
            {this.state.liked === true ? (
              <img src={heart_red} className="art-work__icon"></img>
            ) : (
              <img src={heart_white} className="art-work__icon"></img>
            )}
            <img src={heart_red} className="art-work__icon"></img>
            <img src={heart_white} className="art-work__icon"></img>

            {/* <div className="art-work__photo-container"> */}
            {/* <LazyLoad height={300} offsetVertical={300}> */}
            <LazyLoad className="art-work__photo-container" offsetVertical={3000}>
              <img className="art-work__photo" src={props.photo_url} alt="artwork"></img>
            </LazyLoad>
            {/* </div> */}
            <h4 className="art-work__photo-credits">{props.photo_credits}</h4>
            <h4 className="art-work__neighbourhood">{props.neighbourhood}</h4>
            <h4 className="art-work__type">{props.type}</h4>
            <h4 className="art-work__artist-statement">{props.artist_statement}</h4>
          </li>
        </Link>
      </ul>
    )
  }
}

export default ArtWorks;

//                     {this.state.status === "In Stock" ? (
//                       <span className="l-itemDetails__status">IN STOCK</span>
//                     ) : (
//                       <span className="l-itemDetails__status l-itemDetails__status--red">
//                         OUT OF STOCK
//                       </span>
// )
// }
                    

// Drop down? 
/* <div className="l-itemDetails__column-left-space">
  <h2 className="l-itemDetails__sub-label">STATUS:</h2>
    {this.state.status === "In Stock" ? (
      <span className="l-itemDetails__status">IN STOCK</span>
    ) : (
      <span className="l-itemDetails__status l-itemDetails__status--red">
        OUT OF STOCK
      </span>
    )}
</div> */
                
