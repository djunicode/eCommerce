/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function NewOptions(props) {
  return (
    <Form>
      <Row xs={1} md={2} lg={4}>
        <Col>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter name"
            name="optName"
            onChange={(e) => {
              props.setOptName(e.target.value);
            }}
          />
          <Form.Control.Feedback
            type="invalid"
            style={{ display: `${props.dropdownError.optionname}` }}
          >
            This field is required
          </Form.Control.Feedback>
        </Col>
        <Col>
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter price"
            name="optPrice"
            // value={props.optPrice}
            // onChange={(e)=>{handleInputChange(e)}}
            onChange={(e) => {
              props.setOptPrice(e.target.value);
            }}
          />
          <Form.Control.Feedback
            type="invalid"
            style={{ display: `${props.dropdownError.optionprice}` }}
          >
            This field is required
          </Form.Control.Feedback>
        </Col>
        <Col>
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter discount"
            name="optDiscount"
            // value={props.optDiscount}
            // onChange={(e)=>{handleInputChange(e)}}
            onChange={(e) => {
              props.setOptDiscount(e.target.value);
            }}
          />
        </Col>
        <Col>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter quantity"
            name="optQty"
            // value={props.optQty}
            // onChange={(e)=>{handleInputChange(e)}}
            onChange={(e) => {
              props.setOptQty(e.target.value);
            }}
          />
          <Form.Control.Feedback
            type="invalid"
            style={{ display: `${props.dropdownError.optionqty}` }}
          >
            This field is required
          </Form.Control.Feedback>
        </Col>
      </Row>
    </Form>
  );
}

export default NewOptions;
