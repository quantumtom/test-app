import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./NavMenu.css";

// TODO: Implement active link
//  (maybe with hooks?)

class NavBar extends Component {
  render() {
    return (
      <Navbar expand="sm" variant="light" bg="light" sticky="top" className="mb-3">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container>
            <Nav className="justify-content-center"
              // defaultActiveKey='/commercials'
              // onSelect={(selectedKey) => this.onSelect(selectedKey)}
            >
              <Nav.Item>
                <Nav.Link eventKey="commercials" className="text-uppercase" target="_top" href="/commercials">Commercials</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="shorts" className="text-uppercase" target="_top" href="/shorts">Shorts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='photography' className="nav-link text-uppercase" target="_blank" href="https://photo.marcflennert.com" rel="noopener">Photography</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="about" className="text-uppercase" target="_top" href="/about">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='contact' className="nav-link text-uppercase" target="_top" href="mailto:info@marcflennert.com">Contact</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='admin' className="nav-link text-uppercase" target="_top" href="/lists">Admin</Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    )}
}

export default NavBar;
