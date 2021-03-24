// import React from 'react';
import axios from 'axios';
import { Component } from 'react';
import BottomNav from '../components/BottomNav/BottomNav';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Saved extends Component {

  state = {
    // favourties: [] // and parse later?
    id: {},
    artWorks: {},
    visted: {},
    geom: {}
  }

  // look explore page 
  // store in all works in state -- then filter by user  
  componentDidMount() {
    axios
      .get(`http://localhost:8090/favourites/1`)
      //.get(`http://localhost:8090/favourites/${this.props.match.params.id}`)
      .then(response => {
       // console.log('response.data:', response.data)
        response.data.map((user) => {
         // console.log(thing.art_works.geom)
          this.setState({
            id: user.art_works.id,
            artWorks: user.art_works,
            visited: user.visted,
            geom: user.art_works.geom
          })
          console.log('State:', this.state)
        })
      })
        // this.setState({ favourties: response.data})
      .catch(function(error) {
        console.log('error:', error.response.data);
      })
  }

        // .then(response => {
        //     this.setState({
        //         listings: response.data,
        //         reviews: response.data.reviews,
        //     })
        // })

  render() {
    return (
      <section className="favourites">
        <h1>Hello</h1>
        {/* {console.log('this state:', this.state)} */}
        {/* {this.state.favourties.map((artWork) => (
          <li key={artWork.recordid}>
          
            <h1>{artWork.title}</h1>
            <h1>{artWork.visited}</h1>
            <h2>{artWork.artists}</h2>
            <img src={artWork.url_photo} alt="" height="300" />
            <h3>Photo: {artWork.photo_credits}</h3>
            <h2>{artWork.type}</h2>  
            <h2>{artWork.primary_material}</h2>
        
          </li>
        ))} */}

        
        <BottomNav />
      </section>
    );
  }
}

export default Saved;