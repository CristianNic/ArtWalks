import { Component } from 'react';
import BottomNav from '../components/BottomNav/BottomNav';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


// Returns all artworks http://localhost:8090/art_works
class Browse extends Component {

  // componentDidMount() {
  //   this.getProductListData();
  //   this.getProductDetailsData();
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('art work updated');
  //   if (
  //     this.props.match.params.id !== undefined &&
  //       prevState.productDetails.id !== this.props.match.params.id
  //   ) {
  //     this.getProductDetailsData(this.props.match.params.id);
  //   }
  // }
  
  
  render() {
    return (
      <section className="browse">
        <h1>Hello</h1>

        <BottomNav />
      </section>
    );
  }
}

export default Browse;