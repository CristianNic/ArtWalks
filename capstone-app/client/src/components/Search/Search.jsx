import React, { Component } from 'react'

export default class Search extends Component {
  render() {

    const handleSearchSubmit = (e) => {
			e.preventDefault();
			e.target.reset();
    };
    
    return (
      <div className="search">
        <h1 className="search__title">Search</h1>
        <form action="submit" onSubmit={handleSearchSubmit}>
          <input type="text" placeholder="Explore local art..." autoFocus />
          <button>Search</button>
          <hr/>
        </form>
      </div>
    )
  }
}
        
        
        
        
        
        
  