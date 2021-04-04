// https://picsum.photos/
// https://picsum.photos/v2/list  //30 // &limit=20
// import axios from 'axios';
import { Component } from "react";
import './PhotoGrid2x.scss'
import BottomNav from '../BottomNav/BottomNav';
import LazyLoad from 'react-lazy-load';
// import PhotoGridModal from '../PhotoGridModal/PhotoGridModal';
// import ArtWorks from '../ArtWorks/ArtWorks';     /// was version 2 
import Search from '../Search/Search';

// Max out grid - no margins or min 5px all around 
// check to see how the smallest images look,
// scroll to the bottom
import img1 from '../../data_temp/images/bure.jpg';
import img2 from '../../data_temp/images/platform.jpg';
import img3 from '../../data_temp/images/law42.jpg';
import img4 from '../../data_temp/images/L1.jpg';
import img5 from '../../data_temp/images/pollard.jpg';
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

import artWorksData from '../../data_temp/art_work'

import heartRed from '../../assets/icons/heart_red.svg';
import heartWhite from '../../assets/icons/heart_white.svg';
import iconMap from '../../assets/icons-feather-1.5px/map.svg';


// const img1 = "https://picsum.photos/id/237/650/400";
// const img2 = "https://picsum.photos/id/987/300/200";
// const img3 = "https://picsum.photos/id/217/624/455";
// const img4 = "https://picsum.photos/id/239/467/345";
// const img5 = "https://picsum.photos/id/78/567/540";
// const img6 = "https://picsum.photos/id/98/200/300";

// const apiUrl = 'http://localhost:8090/art_works'



class PhotoGrid2x extends Component {

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

  // handleButtonClick = () => {
  //   this.setState(state => {
  //     return {
  //       display: !state.display,
  //       expand: 7, // this.props.id,
  //     };
  //   });
  //   console.log('can I add more features?', this.state.display)
  // };
  componentDidMount() {
    this.reduceArrayIntoPairs(artWorksData)
  }

  handleButtonClick = (e, data) => {
    e.currentTarget.style.boxshadow = "none";
    this.setState(state => {
      return {
        display: !state.display,
        //expand: 7, // this.props.id,
        expand: data,
      };
    });
    console.log('Display --> ', this.state.display)
    console.log('Expand --> ', this.state.expand)
    console.log('Expand --> ', data)
  };
  
  reduceArrayIntoPairs = (artWorksData) => {
    const rows = artWorksData.reduce(function (rows, key, index) {
	    return (
		    (index % 2 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
		    rows
    	);
    }, []);
    //console.log(rows);
    return rows; // <--- map rows
  } 


  render() {

    console.log('ArtWorks Imported Obj -->', artWorksData);
    console.log('ArtWorks Imported Obj -- grouped -->', this.reduceArrayIntoPairs(artWorksData));
    const rows = this.reduceArrayIntoPairs(artWorksData)
    console.log('Access Rows -->', rows[0][0])
    console.log('Rows ==> ', rows)
    // reduceArrayIntoPairs(artWorksData);

    return (
      <div className="myfirst">
        <Search />
        <div className="myfirst">

          {/* ------------ Map ------------*/}
          {/* {rows.map(art => */}
            <div classname="wrapper">
              <div className="btn-wrapper">
                <button className="btn" onClick={(e) => { this.handleButtonClick(e, rows[0][0].registry_id) }}>      
                  <div className="container">
                    <LazyLoad className="lazyload" offsetVertical={700} overflow={true} >
                      <img className="img" src={rows[0][0].photo_url_jpg}></img>
                    </LazyLoad>
                    <img className="like filter-white" src={heartWhite}></img>
                  </div>
                </button>
                <button className="btn" onClick={(e) => { this.handleButtonClick(e, rows[0][1].registry_id) }} >
                  <div className="container">
                    <LazyLoad className="lazyload" offsetVertical={700} overflow={true} >
                      <img className="img" src={rows[0][1].photo_url_jpg}></img>
                    </LazyLoad>    
                    <img className="like filter-white" src={heartWhite}></img>
                  </div>
                </button>
              </div>
              {this.state.display && this.state.expand === rows[0][0].registry_id && (
                <div className="expander">
                  <ul className="ul">
                    <h1>{rows[0][0].title}</h1>
                    <h2>{rows[0][0].artists_names}</h2>
                    <img className="filter-white" src={iconMap}></img>
                    <h3>{rows[0][0].neighbourhood}</h3>
                    <h3>{rows[0][0].type}</h3>
                    <h4>{rows[0][0].artist_statement}</h4>
                    <p>Statement Statement Statement Statement Statement Statement</p>
                  </ul>
                </div>)}
              {this.state.display && this.state.expand === rows[0][1].registry_id && (
                <div className="expander">
                <ul>
                  <h1>{rows[0][1].title}</h1>
                  <h2>{rows[0][1].artists_names}</h2>
                  <img className="filter-white" src={iconMap}></img>
                  <h3>{rows[0][1].neighbourhood}</h3>
                  <h3>{rows[0][1].type}</h3>
                  <h4>{rows[0][1].artist_statement}</h4>
                  <p>Statement Statement Statement Statement Statement Statement</p>
                </ul>
              </div>)}
            </div>
          {/* )} */}
          {/* ------------ Map ------------*/}

          {/* {(couple) => (itme2, item2)} */}

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
      </div>
    );
  }
}

export default PhotoGrid2x;
