import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
const AddItems = () => {
  return (
    <>
    {/* price,letter,isTransparent,type */}
      <div className="container">
        <Card className="shadow mt-3 p-3">
          <h4 className="text-center">Add Items</h4>
          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Image Url</Form.Label>
                <Form.Control type="text"  />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number"  />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Letter</Form.Label>
                <Form.Control type="text"  />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>IsTransparent</Form.Label>
                <Form.Control type="text"  />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Type</Form.Label>
                <Form.Control type="number"  />
              </Form.Group>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default AddItems;
