import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdCurrencyRupee } from "react-icons/md";
import { Form } from "react-bootstrap";

const Popup = ({ toggle, toggleModal, data, doorder }) => {
  const [remarks, setRemarks] = useState("");
  const handleInputClick = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the modal
  };
  function handleInputChange(event) {
    setRemarks(event.target.value);
  }
  return (
    <Modal
      show={toggle}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex gap-3 align-items-center">
          <div>
            <img src={data.imageurl} alt={data.price} width="50px" />
          </div>
          <div>
            <div>
              <MdCurrencyRupee />
              {data.price}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                onClick={handleInputClick}
                placeholder="Remarks and Customizations"
                value={remarks}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            doorder(data.imageurl, data.price, remarks);
            setRemarks("");
          }}
        >
          Place Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
