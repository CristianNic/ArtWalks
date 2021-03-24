import React, { Component } from 'react'

export default class Search extends Component {
  render() {

    const handleSearchSubmit = (event) => {
			event.preventDefault();
			event.target.reset();
    };
    
    return (
      <section className="search">
        <h1 className="search__title">Search</h1>
        <form className="search__form" action="submit" onSubmit={handleSearchSubmit}>
          <input className="search__input" type="text" placeholder="Explore local art..." autoFocus />
          <button className="search__btn">Search</button>
          <hr/>
        </form>
      </section>
    )
  }
}
        
        
        
        
        
        
  