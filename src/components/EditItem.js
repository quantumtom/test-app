import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ContentEditable from "react-contenteditable"


const EditItem = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSave = (evt) => {
    console.log(evt.currentTarget.innerHTML);
    item[evt.currentTarget.dataset.valueType] = evt.currentTarget.innerHTML;
    console.log(item[evt.currentTarget.dataset.valueType]);
  };

  const items = props.items;
  const itemIndex = props.itemIndex;
  const item = items[itemIndex];

  const contentEditable = React.createRef();

  const handleBlur = evt => {
    console.log('handleBlur');
    console.dir(evt);
  };

  return (
    <Container>
      <Button as="input"
        type="button"
        value="Edit Item"
        onClick={handleShow} />
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
            onBlur={handleBlur}
            tagName={'article'} // Use a custom HTML tag (uses a div by default)
            data-value-type='title'
          />
          <ContentEditable
            html={item.description}
            innerRef={contentEditable}
            onBlur={handleBlur}
            tagName={'article'} // Use a custom HTML tag (uses a div by default)
            data-value-type='description'
          />
          <ContentEditable
            html={item.videoID}
            innerRef={contentEditable}
            onBlur={handleBlur}
            tagName={'article'} // Use a custom HTML tag (uses a div by default)
            data-value-type='videoID'
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default EditItem;
