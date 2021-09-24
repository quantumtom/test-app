import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import portraitImageFile from "../portrait-small.jpg";

const PortraitImage = () => {
  return (
    <img src={portraitImageFile} className="img-fluid mr-5 rounded mx-auto d-block" id="profile" alt="Marc Flennert" />
  );
}

class About extends Component {
  render() {
    return <React.Fragment>
      <h2>About</h2>
        <main>
          <article>
            <Container fluid>
              <Row className="justify-content-center">
                <Col className="col-md-8 col-12 mb-5 mt-4">
                  <Row>
                    <Col className="col-sm-4 col-12 mb-5">
                      <PortraitImage />
                    </Col>
                    <Col className="col-sm-8 col-10">
                      <p className="bodycopy">A lifelong photographer, Marc Flennert's passion is the practice of cinematography. With the combination of his natural creativity and technical know how, he's able to infuse his approach with a style of his own. Over the years he's gained vast experience working hand in hand with award winning directors, producers and agencies servicing major brands. Flennert continues to refine his talents by continually immersing himself in an array of projects around the world.</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
        </article>
      </main>
    </React.Fragment>
  }
}

export default About;
