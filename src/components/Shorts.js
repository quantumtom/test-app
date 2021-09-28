import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
        <Container fluid>
          <Row>
            <Col className="justify-content-center">
              {items.map((item, index) => (
                <div key={item.title + `-` + item.id} className="poster">
                  <div>
                    <iframe title={`iframe-` + index} src={item.url} className="embed-responsive-item" frameBorder="0" allowFullScreen/>
                  </div>
                  <div>
                    <p className="video-title mt-3 mb-5">{item.title} - <em>{item.copy}</em></p>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
    </React.Fragment>
  }
}

export default Shorts;
