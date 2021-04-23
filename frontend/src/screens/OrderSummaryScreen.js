/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import { setRandomFallback } from 'bcryptjs';
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  // Image,
  // ListGroup,
  Card,
  Button,
  // Form,
} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

// these can be changed
const orderAmount = 50;
const myAppName = 'PROSHOP';
const myDescription = 'Description goes here';
const myColor = '#686CFD';

const paymentHandler = async (e) => {
  const API_URL = 'http://localhost:5000/';
  e.preventDefault();
  const orderUrl = `${API_URL}order`;
  const response = await axios.get(orderUrl, {
    params: { amount: orderAmount },
  });
  const { data } = response;
  const options = {
    key: process.env.RAZOR_PAY_TEST_KEY,
    name: myAppName,
    description: myDescription,
    order_id: data.id,

    handler: async (response) => {
      try {
        const paymentId = response.razorpay_payment_id;
        const url = `${API_URL}capture/${paymentId}`;
        const captureResponse = await axios.post(url, {});
        console.log(captureResponse.data);
      } catch (err) {
        console.log(err);
      }
    },
    theme: {
      color: myColor,
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

const initialValues = {
  name: '',
  number: '',
  email: '',
  state: '',
  city: '',
  pincode: '',
  address: '',
};

function OrderSummaryScreen() {
  const [os, setOs] = useState('on');
  const [da, setDa] = useState('off');
  const [p, setP] = useState('off');
  const [ana, setAna] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleTab = (e) => {
    if (e.target.name === 'order_summary') {
      setOs('done');
      setDa('on');
    }
    if (e.target.name === 'pop' && ana) {
      validate();
      if (
        errors.name === '' &&
        errors.number === '' &&
        errors.email === '' &&
        errors.state === '' &&
        errors.city === '' &&
        errors.pincode === '' &&
        errors.address === ''
      ) {
        setP('on');
        setDa('done');
      } else {
        setMessage('Please fill all the fields correctly');
      }
    } else if (e.target.name === 'pop') {
      setP('on');
      setDa('done');
    }
  };

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'This field is required.';
    if ('number' in fieldValues) {
      temp.number = fieldValues.number
        ? ''
        : 'This field is required.';
      if (temp.number === '') {
        temp.number = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/.test(
          fieldValues.number,
        )
          ? ''
          : 'Invalid Phone Number.';
      }
    }
    if ('email' in fieldValues) {
      temp.email = fieldValues.email ? '' : 'This field is required.';
      if (temp.email === '') {
        temp.email = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
          fieldValues.email,
        )
          ? ''
          : 'Invalid email.';
      }
    }
    if ('state' in fieldValues)
      temp.state = fieldValues.state ? '' : 'This field is required.';
    if ('city' in fieldValues)
      temp.city = fieldValues.city ? '' : 'This field is required.';
    if ('pincode' in fieldValues)
      temp.pincode = fieldValues.pincode
        ? ''
        : 'This field is required.';
    if ('address' in fieldValues)
      temp.address = fieldValues.address
        ? ''
        : 'This field is required.';

    setErrors({
      ...temp,
    });
  };

  const handleBack = (e) => {
    if (e.target.name === 'da') {
      setDa('off');
      setOs('on');
    } else if (e.target.name === 'p') {
      setP('off');
      setDa('on');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  return (
    <>
      <div
        className="m-3"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'translateX(4%)',
        }}
      >
        <span className="mr-5">
          {os === 'on' && <On>1</On>}
          {os === 'off' && <Off>1</Off>}
          {os === 'done' && (
            <i
              style={{ color: 'green', fontSize: '24px' }}
              className="fas fa-check-circle"
            />
          )}
        </span>
        <span className="mr-5">
          {da === 'on' && <On>2</On>}
          {da === 'off' && <Off>2</Off>}
          {da === 'done' && (
            <i
              style={{ color: 'green', fontSize: '24px' }}
              className="fas fa-check-circle"
            />
          )}
        </span>
        <span className="mr-5">
          {p === 'on' && <On>3</On>}
          {p === 'off' && <Off>3</Off>}
          {p === 'done' && (
            <i
              style={{ color: 'green', fontSize: '24px' }}
              className="fas fa-check-circle"
            />
          )}
        </span>
      </div>
      <Container
        className="pb-3"
        style={{
          backgroundColor: 'white',
          border: '1px solid #D5D5D5',
          letterSpacing: '0.5px',
          height: 'auto',
          position: 'relative',
        }}
      >
        {p === 'on' && (
          <Back
            className="btn-danger rounded py-1 px-3"
            name="p"
            onClick={(e) => {
              handleBack(e);
            }}
          >
            <i className="fas fa-arrow-left" />
          </Back>
        )}
        {da === 'on' && (
          <Back
            className="btn-danger rounded py-1 px-3"
            name="da"
            onClick={(e) => {
              handleBack(e);
            }}
          >
            <i className="fas fa-arrow-left" />
          </Back>
        )}

        {os === 'on' && (
          <>
            <h1
              style={{
                letterSpacing: '0',
                textTransform: 'none',
                paddingBottom: '0px',
              }}
            >
              Order Summary
            </h1>
            <hr style={{ marginBottom: '0px' }} />
            <>
              <Row style={{ position: 'relative' }}>
                <Col xs={3} />
                <Col xs={9}>
                  <h1
                    style={{
                      letterSpacing: '0',
                      textTransform: 'none',
                      paddingBottom: '0px',
                    }}
                  >
                    Some Chair
                  </h1>
                  Seller : Some shop name
                  <h1
                    style={{
                      letterSpacing: '0',
                      textTransform: 'none',
                      paddingBottom: '0px',
                      position: 'absolute',
                      top: '0px',
                      right: '25px',
                    }}
                  >
                    Rs 1299
                  </h1>
                </Col>
              </Row>
              <hr />
            </>
            <>
              <Row style={{ position: 'relative' }}>
                <Col xs={3} />
                <Col xs={9}>
                  <h1
                    style={{
                      letterSpacing: '0',
                      textTransform: 'none',
                      paddingBottom: '0px',
                    }}
                  >
                    Some Chair
                  </h1>
                  Seller : Some shop name
                  <h1
                    style={{
                      letterSpacing: '0',
                      textTransform: 'none',
                      paddingBottom: '0px',
                      position: 'absolute',
                      top: '0px',
                      right: '25px',
                    }}
                  >
                    Rs 1299
                  </h1>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs={12} style={{ textAlign: 'end' }}>
                  <h1
                    style={{
                      letterSpacing: '0',
                      textTransform: 'none',
                      paddingBottom: '0px',
                    }}
                  >
                    Amount : Rs 1299
                  </h1>
                </Col>
              </Row>
              <hr />
            </>
            <div
              className="mb-3"
              style={{ width: '100%', textAlign: 'end' }}
            >
              <Button
                className="btn-danger rounded py-1 px-5"
                style={{ textTransform: 'none' }}
                name="order_summary"
                onClick={(e) => {
                  handleTab(e);
                }}
              >
                Continue
              </Button>
            </div>
          </>
        )}
        {da === 'on' && (
          <>
            <h1
              style={{
                letterSpacing: '0',
                textTransform: 'none',
              }}
            >
              Delivery Address
            </h1>
            <>
              <Row>
                <>
                  <Col md={6} style={{ position: 'relative' }}>
                    <Card className="px-3 py-2 mb-3">
                      <span>
                        <i
                          style={{ color: '#5F5F5F' }}
                          className="far fa-circle"
                        />
                        <h5
                          className="ml-1"
                          style={{
                            letterSpacing: '0',
                            textTransform: 'none',
                            paddingBottom: '0px',
                            display: 'inline',
                          }}
                        >
                          Dhiraj Shah
                        </h5>
                        <h5
                          style={{
                            letterSpacing: '0',
                            textTransform: 'none',
                            paddingBottom: '0px',
                            display: 'inline',
                            position: 'absolute',
                            right: '10px',
                          }}
                        >
                          9820560183
                        </h5>
                      </span>
                      <small className="ml-3 mt-2">
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Et eveniet nihil, corporis
                        laboriosam natus iusto dignissimos fugiat,
                        animi nulla rerum, quam accusamus cumque fuga
                        explicabo in dolore exercitationem magnam.
                        Accusamus!
                      </small>
                    </Card>
                  </Col>
                </>
                <>
                  <Col md={6} style={{ position: 'relative' }}>
                    <Card className="px-3 py-2 mb-3">
                      <span>
                        <i
                          style={{ color: '#5F5F5F' }}
                          className="far fa-circle"
                        />
                        <h5
                          className="ml-1"
                          style={{
                            letterSpacing: '0',
                            textTransform: 'none',
                            paddingBottom: '0px',
                            display: 'inline',
                          }}
                        >
                          Dhiraj Shah
                        </h5>
                        <h5
                          style={{
                            letterSpacing: '0',
                            textTransform: 'none',
                            paddingBottom: '0px',
                            display: 'inline',
                            position: 'absolute',
                            right: '10px',
                          }}
                        >
                          9820560183
                        </h5>
                      </span>
                      <small className="ml-3 mt-2">
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Et eveniet nihil, corporis
                        laboriosam natus iusto dignissimos fugiat,
                        animi nulla rerum, quam accusamus cumque fuga
                        explicabo in dolore exercitationem magnam.
                        Accusamus!
                      </small>
                    </Card>
                  </Col>
                </>
              </Row>
            </>
            <div
              className="mb-3 px-3 pt-3 pb-1"
              style={{ width: '100%', backgroundColor: '#F9F9F9' }}
            >
              <span
                style={{ display: 'flex', cursor: 'pointer' }}
                onClick={() => {
                  setAna((a) => !a);
                }}
              >
                <i className="fas fa-plus mr-3" />
                <h6
                  style={{
                    letterSpacing: '0',
                    textTransform: 'none',
                    paddingBottom: '0px',
                    display: 'inline',
                  }}
                >
                  ADD A NEW ADDRESS
                </h6>
              </span>
              {ana && (
                <>
                  <Row className="mt-3">
                    <Col md={4}>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Full Name"
                        name="name"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={values.name}
                      />
                      <small style={{ color: 'red' }}>
                        {errors.name}
                      </small>
                    </Col>
                    <Col md={4}>
                      <label htmlFor="number">Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="number"
                        placeholder="Phone Number"
                        name="number"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={values.number}
                      />
                      <small style={{ color: 'red' }}>
                        {errors.number}
                      </small>
                    </Col>
                    <Col md={4}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="email"
                        name="email"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={values.email}
                      />
                      <small style={{ color: 'red' }}>
                        {errors.email}
                      </small>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={4}>
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="State"
                        name="state"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={values.state}
                      />
                      <small style={{ color: 'red' }}>
                        {errors.state}
                      </small>
                    </Col>
                    <Col md={4}>
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="city"
                        name="city"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={values.city}
                      />
                      <small style={{ color: 'red' }}>
                        {errors.city}
                      </small>
                    </Col>
                    <Col md={4}>
                      <label htmlFor="pincode">Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        placeholder="pincode"
                        name="pincode"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={values.pincode}
                      />
                      <small style={{ color: 'red' }}>
                        {errors.pincode}
                      </small>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={12}>
                      <label htmlFor="address">Address</label>
                      <textarea
                        className="form-control"
                        id="address"
                        rows="3"
                        placeholder="Address"
                        name="address"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={values.address}
                      />
                      <small style={{ color: 'red' }}>
                        {errors.address}
                      </small>
                    </Col>
                  </Row>
                  <Row className="mt-3 mb-2">
                    <div style={{ transform: 'translateX(20%)' }}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        <small>Save this address for future</small>
                      </label>
                    </div>
                  </Row>
                  <div
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      width: '100%',
                    }}
                  >
                    {message}
                  </div>
                </>
              )}
            </div>
            <div
              className="mb-3"
              style={{ width: '100%', textAlign: 'end' }}
            >
              <Button
                className="btn-danger rounded py-1 px-5"
                style={{ textTransform: 'none' }}
                name="pop"
                onClick={(e) => {
                  handleTab(e);
                }}
              >
                Proceed to Payment
              </Button>
            </div>
          </>
        )}
        {p === 'on' && (
          <>
            <Button onClick={paymentHandler} />
          </>
        )}
      </Container>
    </>
  );
}

export default OrderSummaryScreen;

const On = styled.div`
  height: 25px;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #f05454;
  color: white;
`;

const Off = styled.div`
  height: 25px;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #f05454;
  border: 2px solid #f05454;
`;

const Back = styled(Button)`
  text-transform: none;
  position: absolute;
  top: -45px;
  left: 0px;
`;
