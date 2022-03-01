import "./DeleteItem.css";
import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button, ButtonGroup }  from "react-bootstrap";
import { default as axios } from "axios";
import { FcFullTrash } from "react-icons/fc";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class DeleteItem extends React.Component {
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
      .then((res) => {
        this.props.rerenderParentCallback();
      });
  }

  handleDelete = () => {
    this.deleteRecord();
    this.handleClose();
  }

  render() {
    return (
      <React.Fragment>
        <Link to={`#`}
          className="item-link"
          value={this.props.item.title}
          onClick={this.handleShow}>
          <FcFullTrash />
        </Link>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete {this.props.item.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete <b>{this.props.item.title}</b>?</p>
          </Modal.Body>

          <Modal.Footer>
            <ButtonGroup size="sm" aria-label="Cancel or Delete">
              <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
              <Button variant="warning" onClick={this.handleDelete}>Yes, delete</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }

}

export default DeleteItem;
