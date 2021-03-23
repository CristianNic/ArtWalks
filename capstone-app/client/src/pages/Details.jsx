import { Component } from 'react';
import axios from 'axios';
import BottomNav from '../components/BottomNav/BottomNav';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// const apiUrl = 'http://localhost:8090/art_works/2' // details for one

class Details extends Component {

  // state = {
  //   title: '',   
  //   artists: '',
  //   url_photo: '', 
  //   photo_credits: '',
  //   type: '',
  //   primary_material: '',
  // }
  //.get(`${apiUrl}`)
  //.get(`http://localhost:8090/art_works${apiUrl}`)
  //.get(`http://localhost:8090/art_works/${this.props.match.params.id}`)
  state = {
    art_works: [],
  }
  
  componentDidMount() {
    axios
    //.get(`http://localhost:8090/art_works/9`)
    .get(`http://localhost:8090/art_works/${this.props.match.params.id}`)
      .then(response => {
        console.log('response.data:', response.data)
       
        console.log('params.id', this.props.match.params.id) // <--- what is params.id here? 
        this.setState(
          //art_works: response.data,
          response.data,
        );
        // console.log(this.state)
      })
    console.log('this.state', this.state)
  }

  render() {
    return (
      <section className="details">
        <h1>{this.state.title}</h1>
        <h2>{this.state.artists}</h2>
        <img src={this.state.photo_url} alt="" height="300" />
        <h3>Photo: {this.state.photo_credits}</h3>
        <h2>{this.state.type}</h2>
        <h2>{this.state.primary_material}</h2>
        <BottomNav />
      </section>
    );
  }
}

export default Details;