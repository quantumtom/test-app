import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import About from './pages/About';
import Admin from './pages/Admin';
import Commercials from './pages/Commercials';
import Shorts from './pages/Shorts';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/commercials">Commercials</Link>
              </li>
              <li>
                <Link to="/shorts">Shorts</Link>
              </li>
              <li>
                <Link to="/photography">Photography</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/commercials">
              <Commercials />
            </Route>
            <Route path="/shorts">
              <Shorts />
            </Route>
            <Route path="/photography">
              <Photography />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Photography() {
  return <h2>Photography</h2>;
}

function Contact() {
  return <h2>Contact</h2>;
}

export default Navigation;
