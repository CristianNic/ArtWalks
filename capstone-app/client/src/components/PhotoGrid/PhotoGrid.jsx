// https://picsum.photos/
// https://picsum.photos/v2/list  //30 // &limit=20
// import axios from 'axios';
import { Component } from "react";
import './PhotoGrid.scss'
import BottomNav from '../BottomNav/BottomNav';
import PhotoGridModal from '../PhotoGridModal/PhotoGridModal';
// import ArtWorks from '../ArtWorks/ArtWorks';     /// was version 2 
import Search from '../Search/Search';

// Max out grid - no margins or min 5px all around 
// check to see how the smallest images look,
// scroll to the bottom
import img1 from '../../data_temp/images/bure.jpg';
import img2 from '../../data_temp/images/platform.jpg';
import img3 from '../../data_temp/images/law42.jpg';
import img4 from '../../data_temp/images/L1.jpg';
import img5 from '../../data_temp/images/Pollard.jpg';
import img6 from '../../data_temp/images/lion.jpg';
import img7 from '../../data_temp/images/pink.jpg'; // faves
import img8 from '../../data_temp/images/postcard.jpg';
import img9 from '../../data_temp/images/snake.jpg';
import img10 from '../../data_temp/images/lamp.jpg';
import img11 from '../../data_temp/images/animals.jpg'
import img12 from'../../data_temp/images/platform2.jpg'
import img13 from'../../data_temp/images/blueLong.jpg'
import img14 from'../../data_temp/images/L196.jpg'
import img15 from'../../data_temp/images/oak.jpg'
import img16 from'../../data_temp/images/bw.jpg'

// const img1 = "https://picsum.photos/id/237/650/400";
// const img2 = "https://picsum.photos/id/987/300/200";
// const img3 = "https://picsum.photos/id/217/624/455";
// const img4 = "https://picsum.photos/id/239/467/345";
// const img5 = "https://picsum.photos/id/78/567/540";
// const img6 = "https://picsum.photos/id/98/200/300";

// const apiUrl = 'http://localhost:8090/art_works'


class PhotoGrid extends Component {

  // state = {
  //   art_works: [],
  // }
  // componentDidMount() {
  //   this.getArtWorks(); 
  // }

  // getArtWorks() {
  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       this.setState({
  //         art_works: response.data.art_works,
  //       })
  //     })
  //     .catch(function(error) {
  //     })
  // }
  // const [showResults, setShowResults] = useState(false);
  // const onClick = () => setShowResults(true)

  state = {
    display: false,
    expand: 0,
    // current_art_work: this.state.registry_id,
  }

  handleButtonClick = () => {
    this.setState(state => {
      return {
        display: !state.display,
        expand: this.props.id,
      };
    });
    console.log('can I add more features?')
  };
  
  render() {
    return (
      <div className="myfirst">
        {/* <Search /> */}
        {/* ------------ Click photo to expand display------------*/}
        <div className="container">
          <button className="btn" onClick={this.handleButtonClick}>
          {/* <button className="btn" onClick={() => this.handleButtonClick(this.props.id)}> */}
            {/* // onClick return the id value, if the it value === the current props.id then expand */}
            <img className="img" src={img1}></img> 
          </button>  
        </div>
        {this.state.display && (
        // {this.state.display && this.state.expand === this.state.props.id && (
          
          // <div className="flex">
          <div className="expander" id={this.props.id}>
            <h1>Title</h1>
            <h2>Artist</h2>
            <h2>Neighbourhood</h2>
            <h2>Medium</h2>
            <h2>Statement</h2>
          {/* </div> */}
        </div>)}

        <div className="container">
          <button className="btn" onClick={this.handleButtonClick}>
            <img className="img" src={img2}></img>
          </button>
        </div>
        {this.state.display && (
          <div className="expander">
            <h1>Title</h1>
            <h2>Artist</h2>
            <h2>Neighbourhood</h2>
            <h2>Medium</h2>
            <h2>Statement</h2>
          </div>)}

        <div className="container">
          <button className="btn" onClick={this.handleButtonClick}>
            <img className="img" src={img3}></img>
          </button>
        </div>

        <button className="btn" onClick={this.handleButtonClick}>
          <div className="container">
            <img className="img" src={img4}></img>
          </div>
        </button>
        
        {this.state.display && (
          <div class="expander">
            <ul>
              <h1>Title</h1>
              <h2>Artist</h2>
              <h2>Neighbourhood</h2>
              <h2>Medium</h2>
              <h2>Statement</h2>
            </ul>
          </div>)}

    {/* --------------- Modal ---------------*/}
        
        {/* <div className="container">
          <img className="img" src={img5}></img>
        </div> */}
        {/* <PhotoGridModal/> */}

     {/* --------------- Grid ---------------*/}   
        <div className="container">
          <img className="img" src={img6}></img>
        </div>
        <div className="container">
          <img className="img" src={img7}></img>
        </div>
        <div className="container">
          <img className="img" src={img8}></img>
        </div>
        <div className="container">
          <img className="img" src={img9}></img>
        </div>
        <div className="container">
          <img className="img" src={img10}></img>
        </div>
        <div className="container">
          <img className="img" src={img11}></img>
        </div>
        <div className="container">
          <img className="img" src={img12}></img>
        </div>
        <div className="container">
          <img className="img" src={img13}></img>
        </div>
        <div className="container">
          <img className="img" src={img14}></img>
        </div>
        <div className="container">
          <img className="img" src={img15}></img>
        </div>
        <div className="container">
          <img className="img" src={img16}></img>
        </div>
        
        {/* <div className="exp__container">
        {this.state.art_works.map(art => 
          <ArtWorks
            key={art.id}  
            id={art.id}
            title={art.title}
            artists_names={art.artists_names}
            photo_url={art.photo_url}
            //photo_credits={art.photo_credits}
            neighbourhood={art.neighbourhood}
            type={art.type}
            artist_statement={art.artist_statement}
            liked={this.state.liked} // {this.state.liked} [7, 8, 9]
            visited={this.state.visited}
            // postFavourite={postFavourite}
            // putLiked={putLiked}
          />
          )}
        </div> */}

        <BottomNav />

      </div>
    );
  }
}

export default PhotoGrid;
