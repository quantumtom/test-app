import React, { useState } from "react";
// import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ContentEditable from "react-contenteditable"

const EditItem = (props) => {
  const [
    show,     // Initial value (show = false)
    setShow   // Updates the value for "show"
  ] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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

  const items = props.items;
  const itemIndex = props.itemIndex;
  const item = items[itemIndex];

  const contentEditable = React.createRef();

  return <React.Fragment>
    <Button as="input"
      variant="success"
      type="button"
      className="mr-3"
      value="Edit" size="sm"
      onClick={handleShow}>
    </Button>

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
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  </React.Fragment>
};

export default EditItem;
