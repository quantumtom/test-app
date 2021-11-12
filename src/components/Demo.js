import React, { Component } from "react";
import "./Demo.css";

import {default as axios} from "axios";
axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';


class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }


  render() {

    return (
      <React.Fragment>
        <h5>THIS</h5>
        <h4>SPACE</h4>
        <h3>IS AVAILABLE FOR</h3>
        <h1>ADVERTISING</h1>
      </React.Fragment>
    )
  }
}

export default Demo;
