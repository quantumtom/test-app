import React, { Component } from "react";
import Stack from "react-bootstrap/Stack";
import Player from "./Player";

const axios = require('axios').default;
const SERVER_BASE = "https://whispering-sea-28461.herokuapp.com";
const SERVER_PORT = "80";

axios.defaults.baseURL = SERVER_BASE + ":" + SERVER_PORT;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

class Commercials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  };

  // TODO
  // Swtich 'fetch' out and use axios.get instead.
  // https://github.com/axios/axios
  componentDidMount() {
    fetch(axios.defaults.baseURL + '/v1/work/')
      .then(res => res.json())
      .then(result => {
          // Made it here.
          this.setState({
            isLoaded: true,
            items: JSON.parse(result).data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            error
          });
        }
      ).catch(console.error);
  }

  render() {
    const items = this.state.items;

    return <React.Fragment>
        <Stack gap={5}>
          {items.map((item, index) => (
            <Player
              key={item.title + `-` + index}
              videoID={item.videoID}
              title={item.title}
              description={item.description}
            />
          ))}
        </Stack>
    </React.Fragment>
  }
}

export default Commercials;
