import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
  // Swtich 'fetch' to use axios.get
  // https://github.com/axios/axios
  componentDidMount() {
    fetch('http://localhost:8080/v1/work')
      .then(res => res.json())
      .then(result => {
          // Made it here.
          this.setState({
            isLoaded: true,
            items: result
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
    return <React.Fragment>
      <h2>Commercials by Marc Flennert</h2>
      <main>
        <article>
          <Container fluid>
            <Row className="justify-content-center">
              <Col>
                {this.state.items.map((item, index) => (
                  <div key={item.title + `-` + item.id} className="poster">
                    <div>
                      <iframe title={`iframe-` + index} src={item.url} className="embed-responsive-item" frameBorder="0" allowFullScreen/>
                    </div>
                    <p className="video-title mt-3 mb-5">{item.title} - <em>{item.copy}</em></p>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </article>
      </main>
    </React.Fragment>
  }
}

export default Commercials;
