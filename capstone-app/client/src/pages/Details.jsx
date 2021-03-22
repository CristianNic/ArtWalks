import { Component } from 'react';
import axios from 'axios';
import BottomNav from '../components/BottomNav/BottomNav';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const apiUrl = 'http://localhost:8090/art_works/2' // details for one

const photo = 'https://covapp.vancouver.ca/PublicArtRegistry/_image.aspx/tDMNbF-41qBPcKfm_Ranl5jigZUdZSNeTsqMi9mOP5w=/M2630%20Main%20Street%20-%20Bure.JPG'

class Details extends Component {

  state = {
    title: '',   // https://covapp.vancouver.ca/PublicArtRegistry/ArtworkDetail.aspx?ArtworkId=672
    artists: '', // 'Justin Broadbent', // https://covapp.vancouver.ca/PublicArtRegistry/ArtworkDetail.aspx?ArtworkId=672
    url_photo: '', // https://covapp.vancouver.ca/PublicArtRegistry/ArtworkDetail.aspx?ArtworkId=672'
    photo_credits: '',
    type: '',
    primary_material: '',
  }

  componentDidMount() {
    axios
      .get(`${apiUrl}`)
      .then(response => {
        this.setState({
          title: response.data.title,
          artists: response.data.artists,
          url_photo: response.data.url_photo,
          photo_credits: response.data.photo_credits,
          type: response.data.type,
          primary_material: response.data.primary_material,
        });
        console.log(this.state)
      })
    console.log(this.state)
  }

  render() {
    return (
      <section className="details">
        <h1>{this.state.title}</h1>
        <h2>{this.state.artists}</h2>
        <img src={photo} alt="" height="300" />
        <h3>Photo: {this.state.photo_credits}</h3>
        <h2>{this.state.type}</h2>
        <h2>{this.state.primary_material}</h2>

        <BottomNav />
      </section>
    );
  }
}

export default Details;