import React, { useState } from "react";
import { Modal, Button, Form } from "reactstrap";

const TagModal = ({ show, handleClose, handleSave }) => {
  const [tagName, setTagName] = useState("");

  const onSave = () => {
    handleSave(tagName);
    setTagName("");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTagName">
            <Form.Label>Tag Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tag name"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TagModal;
