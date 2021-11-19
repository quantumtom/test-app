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

  const items = props.items;
  const itemIndex = props.itemIndex;
  const item = items[itemIndex];

  const [
    show,     // Initial value (show = false)
    setShow   // Updates the value for "show"
  ] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const deleteRecord = (recordIndex) => {
    axios.delete(`/v2/adverts/${recordIndex}`)
      .then(() => {
        console.log(`delete record '${recordIndex}'.`)
        forceUpdate();
      });
  }

  const handleDelete = () => {
    console.log('handleDelete', itemIndex);
    deleteRecord(itemIndex);
    handleClose();
  };

  const handleSave = (evt) => {
    console.log(`handleSave: '${evt.currentTarget.innerHTML}'.`);
    handleClose();
  };

  const handleBlur = evt => {
    console.log(`handleBlur: '${evt.target.innerHTML}'.`);
  };

  const handleChange = evt => {
    console.log(`handleChange: '${evt.target.innerHTML}'.`);
    console.dir(evt.target.innerHTML);
  };

  const contentEditable = React.createRef();

  return (
    <React.Fragment>
      <Link to={`#`}
        value="Edit"
        onClick={handleShow}>
        Edit
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
        <ContentEditable
          html={item.title}
          innerRef={contentEditable}
          onChange={handleChange}
          onBlur={handleBlur}
          tagName={'article'} // Use a custom HTML tag (uses a div by default)
          data-value-type='title'
        />
        <ContentEditable
          html={item.description}
          innerRef={contentEditable}
          onChange={handleChange}
          onBlur={handleBlur}
          tagName={'article'} // Use a custom HTML tag (uses a div by default)
          data-value-type='description'
        />
        <ContentEditable
          html={item.videoID}
          innerRef={contentEditable}
          onChange={handleChange}
          onBlur={handleBlur}
          tagName={'article'} // Use a custom HTML tag (uses a div by default)
          data-value-type='videoID'
        />
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
