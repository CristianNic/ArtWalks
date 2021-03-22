

import { handleScroll } from './TestScrollHelper.jsx'

const content = 'a wall of images'

class ScrollStatus extends Component {
 constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      scrollBottomStatus: false,
    }
  }
 componentDidMount() {
    window.addEventListener("scroll", handleScroll(this, 
    this.stateHandler));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", handleScroll(this, 
    this.stateHandler));
  }

  stateHandler = (state) => {
    this.setState(state);
  }
  render() {
    return ( <div> Long text ... </div> ) }
}
export default ScrollStatus


// ADD THIS 
// // 1. Add eventlistener on mount, also remove on unmount.

// componentDidMount = () => {
//     window.addEventListener('scroll', () => _.throttle(this.handleScroll, 100));
//   }

// // 2. In the same component I'd handle the state update.
// handleScroll = () => {
//   let scrollY = window.pageYOffset;
//   if(scrollY < 100) { this.setState({ // BLA }) 
//   }

    