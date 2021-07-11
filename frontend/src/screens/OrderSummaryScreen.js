/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import { setRandomFallback } from 'bcryptjs';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
// import { set } from 'mongoose';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import OrderItem from '../components/OrderItem';
import addAddress from '../actions/checkOutActions';
import { postPincode } from '../actions/productidAction';
import { PINCODE_CHECKED } from '../constants/productidConstants';
import { getUserDetails } from '../actions/userActions';

// these can be changed
const orderAmount = 50;
const myAppName = 'PROSHOP';
const myDescription = 'Description goes here';
const myColor = '#30475E';

const paymentHandler = async (e) => {
  const API_URL = 'http://localhost:5000/payment/';
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
  // name: '',
  // number: '',
  // email: '',
  state: '',
  city: '',
  pincode: '',
  address: '',
  saved: false,
};

function OrderSummaryScreen() {
  const [os, setOs] = useState('on');
  const [da, setDa] = useState('off');
  const [p, setP] = useState('off');
  const [ana, setAna] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({
    color: 'red',
    message: '',
  });
  const [cart, setCart] = useState('');
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [postalStatus, setPostalStatus] = useState({
    color: 'red',
    message: '',
  });
  const [address, setAddress] = useState([]);
  const [addressOption, setAddressOption] = useState(0);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userDetails);
  const { isDeliverable, pincodeLoading } = useSelector(
    (state) => state.checkPincode,
  );

  useEffect(() => {
    if (isDeliverable === false) {
      setPostalStatus({
        color: 'red',
        message: 'This product cannot be delivered to your location',
      });
    } else if (isDeliverable === true) {
      setP('on');
      setDa('done');
      setPostalStatus({
        color: 'red',
        message: '',
      });
      setMessage({
        color: 'red',
        message: '',
      });
      dispatch({
        type: PINCODE_CHECKED,
      });

      if (values.saved) {
        const a = [];
        const addedAddress = `{address: "${values.address}", country: "India", postalCode: "${values.pincode}", city: "${values.city}"}`;
        address.map((add) => {
          const temp = `{address: "${add.address}", country: "India", postalCode: "${add.pincode}", city: "${add.city}"}`;
          a.push(temp);
          return null;
        });
        a.push(addedAddress);
        console.log(a);
        dispatch(addAddress(a));
      }
    }
  }, [isDeliverable]);

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem('cart'));
    console.log(c);
    setCart(c);
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      setLoading(false);
      setAddress(user.userAddress);
    }
  }, [user]);

  useEffect(() => {
    if (cart) {
      setAmount(() => {
        let temp = 0;
        cart.map((product) => {
          temp += product.price;
          return null;
        });
        temp = temp.toFixed(2);
        return temp;
      });
    }
  }, [cart]);

  const handleTab = (e) => {
    if (e.target.name === 'order_summary') {
      setOs('done');
      setDa('on');
    }
    if (e.target.name === 'pop' && ana) {
      validate();
      if (
        // errors.name === '' &&
        // errors.number === '' &&
        // errors.email === '' &&
        errors.state === '' &&
        errors.city === '' &&
        errors.pincode === '' &&
        errors.address === ''
      ) {
        if (isDeliverable.length === 0 || isDeliverable === false) {
          dispatch(postPincode(values.pincode));
        } else if (isDeliverable === true) {
          setP('on');
          setDa('done');
          setPostalStatus({
            color: 'red',
            message: '',
          });
        }
      } else {
        setMessage({
          color: 'red',
          message: 'Please fill all the fields correctly',
        });
      }
    } else if (e.target.name === 'pop' && !ana) {
      if (!addressOption) {
        setPostalStatus({
          color: 'red',
          message: 'Please select an address',
        });
      } else if (addressOption) {
        setP('on');
        setDa('done');
        console.log(address[addressOption]);
      }
    }
  };

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
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

  const handleBack = (name) => {
    if (name === 'da') {
      setDa('off');
      setOs('on');
    } else if (name === 'p') {
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
      {loading ? (
        <Loader />
      ) : (
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
                onClick={() => {
                  handleBack('p');
                }}
              >
                <i
                  className="fas fa-arrow-left"
                  onClick={() => {
                    handleBack('p');
                  }}
                />
              </Back>
            )}
            {da === 'on' && (
              <Back
                className="btn-danger rounded py-1 px-3"
                name="da"
                onClick={() => {
                  handleBack('da');
                }}
              >
                <i
                  className="fas fa-arrow-left"
                  onClick={() => {
                    handleBack('da');
                  }}
                />
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
                {cart.map((product, index) => {
                  return <OrderItem product={product} key={index} />;
                })}
                <div
                  className="mb-3"
                  style={{ width: '100%', textAlign: 'end' }}
                >
                  <Row>
                    <Col xs={12} style={{ textAlign: 'end' }}>
                      <h1
                        style={{
                          letterSpacing: '0',
                          textTransform: 'none',
                          paddingBottom: '0px',
                        }}
                      >
                        Amount : Rs {amount}
                      </h1>
                    </Col>
                  </Row>
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
                    {address.length !== 0 &&
                      address.map((add, index) => {
                        return (
                          <Col
                            md={6}
                            style={{ position: 'relative' }}
                            key={index}
                          >
                            <Card className="px-3 py-2 mb-3">
                              <span>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={index}
                                  id="flexRadioDefault1"
                                  style={{ left: '25px', top: '6px' }}
                                  checked={
                                    typeof addressOption ===
                                      'string' &&
                                    index === Number(addressOption)
                                  }
                                  onChange={(e) => {
                                    setAddressOption(e.target.name);
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault1"
                                >
                                  <h5
                                    className="ml-3"
                                    style={{
                                      letterSpacing: '0',
                                      textTransform: 'none',
                                      paddingBottom: '0px',
                                      display: 'inline',
                                    }}
                                  >
                                    {add.city}
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
                                    {add.postalCode}
                                  </h5>
                                  <small
                                    className="ml-3 mt-2"
                                    style={{ display: 'block' }}
                                  >
                                    {add.address}
                                  </small>
                                </label>
                              </span>
                            </Card>
                          </Col>
                        );
                      })}
                  </Row>
                </>
                <div
                  className="mb-3 px-3 pt-3 pb-2"
                  style={{
                    width: '100%',
                    backgroundColor: '#F9F9F9',
                  }}
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
                    <div style={{ position: 'relative' }}>
                      {/* <Row className="mt-3">
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
                      </Row> */}
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
                            checked={values.saved}
                            onChange={() => {
                              setValues((t) => {
                                const temp = { ...t };
                                temp.saved = !temp.saved;
                                return temp;
                              });
                            }}
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            <small>
                              Save this address for future
                            </small>
                          </label>
                        </div>
                        <Button
                          className="btn-danger rounded py-1 px-5"
                          style={{
                            textTransform: 'none',
                            position: 'absolute',
                            right: '0',
                          }}
                          name="pop"
                          onClick={() => setAna(false)}
                        >
                          Cancel
                        </Button>
                      </Row>
                      <div
                        style={{
                          color: message.color,
                          textAlign: 'center',
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {message.message}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: postalStatus.color,
                  }}
                >
                  {postalStatus.message}
                  {pincodeLoading && (
                    <Spinner
                      animation="border"
                      role="status"
                      style={{
                        width: '20px',
                        height: '20px',
                        margin: 'auto',
                        display: 'block',
                      }}
                    />
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
                <h1
                  style={{
                    letterSpacing: '0',
                    textTransform: 'none',
                  }}
                >
                  Payment Options
                </h1>
                <Stylediv>
                  <StyledButtn variant="danger">COD</StyledButtn>
                  <StyledButtn
                    variant="danger"
                    onClick={paymentHandler}
                  >
                    Others
                  </StyledButtn>
                </Stylediv>
              </>
            )}
          </Container>
        </>
      )}
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

const StyledButtn = styled(Button)`
  border-radius: 4px;
  margin-top: 12px;
`;

const Stylediv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
