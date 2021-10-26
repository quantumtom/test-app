import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Figure from "react-bootstrap/Figure";
import portraitSmall from "../portrait-small.jpg";
import portraitMedium from "../portrait-medium.jpg";
import "./About.css";

class About extends Component {
  render() {
    return (
      <React.Fragment>
        <Figure>
          <Figure.Image className="float-left mr-5 profile-image float-left" fluid rounded src={portraitSmall} srcSet={`${portraitSmall} 150w, ${portraitMedium} 300w`} id="profile" alt="Marc Flennert" />
          <Figure.Caption className="text-start bodycopy prose-text float-left">
            A lifelong photographer, Marc Flennert's passion is the practice of cinematography. With the combination of his natural creativity and technical know how, he's able to infuse his approach with a style of his own. Over the years he's gained vast experience working hand in hand with award winning directors, producers and agencies servicing major brands. Flennert continues to refine his talents by continually immersing himself in an array of projects around the world.
          </Figure.Caption>
        </Figure>
    </React.Fragment>
    )};
}

export default About;
