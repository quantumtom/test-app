import "./EditItem.css"
import React from "react";
import { Link } from "react-router-dom"
import { Modal, Form, Button, ButtonGroup } from "react-bootstrap";
import { default as axios } from "axios";
import { FcServices } from 'react-icons/fc';

axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class EditItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      title: this.props.item.title,
      description: this.props.item.description,
      videoID: this.props.item.videoID,
      itemIndex: this.props.itemIndex
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    console.dir(evt);
    console.log(`name is ${name}`);

    this.setState({
      [name]: value
    })
  }

  handleShow = () => this.setState({show: true});
  handleClose = () => this.setState({show: false});

  // TODO Add some client-side validation of form input data
  appendRecord = () => {
    const newItem = {
      title: this.state.title,
      description: this.state.description,
      videoID: this.state.videoID,
      itemIndex: this.state.itemIndex
    };


    axios.post(`/v2/${this.props.listType}/clips`, newItem)
      .then((res) => {
        this.props.rerenderParentCallback();
      });
  }

  handleSave = () => {
    this.appendRecord();
    this.handleClose();
  }

  contentEditable = React.createRef();

  render () {
    return (
      <React.Fragment>
        <Link to={`#`}
          className="item-link"
          onClick={this.handleShow}>
          <FcServices />
        </Link>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label column="sm">Title:</Form.Label>
                <Form.Control
                  value={this.state.title}
                  name="title"
                  type="text"
                  onChange={this.handleInputChange}
                  // tagName={'article'} // Use a custom HTML tag (uses a div by default)
                />
              </Form.Group>
              <Form.Group>
                <Form.Label column="sm">
                  Description:
                </Form.Label>
                <Form.Control
                  value={this.state.description}
                  name="description"
                  type="text"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label column="sm">
                  Video ID:
                </Form.Label>
                <Form.Control
                  value={this.state.videoID}
                  name="videoID"
                  type="text"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <ButtonGroup size="sm" aria-label="Add item or cancel">
              <Button variant="info" onClick={this.handleSave}>Add</Button>
              <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    )}
}

export default EditItem;
