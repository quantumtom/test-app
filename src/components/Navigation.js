import React, { Component } from "react";
import './Navigation.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container";

import About from './About';
import Admin from './Admin';
import Commercials from './Commercials';
import Shorts from './Shorts';

class Navigation extends Component {
  render() {
    return (
      <Router>
          <Navbar bg="primary" expand="lg">
            <Container>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link className="nav-link text-uppercase" target="_top" href="/commercials">Commercials</Nav.Link>
                  <Nav.Link className="nav-link text-uppercase" target="_top" href="/shorts">Shorts</Nav.Link>
                  <Nav.Link className="nav-link text-uppercase" target="_blank" href="https://photo.marcflennert.com" rel="noopener">Photography</Nav.Link>
                  <Nav.Link className="nav-link text-uppercase" target="_top" href="/about">About</Nav.Link>
                  <Nav.Link className="nav-link text-uppercase" target="_top" href="mailto:info@marcflennert.com">Contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Switch>
            <Route path="/commercials">
              <Commercials />
            </Route>
            <Route path="/shorts">
              <Shorts />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
          </Switch>
      </Router>
    );
  }
}

export default Navigation;
