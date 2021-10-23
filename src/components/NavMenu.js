import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./NavMenu.css";

// TODO: Implement active link
//  (maybe with hooks?)

class NavMenu extends Component {
  render() {
    const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

    return (
      <Navbar expand="sm" variant="light" bg="light" sticky="top" className="mb-3">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container>
            <Nav className="justify-content-center"
              activeKey="link-1"
              onSelect={handleSelect}
            >
              <Nav.Item>
                <Nav.Link href="/commercials" eventKey="link-1" className="text-uppercase">Commercials</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/shorts" eventKey="link-2" className="text-uppercase">Shorts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://photo.marcflennert.com" eventKey='link-3' className="nav-link text-uppercase" target="_blank" rel="noopener">Photography</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/about" eventKey="link-4" className="text-uppercase">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="mailto:info@marcflennert.com" eventKey='link-4' className="nav-link text-uppercase">Contact</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/lists" eventKey='link-5' className="nav-link text-uppercase">Admin</Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    )}
}

export default NavMenu;
