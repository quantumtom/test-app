import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
const axios = require('axios').default;

const SERVER_BASE = process.env.SERVER_BASE || 'http://localhost';
const SERVER_PORT = process.env.SERVER_PORT || '8080';

axios.defaults.baseURL = SERVER_BASE + ":" + SERVER_PORT;
axios.defaults.headers.post['Content-Type'] = 'application/json';


class Shorts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  getShorts() {
    axios.get('/v1/shorts')
      .then((response) => {
        this.setState({
          isLoaded: true,
          items: response.data
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .then(() => {
        // always executed
      });
  }

  componentDidMount() {
    this.getShorts();
  }

  render() {
    const items = this.state.items;

    return <React.Fragment>
        <Container>
          <Stack gap={5}>
            {items.map((item, index) => (
              <Container key={item.title + `-` + index}>
                <div className="poster">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                      title={`iframe-` + index}
                      src={'https://player.vimeo.com/video/' + item.videoID}
                      className="embed-responsive-item"
                      frameBorder="0"
                      allowFullScreen />
                  </div>
                  <div>
                    <p className="video-title mt-3 mb-5">{item.title} - <em>{item.description}</em></p>
                  </div>
                </div>
              </Container>
            ))}
          </Stack>
        </Container>
    </React.Fragment>
  }
}

export default Shorts;
