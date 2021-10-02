import React, { Component } from "react";
import './Navigation.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import NavBar from './NavBar';
import About from './About';
import Commercials from './Commercials';
import Shorts from './Shorts';
import Lists from './Lists';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/commercials" />
          </Route>
          <Route path="/commercials">
            <Commercials />
          </Route>
          <Route path="/shorts">
            <Shorts />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/lists">
            <Lists />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default Navigation;
