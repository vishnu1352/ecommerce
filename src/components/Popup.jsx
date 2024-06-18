import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { MdCurrencyRupee } from "react-icons/md";
import { Form } from "react-bootstrap";
import "./Popup.scss";
import Modalcomponent from "./Modalcomponent";
import { colorCodes } from "../utils/Colors";

const Popup = ({ toggle, toggleModal, data, doorder }) => {
  const [remarks, setRemarks] = useState("");
  const [district, setDistrict] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [itemPrice, setItemPrice] = useState(data.price);
  const handleInputClick = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the modal
  };
  function handleInputChange(event) {
    setRemarks(event.target.value);
  }
  function handleAddress(event) {
    setAddress(event.target.value);
  }
  function handlePriceBasedOnAddOns(color){
    if(data.isTransparent===true && color!=='Transparent'){
      setItemPrice(Number(data.price)+20)
    }else if(data.isTransparent===false && color==='Transparent'){
      setItemPrice(Number(data.price)-20)
    }else{
      setItemPrice(data.price)
    }
    setSelectedColor(color);
  }

  return (
    <>
      <Modalcomponent
        show={toggle}
        onHide={toggleModal}
        classname="placeorderpopup"
      >
        <div className="d-flex gap-3 align-items-center ">
          <div>
            <a href={data.imageurl} target="_blank" rel="noreferrer">
              <img
                src={data.imageurl}
                alt={data.price}
                width="90px"
                className="popupimage heartbeat"
              />
            </a>
          </div>
          <div>
            <div className="heartbeat">
              <MdCurrencyRupee />
              {itemPrice} <span className="fs-10">+shipping</span>
            </div>
          </div>
        </div>
        <div className="mt-3 fs-14">
          <b>Select Color</b>
        </div>
        <div className="d-flex gap-2">
          {colorCodes.map((color, index) => {
            return (
              <div>
                <div
                  style={{ backgroundColor: color.colorCode }}
                  className={
                    selectedColor === color.name
                      ? "color-selected colorpallatediv fs-8 d-flex align-items-center justify-content-center"
                      : "colorpallatediv fs-8 d-flex align-items-center justify-content-center"
                  }
                  onClick={() =>  handlePriceBasedOnAddOns(color.name)}
                >
                  <div className="text-center">{color.name}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3">
          <Form>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onClick={handleInputClick}
              onChange={(e) => setName(e.target.value)}
              className="mb-3 fs-14"
            />

            <Form.Control
              type="text"
              placeholder="Enter your District"
              value={district}
              onClick={handleInputClick}
              onChange={(e) => setDistrict(e.target.value)}
              className="mb-3 fs-14"
            />

            <Form.Control
              as="textarea"
              rows={3}
              onClick={handleInputClick}
              placeholder="Enter Your Complete Address"
              value={address}
              onChange={handleAddress}
              className="fs-14"
            />

            <Form.Group
              className="mb-3 mt-3 fs-14"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                onClick={handleInputClick}
                placeholder="Remarks and Customizations (mention the name to keep in the letter)"
                value={remarks}
                onChange={handleInputChange}
                className="fs-14"
              />
            </Form.Group>
          </Form>
        </div>
        <div className="d-flex justify-content-end gap-2 fs-14">
          <Button variant="secondary" onClick={toggleModal} className="fs-14">
            Close
          </Button>
          <Button
            variant="primary"
            className="placeorder-button fs-12"
            onClick={() => {
              doorder(
                data.imageurl,
                data.sno,
                itemPrice,
                remarks,
                district,
                name,
                address,
                selectedColor,
                data.letter
              );
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
