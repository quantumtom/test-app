import "./EditItem.css"
import React, { useState } from "react";
import { Link } from "react-router-dom"
// import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ContentEditable from "react-contenteditable"
import {default as axios} from "axios";
axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Create a custom useForceUpdate hook with useState
const useForceUpdate = () => useState()[1];

const EditItem = (props) => {
  const forceUpdate = useForceUpdate();

  const item = props.item;
  const itemID = item.guid;
  const listType = props.listType;

  const [
    show,     // Initial value (show = false)
    setShow   // Updates the value for "show"
  ] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const deleteRecord = () => {
    axios.delete(`/v2/${listType}/clips/${itemID}`)
      .then(() => {
        console.log(`delete record '${itemID}'.`)
        forceUpdate();
      });
  }

  const handleDelete = () => {
    deleteRecord();
    handleClose();
  };

  const handleSave = (evt) => {
    console.log(`handleSave: '${evt.currentTarget.innerHTML}'.`);
    handleClose();
  };

  const handleBlur = evt => {
    console.dir(evt.target);
    console.log(`handleBlur: '${evt.target.innerHTML}'.`);
  };

  const handleChange = evt => {
    console.dir(evt.target);
    console.log(`handleChange: '${evt.target.innerHTML}'.`);
  };

  const contentEditable = React.createRef();

  return (
    <React.Fragment>
        <Link to={`#`}
          className="item-link"
          value={item.title}
          onClick={handleShow}>
          {item.title}
        </Link>
      <Modal

      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Record</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <strong>Title:</strong>
        <ContentEditable
          html={item.title}
          innerRef={contentEditable}
          onChange={handleChange}
          onBlur={handleBlur}
          // tagName={'article'} // Use a custom HTML tag (uses a div by default)
          data-value-type='title'
        />
        <strong>Description:</strong>
        <ContentEditable
          html={item.description}
          innerRef={contentEditable}
          onChange={handleChange}
          onBlur={handleBlur}
          // tagName={'article'} // Use a custom HTML tag (uses a div by default)
          data-value-type='description'
        />
        <strong>Video ID:</strong>
        <ContentEditable
          html={item.videoID}
          innerRef={contentEditable}
          onChange={handleChange}
          onBlur={handleBlur}
          // tagName={'article'} // Use a custom HTML tag (uses a div by default)
          data-value-type='videoID'
        />
        <strong>Item ID:</strong>
        <div>{item.guid}</div>
      </Modal.Body>

      <Modal.Footer>
        <ButtonGroup size="sm" aria-label="Cancel or Save Changes">
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="warning" onClick={handleDelete}>Delete</Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  </React.Fragment>
)};

export default EditItem;
