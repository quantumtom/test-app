import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ContentEditable from "react-contenteditable"
import GetAdvert from "./GetAdvert";

const EditItem = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSave = (evt) => {
    console.log(GetAdvert({advertID: 1}));
    // console.log(evt.currentTarget.innerHTML);
    // item[evt.currentTarget.dataset.valueType] = evt.currentTarget.innerHTML;
    // console.log(item[evt.currentTarget.dataset.valueType]);
  };

  const handleBlur = evt => {
    console.dir(evt);
  };

  const handleChange = evt => {
    console.log('handleChange');
  };

  const items = props.items;
  const itemIndex = props.itemIndex;
  const item = items[itemIndex];

  const contentEditable = React.createRef();

  return (
    <div>
      <Button as="input"
        variant="success"
        type="button"
        value="Edit"
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
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditItem;
