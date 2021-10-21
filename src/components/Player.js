import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import ReactPlayer from "react-player/lazy"
import Film from "../film.gif";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "https://player.vimeo.com/video/" + props.videoID,
      title: props.title,
      description: props.description
    }
  }

  render() {
    const title = this.state.title;
    const description = this.state.description;
    const url = this.state.url

    return <React.Fragment>
      <Container>
        <div className="embed-responsive embed-responsive-16by9">
          <ReactPlayer
            url={url}
            controls={true}
            loop={false}
            className="embed-responsive-item"
            allow="fullscreen"
            height="100%"
            width="100%"
            fallback={<img src={Film} alt="Loading" />}
            />
        </div>
        <div className="video-title">
          <p>{title} - <em>{description}</em></p>
        </div>
      </Container>
    </React.Fragment>
  }
}

export default Player;
