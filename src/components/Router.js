import React, { Component, Suspense } from "react";
import Container from "react-bootstrap/Container";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import NaviMenu from './NaviMenu';

const Commercials = React.lazy(() => import("./Commercials"));
const Shorts = React.lazy(() => import("./Shorts"));
const About = React.lazy(() => import("./About"));
const Lists = React.lazy(() => import("./Lists"));
const Demo = React.lazy(() => import("./Demo"));

class Navigation extends Component {
  render() {
    return (
      <Router>
        <NaviMenu />
        <Switch>
          <Route exact path="/">
            <Redirect to="/commercials" />
          </Route>
          <Route path="/commercials">
            <Container fluid>
              <Suspense fallback={<div>Loading Commercials...</div>}>
                <Commercials />
              </Suspense>
            </Container>
          </Route>
          <Route path="/shorts">
            <Container fluid>
              <Suspense fallback={<div>Loading Shorts...</div>}>
                <Shorts />
              </Suspense>
            </Container>
          </Route>
          <Route path="/about">
            <Container fluid>
              <Suspense fallback={<div>Loading About...</div>}>
                <About />
              </Suspense>
            </Container>
          </Route>
          <Route path="/lists">
            <Container fluid>
              <Suspense fallback={<div>Loading Lists...</div>}>
                <Lists />
              </Suspense>
            </Container>
          </Route>
          <Route path="/demo">
            <Container fluid>
              <Suspense fallback={<div>Loading Demo...</div>}>
                <Demo />
              </Suspense>
            </Container>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default Navigation;
