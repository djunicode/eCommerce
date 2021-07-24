/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import OrderItem from '../components/OrderItem';
import addAddress from '../actions/checkOutActions';
import { postPincode } from '../actions/productidAction';
import { PINCODE_CHECKED } from '../constants/productidConstants';
import { getUserDetails } from '../actions/userActions';
import { createOrder, payOrder } from '../actions/orderActions';
import useSubscribe from '../hooks/useSubscribe';
import useNotification from '../hooks/useNotification';

function OrderSummaryScreen() {
  const initialValues = {
    state: '',
    city: '',
    postalCode: '',
    address: '',
    saved: false,
  };

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
  const [orderAmount, setOrderAmount] = useState(0);
  const [postalStatus, setPostalStatus] = useState({
    color: 'red',
    message: '',
  });
  const [address, setAddress] = useState([]);
  const [addressOption, setAddressOption] = useState(0);
  const [finalAddress, setFinalAddress] = useState({});
  const [codError, setCodError] = useState({
    color: 'red',
    message: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.userDetails);
  const { isDeliverable, pincodeLoading } = useSelector(
    (state) => state.checkPincode,
  );
  const orderStatus = useSelector((state) => state.orderCreate);

  useEffect(() => {
    if (orderStatus.success) {
      history.push('/');
      setCodError({
        color: 'red',
        message: '',
      });
      Subscribe(
        `Your order for the total of ${orderAmount}Rs has been placed.`,
      );
    } else if (orderStatus.error) {
      setCodError({
        color: 'red',
        message: orderStatus.error,
      });
    }
  }, [orderStatus]);

  useEffect(() => {
    if (isDeliverable === false) {
      setPostalStatus({
        color: 'red',
        message: 'This product cannot be delivered to this location',
      });
    } else if (isDeliverable === true) {
      setP('on');
      setDa('done');
      if (ana) {
        const fAddress = {
          address: values.address,
          city: values.city,
          postalCode: values.postalCode,
        };
        setFinalAddress(fAddress);
      } else if (!ana) {
        setFinalAddress(address[addressOption]);
      }
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
        const addedAddress = `{address: "${values.address}", country: "India", postalCode: "${values.postalCode}", city: "${values.city}"}`;
        address.map((add) => {
          const temp = `{address: "${add.address}", country: "India", postalCode: "${add.postalCode}", city: "${add.city}"}`;
          a.push(temp);
          return null;
        });
        a.push(addedAddress);
        console.log(a);
        dispatch(addAddress(a));
      }
    }
  }, [isDeliverable, dispatch, address, values]);

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem('cart'));
    console.log(c);
    setCart(c);
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      setLoading(false);
      setAddress(user.userAddress);
    }
  }, [user]);

  useEffect(() => {
    if (cart) {
      setOrderAmount(() => {
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
        errors.state === '' &&
        errors.city === '' &&
        errors.postalCode === '' &&
        errors.address === ''
      ) {
        if (isDeliverable.length === 0 || isDeliverable === false) {
          dispatch(postPincode(values.postalCode));
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
          message: 'Please select or add an address',
        });
      } else if (addressOption) {
        dispatch(postPincode(address[addressOption].postalCode));
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
    if ('postalCode' in fieldValues)
      temp.postalCode = fieldValues.postalCode
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

  const handleCOD = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const orderItems = [];
    cart.map((c) => {
      console.log(typeof c.quantity);
      console.log(typeof c.price);
      console.log(typeof c.product._id);
      const add = `{
        qty: ${c.quantity},
        price: ${c.price},
        product: "${c.product._id}",
      }`;
      orderItems.push(add);
      return null;
    });
    const query = `mutation {
      createOrder(orderInput: {
        orderItems: [${orderItems}],
        shippingAddress: {
          address: "${finalAddress.address}",
          city: "${finalAddress.city}",
          postalCode: "${finalAddress.postalCode}",
          country: "India",
        },
        paymentMethod:"Cash",
        paymentResult: {
          id: "",
          status: "pending",
          update_time: "none",
          email_address: "${userInfo.email}"
        },
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: ${orderAmount},
        isPaid: false,
        isDelivered: false,
      }) {
        _id
      }
    }`;
    dispatch(createOrder(query, false));
  };

  // RAZORPAY
  const myAppName = 'PROSHOP';
  const myColor = '#30475E';

  const paymentHandler = async (e) => {
    const API_URL = 'http://localhost:5000/payment/';
    e.preventDefault();
    const orderUrl = `${API_URL}order`;
    if (orderAmount !== 0) {
      const response = await axios.get(orderUrl, {
        params: { amount: orderAmount },
      });
      const { data } = response;
      const options = {
        key: process.env.RAZOR_PAY_KEY_ID,
        name: myAppName,
        order_id: data.id,

        handler: async (response) => {
          try {
            const paymentId = response.razorpay_payment_id;
            const url = `${API_URL}capture/${paymentId}`;
            const captureResponse = await axios.post(url, {
              amount: orderAmount,
            });
            console.log(captureResponse.data);
            if (captureResponse.data) {
              const orderItems = [];
              cart.map((c) => {
                const add = `{
                  qty: ${c.quantity},
                  price: ${c.price},
                  product: "${c.product._id}",
                }`;
                orderItems.push(add);
                return null;
              });
              // CREATEORDER MUTATION
              const createOrderMutation = `mutation {
                createOrder(orderInput: {
                  orderItems: [${orderItems}],
                  shippingAddress: {
                    address: "${finalAddress.address}",
                    city: "${finalAddress.city}",
                    postalCode: "${finalAddress.postalCode}",
                    country: "India",
                  },
                  paymentMethod: "${captureResponse.data.method}",
                  paymentResult: {
                    id: "${captureResponse.data.id}",
                    status: "${captureResponse.data.status}",
                    update_time: "${captureResponse.data.acquirer_data.created_at}",
                    email_address: "${captureResponse.data.email}"
                  },
                  taxPrice: 0,
                  shippingPrice: 0,
                  totalPrice: ${orderAmount},
                  isPaid: true,
                  isDelivered: false,
                }) {
                  _id
                }
              }`;
              dispatch(createOrder(createOrderMutation, false));

              const paidMutation = `mutation {
                updateOrderToPaid(
                  orderId: "${captureResponse.data.order_id}",
                  paymentResult {
                    id: "${captureResponse.data.id}",
                    status: "${captureResponse.data.status}",
                    update_time: "${captureResponse.data.acquirer_data.created_at}",
                    email_address: "${captureResponse.data.email}",
                  }
                ) {
                  _id
                }
              }`;
              dispatch(payOrder(paidMutation, true));

              console.log('successfully paid order');
            }
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
    }
  };

  // NOTIFICATIONS
  const Subscribe = (notification) => {
    useSubscribe();
    useNotification(notification);
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
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
            style={{
              height: 'auto',
              position: 'relative',
            }}
          >
            {p === 'on' && (
              <Back
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
                <h1>Order Summary</h1>
                <hr />
                {cart.map((product, index) => {
                  return (
                    <OrderItem
                      product={product}
                      key={index}
                      indexNo={index}
                    />
                  );
                })}
                <div
                  className="mb-3"
                  style={{ width: '100%', textAlign: 'end' }}
                >
                  <Row>
                    <Col xs={12} style={{ textAlign: 'end' }}>
                      <h2
                        style={{
                          letterSpacing: '0',
                          textTransform: 'none',
                          fontSize: '1.3rem',
                          margin: '1rem 0',
                        }}
                      >
                        Total Amount : Rs {orderAmount}
                      </h2>
                    </Col>
                  </Row>
                  <Button
                    className="btn-danger"
                    style={{
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      letterSpacing: '1px',
                      padding: '0.6rem 2.5rem',
                      marginTop: '1rem',
                    }}
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
                                  style={{
                                    left: '25px',
                                    top: '6px',
                                    cursor: 'pointer',
                                  }}
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
                            name="postalCode"
                            style={{ backgroundColor: 'white' }}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            value={values.postalCode}
                          />
                          <small style={{ color: 'red' }}>
                            {errors.postalCode}
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
                  <StyledButtn
                    variant="danger"
                    onClick={() => handleCOD()}
                  >
                    COD
                  </StyledButtn>
                  <StyledButtn
                    variant="danger"
                    onClick={paymentHandler}
                  >
                    Others
                  </StyledButtn>
                </Stylediv>
                <StyleBox style={{ color: codError.color }}>
                  {codError.message}
                </StyleBox>
              </>
            )}
          </Container>
        </>
      )}
    </div>
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
  left: 1rem;
  border: 1px solid #d4d4d4;
  background: none;
  color: black;
  padding: 0.4rem 1.2rem;
  margin-bottom: 3rem;
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

const StyleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
