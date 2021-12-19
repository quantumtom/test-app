import "./EditItem.css"
import React from "react";
import { Link } from "react-router-dom"
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import ContentEditable from "react-contenteditable"
import { default as axios } from "axios";

axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class EditItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    }

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleShow = () => this.setState({show: true});
  handleClose = () => this.setState({show: false});

  deleteRecord = () => {
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

  saveRecord = () => {
    axios.put(`/v2/${this.props.listType}/clips/${this.props.item.guid}`, this.props.item)
      .then((res) => {
        // console.log(`edit record '${this.props.item.guid}'.`)
        this.props.rerenderParentCallback();
        // console.log(res);
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
        this.props.item.title = evt.target.innerHTML;
        break;
      case 'description':
        this.props.item.description = evt.target.innerHTML;
        break;
      case 'videoID':
        this.props.item.videoID = evt.target.innerHTML;
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
          <Modal.Title>Edit {this.props.item.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <span className="float-left font-weight-bold mr-1">Title:</span>
          <ContentEditable
            html={this.props.item.title}
            innerRef={this.contentEditable}
            onBlur={this.handleBlur}
            // tagName={'article'} // Use a custom HTML tag (uses a div by default)
            data-value-type='title'
          />
          <span className="float-left font-weight-bold mr-1">Description:</span>
          <ContentEditable
            html={this.props.item.description}
            innerRef={this.contentEditable}
            onBlur={this.handleBlur}
            // tagName={'article'} // Use a custom HTML tag (uses a div by default)
            data-value-type='description'
          />
          <span className="float-left font-weight-bold mr-1">Video ID:</span>
          <ContentEditable
            html={this.props.item.videoID}
            innerRef={this.contentEditable}
            onBlur={this.handleBlur}
            // tagName={'article'} // Use a custom HTML tag (uses a div by default)
            data-value-type='videoID'
          />
          {/*<span className="float-left font-weight-bold mr-1">Record ID:</span>*/}
          {/*<div>{this.props.item.guid}</div>*/}
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
