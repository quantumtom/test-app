import React, { Component } from "react";
import Stack from "react-bootstrap/Stack";
import Player from "./Player";
import {default as axios} from "axios";
axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class Commercials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      listType: props.listType || "adverts"
    };
  };

  componentDidMount() {
    this.getList();
  }

  getList() {
    axios.get(`/v2/${this.state.listType}`)
      .then((res) => {
        console.dir(res.data);
        // Made it here.
        this.setState({
          isLoaded: true,
          items: res.data
        });
      })
      .catch(console.error);
  }

  render() {
    const {error, isLoaded, items} = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      // console.dir(items["clips"]);


      return <React.Fragment> <Stack gap={5}>
        {items["clips"].map((item, index) => (
          <Player
            key={item.guid + `-` + index}
            videoID={item.videoID}
            title={item.title}
            description={item.description}
          />
        ))}
      </Stack> </React.Fragment>
    }
  }
}

export default Commercials;
