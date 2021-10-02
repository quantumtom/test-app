import React, { Component } from "react";
import ListOfLists from "./ListOfLists";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.css";
import "./List.css";

class Lists extends Component {

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return <React.Fragment>
      <Container>
        <ListOfLists />
      </Container>
    </React.Fragment>
  }
}

export default Lists;
