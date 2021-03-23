import React from 'react'
import { Link } from 'react-router-dom'


export default function ArtWorks(props) {
  return (
    <ul className="art-work__constainer" key={props.id}>
      {console.log(props.id)}
      <Link to={`/details/${props.id}`}>
        <li className="art-work__li">
          <h1 className="art-work__title">{props.title}</h1>  
          <h2 className="art-work__artists-names">{props.artists_names}</h2>
          <img className="art-work__photo" src={props.photo_url} alt="artwork"></img>
          <h4 className="art-work__photo-credits">{props.photo_credits}</h4>
          <h4 className="art-work__neighbourhood">{props.neighbourhood}</h4>
          <h4 className="art-work__type">{props.type}</h4>
          <h4 className="art-work__artist-statement">{props.artist_statement}</h4>
        </li>
      </Link>
    </ul>
  )
}


// Drop down? 
{/* <div className="l-itemDetails__column-left-space">
  <h2 className="l-itemDetails__sub-label">STATUS:</h2>
    {this.state.status === "In Stock" ? (
      <span className="l-itemDetails__status">IN STOCK</span>
    ) : (
      <span className="l-itemDetails__status l-itemDetails__status--red">
        OUT OF STOCK
      </span>
    )}
</div> */}
                
