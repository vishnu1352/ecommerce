import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sendRequestFunc from "../../utils/sendRequestFunc";
import { Button } from "react-bootstrap";
import { BASEURL } from "../../utils/URL";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import './AddInventory.scss';
import { IoMdMenu } from "react-icons/io";
const AddInventory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({
    price: null,
    letter: "",
    imageUrl: "",
    isTransparent: "",
    type: "",
  });
  const [typesDropdown, setTypesDropdown] = useState([]);
  const isTransparentOptions = [
    {value:'--',label:'--'},
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const getItemTypes = async () => {
    const options = [{value:'--',label:'--'}];
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

  const addItemToDb = async () => {
    setLoading(true);
    const response = await sendRequestFunc(`${BASEURL}/addItem`, "POST", item);

    if (response.statusCode === 200) {
      setLoading(false);
      toast.success("Item added successfully...");
      setItem({
        price: 0,
        letter: "",
        imageUrl: "",
        isTransparent: "",
        type: "",
      });
    } else {
      setLoading(false);
      toast.error(response.message);
      
    }
  };

  useEffect(() => {
    getItemTypes();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      {loading && (
        <Modal
          show={loading}
          size="sm"
          aria-labelledby="example-modal-sizes-title-sm"
          centered={true}
        >
          <Modal.Body className="text-center">
            <Spinner animation="border" variant="success" />
          </Modal.Body>
        </Modal>
      )}
      {/* price,letter,isTransparent,type */}
      <div className="container p-3 fs-14 addinventory">
        <div className="d-flex justify-content-between fs-12">
          <Button onClick={() => navigate(-1)} className="fs-12">
            <MdOutlineKeyboardBackspace />
          </Button>

          <div className="fs-12">
            <Dropdown className="options-dropdown">
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                <IoMdMenu />  
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => navigate("/viewinventory")}
                  className="fs-12"
                >
                  View Inventory
                </Dropdown.Item>
                <Dropdown.Item className="fs-12" onClick={() => navigate("/myorders")}>My Orders</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <Card className="shadow mt-3 p-3">
          <h4 className="text-center">Add Items</h4>
          <div>
            <img src={item.imageUrl} alt="" style={{ width: "200px" }} />
          </div>
          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Image Url</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  onChange={handleInput}
                  value={item.imageUrl}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  onChange={handleInput}
                  value={item.price}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Letter</Form.Label>
                <Form.Control
                  type="text"
                  name="letter"
                  onChange={handleInput}
                  value={item.letter}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>IsTransparent</Form.Label>
                <Select
                  options={isTransparentOptions}
                  defaultValue={isTransparentOptions[0]}
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
                  defaultValue={typesDropdown[0]}
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
