import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Figure from "react-bootstrap/Figure";
import portraitImageFile from "../portrait-medium.jpg";
import "./About.css";

class About extends Component {
  render() {
    return <React.Fragment>
      <main>
        <article>
          <Container fluid>
            <Figure>
              <Figure.Image className="float-left mr-5" fluid rounded src={portraitImageFile} id="profile" alt="Marc Flennert" />
              <Figure.Caption className="text-start bodycopy">
                <span className="prose-text">
                  A lifelong photographer, Marc Flennert's passion is the practice of cinematography. With the combination of his natural creativity and technical know how, he's able to infuse his approach with a style of his own. Over the years he's gained vast experience working hand in hand with award winning directors, producers and agencies servicing major brands. Flennert continues to refine his talents by continually immersing himself in an array of projects around the world.
                </span>
              </Figure.Caption>
            </Figure>
          </Container>
        </article>
      </main>
    </React.Fragment>
  }
}

export default About;
