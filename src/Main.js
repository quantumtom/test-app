import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import './Main.css';
import Router from './components/Router';

class Demo extends Component {
  render() {
    return <React.Fragment>
      <div>
        <Router />
      </div>
    </React.Fragment>
  }
}

export default Demo;
