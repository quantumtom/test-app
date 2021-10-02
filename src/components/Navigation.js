import React, { Component } from "react";
import './Navigation.css';
import Container from "react-bootstrap/Container";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NavBar from './NavBar';
import About from './About';
import Commercials from './Commercials';
import Shorts from './Shorts';

import List from './List';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <NavBar />
          <Switch>
            <Route path="/">
              <Commercials />
            </Route>
            <Route path="/shorts">
              <Shorts />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/list">
              <List />
            </Route>
          </Switch>
      </Router>
    );
  }
}

export default Navigation;
