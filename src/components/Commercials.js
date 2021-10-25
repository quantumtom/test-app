import React, { Component } from "react";
import Stack from "react-bootstrap/Stack";
import Player from "./Player";

class Commercials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  };

  componentDidMount() {
    this.getList();
  }

  getList() {
    fetch(`${window.API_BASE}/v1/adverts/`, {mode: 'cors'})
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
