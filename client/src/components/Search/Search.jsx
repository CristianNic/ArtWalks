import React, { Component } from 'react'
import redHeart from '../../assets/icons/heart_red.svg';

export default class Search extends Component {

  render() {

    return (
      <section className="search">
        <div className="search__divider"></div>
        <div className="search__select-div">
          <select className="search__select" onChange={this.props.selectNeighbourhood} name="neighbourhood" id="neighbourhood-select">
            <option className="search__select-items" value="">Neighbourhood</option>
              <option className="search__select-items" value="Vancouver">All of Vancouver</option>
                {this.props.neighbourhoods.map((area, i) =>
                  <option className="search__select-items" value={area} key={i}>{area}</option>
                )}
          </select>
        </div>
        <div className="search__divider"></div>
        <div className="search__btn-container">
          <img onClick={this.props.sortBySaved} className="search__icon" src={redHeart} alt="favourites"/>
        </div>
      </section>
    )
  }
}
        
        
        
        
        
        
  