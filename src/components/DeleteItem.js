import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import {default as axios} from "axios";
axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const DeleteItem = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const deleteRecord = (recordIndex) => {
    axios.delete(`/v2/adverts/{recordIndex}`)
      .then();
    console.log(`delete record '${recordIndex}'.`)
  }

  const itemIndex = props.itemIndex;

  const handleDelete = evt => {
    console.log('handleDelete');
    deleteRecord(itemIndex);
    handleClose();
  };

  return <React.Fragment>
      <Button as="input"
        variant="danger"
        type="button"
        className="mr-3"
        value="Delete"
        size="sm"
        onClick={handleShow} />
      <Modal
        id={`deleteItem`}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Record</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete this record?
        </Modal.Body>

        <Modal.Footer>
          <ButtonGroup size="sm" aria-label="Cancel or Delete">
            <Button variant="danger" onClick={handleDelete}>Yes, delete it.</Button>
            <Button variant="secondary" onClick={handleClose}>No, stop!</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
}

export default DeleteItem;
