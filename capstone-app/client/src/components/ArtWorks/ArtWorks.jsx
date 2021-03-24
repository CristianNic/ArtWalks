import React from 'react'
import { Link } from 'react-router-dom'
import { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import heart_red from "../../assets/icons/heart_red.svg";
import heart_white from "../../assets/icons/heart_white.svg";
// console.log('props.match.params.id: ', props.match.params.id)

export class ArtWorks extends Component {

  state = {
    liked: false,    // if item 1 from props.liked = props.id 
  }
  // componentDidMount
  // looked through id
  
    // .map ? .forEach ? for loop(var = 0, , ++
  componentDidMount() {
    const likedArr = props.liked
    likedArr.forEach(element => {
      if (element.art_work_id === props.id) {
        this.setState({ liked: true })
      }
    });
  }

  // for each item in [] 
  // if item = item from the other []
  // then state liked = true
  // otherwise state liked = false 

  // console.log('Test:', props)
  
  render() {
    // console(props.liked)
    // if item 1 from props.liked = props.id 

    return (
      <article className="art-work__container" key={props.id}>
        <Link className="art-work__link" to={`/art_works/${props.id}`}>
          {console.log('Test:', props)}
          <div className="art-work__li-card">
            <div className="art-work__li-card__top">
              <div className="art-work__li-card__left">
                <h1 className="art-work__title">{props.title}</h1>
                <h3 className="art-work__artists-names">{props.artists_names}</h3>
              </div>
              {/*//--------- Liked & Seen ------------ */}
              <div className="art-work__li-card__right">
              {this.state.liked === true ? (
                <img src={heart_red} className="art-work__icon"></img> // callback - post req.
              ) : (
                  <img src={heart_white} className="art-work__icon" onClick={this.parentPropnameFunction}></img>
              )}
            </div>
            </div>
            {/* <img src={heart_red} className="art-work__icon"></img>
            <img src={heart_white} className="art-work__icon"></img> */}

            {/* <div className="art-work__photo-container"> */}
            {/* <LazyLoad height={300} offsetVertical={300}> */}
            <LazyLoad className="art-work__photo-container" offsetVertical={100}>
              <img className="art-work__photo" src={props.photo_url} alt="artwork"></img>
            </LazyLoad>
            {/* </div> */}
            <h4 className="art-work__photo-credits">{props.photo_credits}</h4>
            <h4 className="art-work__neighbourhood">{props.neighbourhood}</h4>
            <h4 className="art-work__type">{props.type}</h4>
            <h4 className="art-work__artist-statement">{props.artist_statement}</h4>
          </div>
        </Link>
      </article>
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
                
