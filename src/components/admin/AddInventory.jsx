import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import sendRequestFunc from "../../utils/sendRequestFunc";
import { Button } from "react-bootstrap";
import { BASEURL } from "../../utils/URL";
const AddInventory = () => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({
    price: 0,
    letter: "",
    imageUrl: "",
    isTransparent: "",
    type: "",
  });
  const [typesDropdown, setTypesDropdown] = useState([]);
  const isTransparentOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const getItemTypes = async () => {
    const options = [];
    const response = await sendRequestFunc(`${BASEURL}/getItemTypes`, "GET");
    if (response) setLoading(false);
    await response.forEach((type) =>
      options.push({ value: type.type, label: type.type })
    );
    setTypesDropdown(options);
  };

  const handleInput = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleIsTransparentDropdown = (e) => {
    setItem({ ...item, isTransparent: e.value });
  };
  const handleTypeDropdown = (e) => {
    setItem({ ...item, type: e.value });
  };

  const addItemToDb = () => {
    setLoading(true);
    const response = sendRequestFunc(`${BASEURL}/addItem`, "POST", item);
    if (response) setLoading(false);
    console.log(response);
  };

  useEffect(() => {
    getItemTypes();
  }, []);

  return (
    <>
      {loading && (
        <Modal show={loading} size="sm" aria-labelledby="example-modal-sizes-title-sm" centered={true}>
          <Modal.Body className="text-center">
            <Spinner
              animation="border"
              variant="success"
              
            />
          </Modal.Body>
        </Modal>
      )}
      {/* price,letter,isTransparent,type */}
      <div className="container">
        <Card className="shadow mt-3 p-3">
          <h4 className="text-center">Add Items</h4>
          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Image Url</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  onChange={handleInput}
                  value={setItem.imageUrl}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  onChange={handleInput}
                  value={setItem.price}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Letter</Form.Label>
                <Form.Control
                  type="text"
                  name="letter"
                  onChange={handleInput}
                  value={setItem.letter}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>IsTransparent</Form.Label>
                <Select
                  options={isTransparentOptions}
                  name="isTransparent"
                  onChange={handleIsTransparentDropdown}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Type</Form.Label>
                <Select
                  options={typesDropdown}
                  name="type"
                  onChange={handleTypeDropdown}
                />
              </Form.Group>
            </Row>
            <Button className="col-lg-6 w-100" onClick={addItemToDb}>
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default AddInventory;
