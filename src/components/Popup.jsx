import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { MdCurrencyRupee } from "react-icons/md";
import { Form } from "react-bootstrap";
import "./Popup.scss";
import Modalcomponent from "./Modalcomponent";
import { colorCodes } from "../utils/Colors";
import { useNavigate } from "react-router-dom";

const Popup = ({ toggle, toggleModal, data, doorder }) => {
  const [showColors, setShowColors] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [district, setDistrict] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [itemPrice, setItemPrice] = useState(data.price);
  const [nameOnItem, setNameOnItem] = useState("");
  const [reconfirmState, setReConfirmState] = useState({
    sno: data._id,
    image: data.imageUrl,
    itemPrice: data.price,
    remarks: "",
    district: "",
    name: "",
    address: "",
    phone: "",
    selectedColor: "transparent",
    letter: data.letter.toUpperCase(),
    nameOnItem: "",
    type:data.type,
  });
  const navigate = useNavigate();
  const handleInputClick = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the modal
  };
  function handleInputChange(event) {
    setRemarks(event.target.value);
    setReConfirmState((prev) => ({
      ...prev,
      remarks: event.target.value,
    }));
  }
  function handleAddress(event) {
    setAddress(event.target.value);
    setReConfirmState((prev) => ({ ...prev, address: event.target.value }));
  }
  function handlePriceBasedOnAddOns(color) {
    if (data.isTransparent === true && color !== "Transparent") {
      setItemPrice(Number(data.price) + 20);
      setReConfirmState((prev) => ({
        ...prev,
        itemPrice: Number(data.price) + 20,
      }));
    } else if (data.isTransparent === false && color === "Transparent") {
      setItemPrice(Number(data.price) - 20);
      setReConfirmState((prev) => ({
        ...prev,
        itemPrice: Number(data.price) - 20,
      }));
    } else {
      setItemPrice(data.price);
      setReConfirmState((prev) => ({ ...prev, itemPrice: Number(data.price) }));
    }
    setSelectedColor(color);
    setReConfirmState((prev) => ({ ...prev, selectedColor: color }));
  }

  function redirectToReConfirmPage() {
    // if (reconfirmState.nameOnItem === "") {
    //   alert("Please Enter The Name You Want To Display On Item");
    //   return false;
    // }
    if (reconfirmState.name === "") {
      alert("Please Enter Your Name");
      return false;
    }
    if (reconfirmState.district === "") {
      alert("Please Enter District");
      return false;
    }
    if (reconfirmState.address === "") {
      alert("Please Enter address");
      return false;
    }

    if(reconfirmState.phone.length>10 || reconfirmState.phone.length<10){
      alert("Please Enter valid 10 digits phone number");
      return false;
    }

    navigate("/reconfirm", { state: { reconfirmState } });
  }

  useEffect(() => {
    if (data.type === "keychain" || data.type === "locket") {
      setShowColors(true);
    }
  }, []);
  return (
    <>
      <Modalcomponent
        show={toggle}
        onHide={toggleModal}
        classname="placeorderpopup"
      >
        <div className="d-flex gap-3 align-items-center ">
          <div>
            <a href={data.imageUrl} target="_blank" rel="noreferrer">
              <img
                src={data.imageUrl}
                alt={data.price}
                width="50px"
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
        <div className="placeorderdiv">
          {showColors && (
            <div>
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
                        onClick={() => handlePriceBasedOnAddOns(color.name)}
                      >
                        <div className="text-center">{color.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="mt-3">
            <Form>
              <Form.Control
                type="text"
                placeholder="Enter Name You Want On Item (optional)"
                value={nameOnItem}
                onClick={handleInputClick}
                onChange={(e) => {
                  setNameOnItem(e.target.value);
                  setReConfirmState((prev) => ({
                    ...prev,
                    nameOnItem: e.target.value,
                  }));
                }}
                className="mb-3 fs-14"
              />

              <Form.Group
                className="mb-3 mt-3 fs-14"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={3}
                  onClick={handleInputClick}
                  placeholder="Remarks and Customizations"
                  value={remarks}
                  onChange={handleInputChange}
                  className="fs-14"
                />
              </Form.Group>

              <div className="mt-3 fs-14">
                <b>Enter Your Address</b>
              </div>

              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onClick={handleInputClick}
                onChange={(e) => {
                  setName(e.target.value);
                  setReConfirmState((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
                className="mb-3 fs-14"
              />

              <Form.Control
                type="number"
                placeholder="Enter Your Phone Number"
                value={phone}
                onClick={handleInputClick}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setReConfirmState((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }));
                }}
                className="mb-3 fs-14"
              />

              <Form.Control
                type="text"
                placeholder="Enter your District"
                value={district}
                onClick={handleInputClick}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setReConfirmState((prev) => ({
                    ...prev,
                    district: e.target.value,
                  }));
                }}
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
            </Form>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-2 fs-14 mt-3">
          <Button variant="secondary" onClick={toggleModal} className="fs-14">
            Close
          </Button>
          <Button
            variant="primary"
            className="placeorder-button fs-12"
            onClick={() => {
              redirectToReConfirmPage();
            }}
          >
            Continue
          </Button>
        </div>
      </Modalcomponent>
    </>
  );
};

export default Popup;
