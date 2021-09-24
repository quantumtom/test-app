import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class NavRouter extends Component {
   render () {
     return (
       <Router>
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
     )};
}

export default NavRouter;
