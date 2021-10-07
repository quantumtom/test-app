import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeleteItem = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const deleteRecord = (recordIndex) => {
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
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
}

export default DeleteItem;
