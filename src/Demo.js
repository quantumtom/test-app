import React, {Component} from "react";
import './Demo.css';
import Navigation from './components/Navigation';

class Demo extends Component {
  render() {
    return <React.Fragment>
      <div>
        <Navigation />
      </div>
    </React.Fragment>
  }
}

export default Demo;
