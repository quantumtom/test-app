import React, { Component } from "react";
import "./Demo.css";
import Vimeo from "vimeo";

import {default as axios} from "axios";
axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.vimeo = Vimeo.Vimeo;

    const CLIENT_ID = 'c22955ae82e69e0999eaef1182c220821d02d903';
    const CLIENT_SECRET = 'r+ErId+h/BeCv8CbJvQzMrvkNKWnO+F3M2vq6kY4UzsulgRS23JoWFxW2baAWdWq8Kv/s2VQAEVJZPBtm0YCI2du4w6KWN9YesVT9i3D4x4Xlx6Tat6EAe19tljZp0KO';
    const ACCESS_TOKEN = '10eaf156a147efb9f84d20ce659c1ff2';

    this.client = new this.vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);
  }

  componentDidMount() {
    this.client.generateClientCredentials(['private', 'create', 'edit', 'delete', 'upload', 'video_files', 'public'], (err, response) => {
      if (err) {
        throw err;
      }

      let token = response.access_token;

      let scopes = response.scope;

      console.log(token, scopes);
    });
  }


  render() {

    return (
      <React.Fragment>
        <h5>THIS</h5>
        <h4>SPACE</h4>
        <h3>IS AVAILABLE FOR</h3>
        <h1>ADVERTISING</h1>
      </React.Fragment>
    )
  }
}

export default Demo;
