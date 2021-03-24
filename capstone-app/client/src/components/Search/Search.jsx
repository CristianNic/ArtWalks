import React, { Component } from 'react'

export default class Search extends Component {
  render() {

    const handleSearchSubmit = (event) => {
			event.preventDefault();
			event.target.reset();
    };
    
    return (
      <section className="search">
        {/* <h1 className="search__title">Search</h1> */}
        <div>
          <form className="search__form" action="submit" onSubmit={handleSearchSubmit}>
            <input className="search__input" type="text" placeholder="Explore local art..." autoFocus />
            <button className="search__btn">Search</button>
            <hr className="search__btn hide"/>
          </form>
        </div>
        <div>
          <select name="search__form-neighbourhood" id="pet-select">
            <option value="">Neighbourhood</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
          </select>
        </div>
        <div>
          <select name="pets" id="pet-select">
            <option value="">Medium</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
          </select>
        </div>
        <div>
          <select name="pets" id="pet-select">
            <option value="">Artist</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
          </select>
        </div>



      </section>
    )
  }
}
        
        
        
        
        
        
  