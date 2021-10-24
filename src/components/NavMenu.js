import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./NavMenu.css";

// TODO: Implement active link
//  (maybe with hooks?)

class NavMenu extends Component {
  render() {
    return (
      <Navbar expand="sm" variant="light" bg="light" sticky="top" className="mb-3">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container>
            <Nav className="justify-content-center"
              activeKey={window.location.pathname}
              defaultActiveKey="/commercials"
            >
              <Nav.Item>
                <Nav.Link href="/commercials" className="text-uppercase">Commercials</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/shorts" className="text-uppercase">Shorts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://photo.marcflennert.com" className="text-uppercase" target="_blank" rel="noopener">Photography</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/about" className="text-uppercase">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="mailto:info@marcflennert.com" className="text-uppercase">Contact</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/lists" className="text-uppercase">Admin</Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    )}
}

export default NavMenu;
