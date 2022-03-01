import './Demo.css';
import React, { Component } from 'react';
import Vimeo from 'vimeo';
import { v4 } from 'uuid';

import { default as axios } from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.vimeo = Vimeo.Vimeo;

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
    const SCOPE_LIST = 'private create edit delete video_files public';
    const REDIRECT_URI = `https://die-aggravator.herokuapp.com/`
    // const REDIRECT_URI = `http://localhost:3000/demo`
    const V_STATE = v4();

    const LOGIN_URI = `https://api.vimeo.com/oauth/authorize?response_type=code`
      + `&client_id=${CLIENT_ID}`
      + `&redirect_uri=${encodeURI(REDIRECT_URI)}`
      + `&state=${encodeURI(V_STATE)}`
      + `&scope=${encodeURI(SCOPE_LIST)}`

    this.state = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      access_token: ACCESS_TOKEN,
      login_uri: LOGIN_URI,
      redirect_uri: REDIRECT_URI,
      v_state: V_STATE
    };
  }

  generateClientCredentials() {
    const { client_id, client_secret, access_token } = this.state;
    const client = new this.vimeo(client_id, client_secret, access_token);
    const scopeList = 'private create edit delete video_files public';

    // Unauthenticated
    client.generateClientCredentials(scopeList, (err, response) => {
      if (err) {
        throw err;
      }

      let token = response.access_token;

      let scopes = response.scope;

      this.setState({token: token, scopes: scopes})
    });
  }

  componentDidMount() {
    const { client_id, client_secret, access_token, redirect_uri, v_state } = this.state;
    const client = new this.vimeo(client_id, client_secret, access_token);
    const scopeList = 'private create edit delete video_files public';

    const AUTH_ENDPOINT = client.buildAuthorizationEndpoint(redirect_uri, scopeList, v_state)

    this.setState({auth_endpoint: AUTH_ENDPOINT});
  }

  render() {
    const { token, scopes, client_id, client_secret, v_state, auth_endpoint, redirect_uri } = this.state;

    return (
      <React.Fragment>
        <h5>token</h5>
        <p>{ token }</p>
        <h5>scopes</h5>
        <p>{ scopes }</p>
        <h5>client_id</h5>
        <p>{ client_id }</p>
        <h5>client_secret</h5>
        <p>{ client_secret }</p>
        <h5>v_state</h5>
        <p>{ v_state }</p>
        <h5>redirect_uri</h5>
        <p>{ redirect_uri }</p>
        <h5>auth_endpoint</h5>
        <p><a href={ auth_endpoint }>{ auth_endpoint }</a></p>
      </React.Fragment>
    )
  }
}

export default Demo;
