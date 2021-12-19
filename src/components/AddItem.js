import "./AddItem.css"
import React from "react";
import { Link } from "react-router-dom"
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import ContentEditable from "react-contenteditable"
import { default as axios } from "axios";

axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class AddItem extends React.Component {
  constructor(props) {
    super(props);

    this.newItem = {
      title: 'New Title',
      description: 'New Derscription',
      videoID: ''
    };

    this.state = {
      show: false
    }
  }

  handleShow = () => this.setState({show: true});
  handleClose = () => this.setState({show: false});

  // TODO Add some client-side validation of form input data
  saveRecord = () => {
    axios.post(`/v2/${this.props.listType}/clips`, this.props.item)
      .then((res) => {
        console.log(`add record '${this.props.item}'.`)
        this.props.rerenderParentCallback();
        console.log(res);
      });
  }

  handleSave = (evt) => {
    console.log(`handleSave: '${evt.currentTarget.innerHTML}'.`);
    this.saveRecord();
    this.handleClose();
  }

  handleBlur = evt => {
    let propertyName = evt.target.getAttribute('data-value-type');
    // console.dir(evt.target.getAttribute('data-value-type'));

    switch (propertyName) {
      case 'title':
        this.newItem.title = evt.target.innerHTML;
        break;
      case 'description':
        this.newItem.description = evt.target.innerHTML;
        break;
      case 'videoID':
        this.newItem.videoID = evt.target.innerHTML;
        break;
      default:
        console.err('Invalid property name : ' + propertyName)
    }
  };

  contentEditable = React.createRef();

  render () {
    return (
      <React.Fragment>
          <Link to={`#`}
            className="item-link"
            onClick={this.handleShow}>
            Add a new item.
          </Link>
        <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <span className="float-left font-weight-bold mr-1">Title:</span>
          <ContentEditable
            html={this.props.videoID}
            innerRef={this.contentEditable}
            onBlur={this.handleBlur}
            // tagName={'article'} // Use a custom HTML tag (uses a div by default)
            data-value-type='title'
          />
          <span className="float-left font-weight-bold mr-1">Description:</span>
          <ContentEditable
            html={this.props.description}
            innerRef={this.contentEditable}
            onBlur={this.handleBlur}
            // tagName={'article'} // Use a custom HTML tag (uses a div by default)
            data-value-type='description'
          />
          <span className="float-left font-weight-bold mr-1">Video ID:</span>
          <ContentEditable
            html={this.props.videoID}
            innerRef={this.contentEditable}
            onBlur={this.handleBlur}
            // tagName={'article'} // Use a custom HTML tag (uses a div by default)
            data-value-type='videoID'
          />
        </Modal.Body>

        <Modal.Footer>
          <ButtonGroup size="sm" aria-label="Cancel or Save Changes">
            <Button variant="primary" onClick={this.handleSave}>Save Changes</Button>
            <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
    )}
}

export default AddItem;
