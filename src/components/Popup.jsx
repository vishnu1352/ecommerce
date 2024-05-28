import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { MdCurrencyRupee } from "react-icons/md";
import { Form } from "react-bootstrap";
import './Popup.scss'
import Modalcomponent from "./Modalcomponent";

const Popup = ({ toggle, toggleModal, data, doorder }) => {
  const [remarks, setRemarks] = useState("");
  const [district,setDistrict] = useState("");
  const handleInputClick = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the modal
  };
  function handleInputChange(event) {
    setRemarks(event.target.value);
  }
  console.log(data);
  return (
    <>
    <Modalcomponent show={toggle}
      onHide={toggleModal}
      
      classname="placeorderpopup" >
      <div className="d-flex gap-3 align-items-center ">
          <div>
            <img src={data.imageurl} alt={data.price} width="90px" className="popupimage"/>
          </div>
          <div>
            <div>
              <MdCurrencyRupee />
              {data.price} <span className="fs-10">+shipping</span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Form>
          <Form.Control type="text" placeholder="Enter your District" value={district} onClick={handleInputClick} onChange={(e)=>setDistrict(e.target.value)} className="mb-3"/>
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
        <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
        <Button
          variant="primary"
          className="placeorder-button"
          onClick={() => {
            doorder(data.imageurl, data.price, remarks,district);
            setRemarks("");
          }}
        >
          Place Order
        </Button>
        </div>
    </Modalcomponent>
    
    </>
  );
};

export default Popup;
