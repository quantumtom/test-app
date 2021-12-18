import "./EditItem.css"
import React from "react";
import { Link } from "react-router-dom"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ContentEditable from "react-contenteditable"
import {default as axios} from "axios";
axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class EditItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      newItem: this.props.item
    }

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleShow = () => this.setState({show: true});
  handleClose = () => this.setState({show: false});

  deleteRecord = async () => {
    axios.delete(`/v2/${this.props.listType}/clips/${this.props.item.guid}`)
      .then(() => {
        console.log(`delete record '${this.props.item.guid}'.`)
        this.props.rerenderParentCallback();
      });
  }

  handleDelete = () => {
    this.deleteRecord();
    this.handleClose();
  }

  editRecord = async () => {
    const res = await axios.put(`/v2/${this.props.listType}/clips/${this.props.item.guid}`, this.state.newItem);

    res.then(() => {
        console.log(`edit record '${this.props.item.guid}'.`)
        this.props.rerenderParentCallback();
      });
  }

  handleSave = (evt) => {
    console.log(`handleSave: '${evt.currentTarget.innerHTML}'.`);
    this.editRecord();
    this.handleClose();
  }

  handleBlur = evt => {
    console.dir(evt.target.getAttribute('data-value-type'));
    console.log(`handleBlur: '${evt.target.innerHTML}'.`);
  };

  contentEditable = React.createRef();

  render () {
    return (
      <React.Fragment>
          <Link to={`#`}
            className="item-link"
            value={this.props.item.title}
            onClick={this.handleShow}>
            {this.props.item.title}
          </Link>
        <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit {this.props.item.title} (ID #{this.props.item.guid})</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <strong>Title:</strong>
          <ContentEditable
            html={this.props.item.title}
            innerRef={this.contentEditable}
            onBlur={this.handleBlur}
            // tagName={'article'} // Use a custom HTML tag (uses a div by default)
            data-value-type='title'
          />
          <strong>Description:</strong>
          <ContentEditable
            html={this.props.item.description}
            innerRef={this.contentEditable}
            onBlur={this.handleBlur}
            // tagName={'article'} // Use a custom HTML tag (uses a div by default)
            data-value-type='description'
          />
          <strong>Video ID:</strong>
          <ContentEditable
            html={this.props.item.videoID}
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
            <Button variant="warning" onClick={this.handleDelete}>Delete</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
    )}
}

export default EditItem;
