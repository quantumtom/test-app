import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import ReactPlayer from "react-player/vimeo";
import "./Player.css";

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
      <Container fluid className={`mb-2`}>
        <div className="embed-responsive embed-responsive-16by9 poster-placeholder">
          <ReactPlayer
            url={url}
            controls={true}
            loop={false}
            className="embed-responsive-item"
            allow="fullscreen"
            height="100%"
            width="100%"
            fallback={<div>Loading...</div>}
            />
        </div>
        <div className="video-caption mt-2">
          <span className="video-title">{title}</span><br/>
          <span className="video-description">
            <em>{description}</em>
          </span>
        </div>
      </Container>
    </React.Fragment>
  }
}

export default Player;
