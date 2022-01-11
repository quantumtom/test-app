import "./EditItem.css"
import React from "react";
import { Link } from "react-router-dom"
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import ContentEditable from "react-contenteditable"
import { default as axios } from "axios";
import { FcServices } from 'react-icons/fc';

axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class EditItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    }

    this.handleSave = this.handleSave.bind(this);
  }

  handleShow = () => this.setState({show: true});
  handleClose = () => this.setState({show: false});

  saveRecord = () => {
    axios.put(`/v2/${this.props.listType}/clips/${this.props.item.guid}`, this.props.item)
      .then((res) => {
        this.props.rerenderParentCallback();
      });
  }

  handleSave = () => {
    this.saveRecord();
    this.handleClose();
  }

  contentEditable = React.createRef();

  render () {
    return (
      <React.Fragment>
          <Link to={`#`}
            className="item-link"
            value={this.props.item.title}
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
          <Modal.Title>Edit {this.props.item.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <span className="float-left font-weight-bold mr-1">Title:</span>
          <ContentEditable
            html={this.props.item.title}
            innerRef={this.contentEditable}
            onBlur={this.handleBlur}
          />
          <span className="float-left font-weight-bold mr-1">Description:</span>
          <ContentEditable
            html={this.props.item.description}
            innerRef={this.contentEditable}
          />
          <span className="float-left font-weight-bold mr-1">Video ID:</span>
          <ContentEditable
            html={this.props.item.videoID}
            innerRef={this.contentEditable}
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

export default EditItem;
