import React, { Component, Suspense } from "react";
import Container from "react-bootstrap/Container";
import './Navigation.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import NavBar from './NavBar';

const Commercials = React.lazy(() => import("./Commercials"));
const Shorts = React.lazy(() => import("./Shorts"));
const Lists = React.lazy(() => import("./Lists"));
const About = React.lazy(() => import("./About"));

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
            <Container fluid>
              <Suspense fallback={<div>Loading...</div>}>
                <Commercials />
              </Suspense>
            </Container>
          </Route>
          <Route path="/shorts">
            <Container fluid>
              <Suspense fallback={<div>Loading...</div>}>
                <Shorts />
              </Suspense>
            </Container>
          </Route>
          <Route path="/about">
            <Container fluid>
              <Suspense fallback={<div>Loading...</div>}>
                <About />
              </Suspense>
            </Container>
          </Route>
          <Route path="/lists">
            <Suspense fallback={<div>Loading...</div>}>
              <Lists />
            </Suspense>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default Navigation;
