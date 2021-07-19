/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Nav,
  Spinner,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getProduct, postPincode } from '../actions/productidAction';
import ReactSlick from '../components/ReactSlick';
// import Questions from '../components/Questions';
import Ratings from '../components/Ratings';
// import ProductDetails from '../components/ProductDetails';
import { addToCart, getCartItems } from '../actions/cartActions';
import { PINCODE_CHECKED } from '../constants/productidConstants';

// const initialValues = {
//   question: '',
//   review: '',
//   rating: '',
// };

// { history, match }
const ProductScreen = ({ match }) => {
  const [qty, setQty] = useState(1);
  // const [pd, setPd] = useState(false);
  const [rr, setRr] = useState(true);
  // const [q, setQ] = useState(false);
  // const [aaq, setAaq] = useState(false);
  // const [values, setValues] = useState(initialValues);
  // const [questions, setQuestions] = useState([
  //   { question: 'Is it durable ?', answer: 'Yes' },
  // ]);
  const [war, setWar] = useState(false);
  const [disable, setDisable] = useState(false);
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState({
    color: 'red',
    message: '',
  });
  const [options, setOptions] = useState('');
  const [price, setPrice] = useState();
  const [maxQty, setMaxQty] = useState();

  const dispatch = useDispatch();
  const history = useHistory();
  const productId = match.params.id;

  const { loading, data, error } = useSelector(
    (state) => state.productid,
  );
  const { isDeliverable, pincodeLoading } = useSelector(
    (state) => state.checkPincode,
  );
  const { cartLoading, cartData } = useSelector(
    (state) => state.cartAdd,
  );
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (cartData.status === 200) {
      setMessage({
        color: 'green',
        message: 'Added To cart',
      });
    }
  }, [cartData]);

  useEffect(() => {
    if (isDeliverable === false) {
      setMessage({
        color: 'red',
        message: 'This product cannot be delivered to your location',
      });
    } else if (isDeliverable === true) {
      setMessage({
        color: 'green',
        message: 'This product can be delivered to your location',
      });
    }
  }, [isDeliverable]);

  const handleTab = (e) => {
    if (e.target.name === 'pd') {
      // setPd(true);
      setRr(false);
      // setQ(false);
    }
    if (e.target.name === 'rr') {
      setRr(true);
      // setPd(false);
      // setQ(false);
    }
    if (e.target.name === 'q') {
      // setQ(true);
      // setPd(false);
      setRr(false);
    }
  };

  useEffect(() => {
    setMessage({
      color: 'red',
      message: '',
    });
    dispatch({
      type: PINCODE_CHECKED,
    });
    const url = window.location.href;
    const n = url.search('product');
    const id = url.substr(n + 8, url.length);
    const query = ` query{
      getProductById (id: "${id}") {
        _id
        name
        image
        brand {
          name
          _id
        }
        price
        discount
        description
        countInStock
        category {
          name
          _id
        }
        subcategory {
          name
          _id
        }
        options {
          name
          price
          discount
          countInStock
        }
      }
    }`;
    dispatch(getProduct(query));

    const cartQuery = `
    query {
      getCart {
        contents {
          product {
            _id,
            name
          }
          price,
          optionName,
          isOptionSelected
          quantity
        }
      }
    }
    `;
    if (localStorage.getItem('userInfo'))
      dispatch(getCartItems(cartQuery));
  }, [dispatch]);

  useEffect(() => {
    if (data._id) {
      console.log(data);
      if (data.countInStock === 0) {
        setDisable(true);
      }
      setPrice(data.price);
      setMaxQty(data.countInStock);
    }
  }, [data]);

  const handleOption = (e) => {
    setOptions(e.target.value);
    data.options.forEach((option, index) => {
      if (option.name === e.target.value) {
        setPrice(data.options[index].price);
        setMaxQty(data.options[index].countInStock);
        setQty(1);
      }
    });
  };

  const buyNow = () => {
    if (!localStorage.getItem('userInfo')) {
      history.push({
        pathname: '/login',
        state: {
          redirect: `${window.location.pathname}`,
        },
      });
    } else if (isDeliverable === true) {
      const temp = { ...data };
      temp.price = price;
      temp.optionName = options;
      temp.isOptionSelected = options.localeCompare('') !== 0;
      temp.product = {
        _id: data._id,
        name: data.name,
      };
      temp.quantity = qty;
      console.log(temp);
      dispatch({
        type: PINCODE_CHECKED,
      });
      localStorage.setItem('cart', JSON.stringify([temp]));
      history.push('/OrderSummaryScreen');
    } else {
      setMessage({
        color: 'red',
        message:
          'Please check if this product can be delivered to your location by entering your pincode',
      });
    }
  };

  const cartAdd = () => {
    if (!localStorage.getItem('userInfo')) {
      history.push({
        pathname: '/login',
        state: {
          redirect: `${window.location.pathname}`,
        },
      });
    } else if (isDeliverable === true) {
      const mutation = [];
      mutation.push(
        `{product:"${data._id}",isOptionSelected: ${
          options.length !== 0
        }, optionName: "${options}", price: ${price}, quantity: ${qty}}`,
      );
      let added = false;
      cartItems.contents.map((item) => {
        if (
          item.product._id === data._id &&
          item.optionName === options
        ) {
          added = true;
          setMessage({
            color: 'red',
            message: 'Item already present in cart',
          });
        } else {
          mutation.push(
            `{product:"${item.product._id}",isOptionSelected: ${item.isOptionSelected}, optionName: "${item.optionName}", price: ${item.price}, quantity: ${item.quantity}}`,
          );
        }
        return null;
      });

      if (!added) dispatch(addToCart(mutation));
    } else {
      setMessage({
        color: 'red',
        message:
          'Please check if this product can be delivered to your location by entering your pincode',
      });
    }
  };

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Contain>
            <Row style={{ height: '100%' }}>
              <Col lg={5} className="mr-4">
                <div className="img-fluid" style={{ zIndex: '1000' }}>
                  <ReactSlick
                    {...{
                      rimProps: {
                        isHintEnabled: true,
                        shouldHideHintAfterFirstActivation: false,
                        enlargedImagePosition: 'over',
                      },
                    }}
                  />
                </div>
              </Col>
              <div
                style={{
                  borderLeft: '1px solid #929293',
                  height: '95%',
                  borderRadius: '1px',
                  transform: 'translateY(1.8%)',
                }}
              />
              <Col lg={6} className="fluid_instructions">
                <Heading
                  style={{
                    letterSpacing: '0',
                    textTransform: 'none',
                    padding: '0px',
                  }}
                >
                  {data.name}
                </Heading>
                <div
                  style={{
                    paddingTop: '0.5rem',
                    color: '#5F5F5F',
                    fontSize: '1.2rem',
                    transform: 'translateY(-1.5%)',
                  }}
                >
                  {data.brand && data.brand.name}
                </div>
                <Rating value={4.5} text="(4.5)" />
                <Price
                  className="mt-3"
                  style={{
                    color: 'black',
                    fontWeight: '1000',
                  }}
                >
                  Rs {price}
                </Price>
                <div className="mt-4" style={{ fontWeight: '450' }}>
                  {data.description}
                </div>
                <Row className="mt-5">
                  {data.options && data.options.length !== 0 ? (
                    <Col xs={12} md={6}>
                      <Row
                        className="pl-3"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'col',
                        }}
                      >
                        <Parameters
                          className="mr-2"
                          style={{
                            color: 'black',
                            fontWeight: '700',
                          }}
                          htmlFor="size"
                        >
                          Options:
                        </Parameters>
                        <Form.Control
                          as="select"
                          style={{
                            width: 'auto',
                            height: '35px',
                            paddingTop: '0px',
                            paddingBottom: '0px',
                            backgroundColor: '#eceeef',
                          }}
                          id="size"
                          value={options}
                          onChange={(e) => {
                            handleOption(e);
                          }}
                        >
                          <option hidden default>
                            Select Option
                          </option>
                          {data.options &&
                            data.options.map((p, index) => {
                              return (
                                <option value={p.name} key={index}>
                                  {p.name}
                                </option>
                              );
                            })}
                        </Form.Control>
                      </Row>
                    </Col>
                  ) : null}
                  <Col xs={12} md={6}>
                    <QtyRow>
                      <Parameters
                        className="mr-2"
                        style={{
                          color: 'black',
                          fontWeight: '700',
                        }}
                      >
                        Qty:
                      </Parameters>
                      <span
                        className="mr-1"
                        style={{
                          padding: '0px',
                          textAlign: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Button
                          style={{
                            fontSize: '1.5rem',
                            backgroundColor: '#5EAAA8',
                            padding: '0 0.5rem',
                            margin: '0.4rem',
                            width: '1.8rem',
                          }}
                          disabled={qty === 1 || disable}
                          onClick={() => {
                            setQty((qt) => (qt > 1 ? qt - 1 : qt));
                          }}
                        >
                          -
                        </Button>
                      </span>
                      <span
                        className="mr-1"
                        style={{ padding: '0px' }}
                      >
                        <div
                          style={{
                            padding: '0.75rem 1rem',
                            height: '35px',
                            backgroundColor: '#eceeef',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {qty}
                        </div>
                      </span>
                      <span
                        style={{
                          padding: '0px',
                          textAlign: 'center',
                        }}
                      >
                        <Button
                          style={{
                            fontSize: '1.5rem',
                            backgroundColor: '#5EAAA8',
                            padding: '0 0.5rem',
                            margin: '0.4rem',
                            width: '1.8rem',
                          }}
                          disabled={qty === maxQty || disable}
                          onClick={() => {
                            setQty((qt) =>
                              qt < maxQty ? qt + 1 : qt,
                            );
                          }}
                        >
                          +
                        </Button>
                      </span>
                    </QtyRow>
                  </Col>
                </Row>

                <Row
                  className="pl-3"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '3rem',
                  }}
                >
                  <Parameters
                    style={{
                      color: 'black',
                      fontWeight: '700',
                      transform: 'translateY(-30%)',
                    }}
                    className="mr-2"
                  >
                    Delivery:
                  </Parameters>
                  <span>
                    <Form.Control
                      type="text"
                      placeholder="Enter pincode"
                      style={{
                        width: '70%',
                        height: '40px',
                        display: 'inline',
                        backgroundColor: '#eceeef',
                        marginBottom: '0.5rem',
                      }}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                    <Check
                      onClick={() => {
                        if (pincode) {
                          dispatch(postPincode(pincode));
                        } else {
                          setMessage({
                            color: 'red',
                            message: 'Please enter your Pincode',
                          });
                        }
                      }}
                    >
                      CHECK
                    </Check>
                    <br />
                    <span style={{ fontSize: '0.7rem' }}>
                      Enter pincode to check whether delivery is
                      available.
                    </span>
                  </span>
                </Row>
                <FlexBoxRow className="mt-5 mb-4">
                  <FlexBoxCol xs={12} sm={6}>
                    <ActionButtons
                      disabled={disable}
                      style={{ backgroundColor: '#F05454' }}
                      onClick={() => cartAdd()}
                    >
                      Add to Cart
                    </ActionButtons>
                  </FlexBoxCol>
                  <FlexBoxCol xs={12} sm={6}>
                    <ActionButtons
                      disabled={disable}
                      style={{
                        backgroundColor: '#fc7845',
                        marginBottom: '0',
                      }}
                      onClick={() => buyNow()}
                    >
                      Buy Now
                    </ActionButtons>
                  </FlexBoxCol>
                  <FlexBox
                    style={{
                      position: 'absolute',
                      bottom: '-40px',
                      flexDirection: 'column',
                    }}
                  >
                    <span
                      style={{
                        color: `${message.color}`,
                        textAlign: 'center',
                      }}
                    >
                      {message.message}
                    </span>
                    {(pincodeLoading || cartLoading) && (
                      <Spinner
                        animation="border"
                        role="status"
                        style={{
                          width: '20px',
                          height: '20px',
                          margin: 'auto',
                          display: 'block',
                          position: 'absolute',
                          bottom: '-50px',
                        }}
                      />
                    )}
                  </FlexBox>
                </FlexBoxRow>
                <Row>
                  <Col xs={12}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        className="text-danger"
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: '700',
                        }}
                      >
                        {data.countInStock === 0 &&
                          'This product is currently out of stock'}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Contain>
          <Contain className="my-5" style={{ padding: '0px' }}>
            <Nav fill variant="tabs" defaultActiveKey="/home">
              {/* <Nav.Item
                style={{ marginRight: '0', flex: '0 1 auto' }}
              >
                <Links
                  name="pd"
                  onClick={(e) => {
                    handleTab(e);
                  }}
                  style={{
                    backgroundColor: `${pd ? '#F9F9F9' : 'white'}`,
                    fontWeight: '700',
                    padding: '0.7rem 1rem',
                  }}
                >
                  Product Details
                </Links>
              </Nav.Item> */}
              <Nav.Item
                style={{ marginRight: '0', flex: '0 1 auto' }}
              >
                <Links
                  name="rr"
                  onClick={(e) => {
                    handleTab(e);
                  }}
                  style={{
                    backgroundColor: `${rr ? '#F9F9F9' : 'white'}`,
                    fontWeight: '700',
                    padding: '0.7rem 1rem',
                  }}
                >
                  Ratings &amp; Reviews
                </Links>
              </Nav.Item>
              {/* <Nav.Item
                style={{ marginRight: '0', flex: '0 1 auto' }}
              >
                <Links
                  name="q"
                  onClick={(e) => {
                    handleTab(e);
                  }}
                  style={{
                    backgroundColor: `${q ? '#F9F9F9' : 'white'}`,
                    fontWeight: '700',
                    padding: '0.7rem 1rem',
                  }}
                >
                  Questions
                </Links>
              </Nav.Item> */}
            </Nav>
            <Card
              className="p-4"
              style={{ backgroundColor: '#F9F9F9', border: 'none' }}
            >
              {/* {pd && <ProductDetails />} */}
              {rr && (
                <Ratings
                  war={war}
                  setWar={setWar}
                  // handleInputChange={handleInputChange}
                  // values={values}
                  // handleDone={handleDone}
                  productId={productId}
                />
              )}
              {/* {q && (
                <Questions
                  aaq={aaq}
                  setAaq={setAaq}
                  handleInputChange={handleInputChange}
                  handleDone={handleDone}
                  values={values}
                  questions={questions}
                />
              )} */}
            </Card>
          </Contain>
        </>
      )}
    </Box>
  );
};

export default ProductScreen;

const Box = styled.div`
  padding: 0 4vw;

  @media screen and (max-width: 991px) {
    padding: 0;
  }
`;
const Contain = styled.div`
  padding: 3rem;
  background-color: white;
  border: 1px solid #d5d5d5;
  letter-spacing: 0.5px;
  height: auto;
  position: relative;

  @media screen and (max-width: 991px) {
    margin: 0 4vw;
  }
  @media screen and (max-width: 600px) {
    margin: 0;
    padding: 1.7rem;
  }
`;
const Heading = styled.h1`
  margin-top: 0;

  @media screen and (max-width: 992px) {
    margin-top: 5rem;
  }
  @media screen and (max-width: 420px) {
    margin-top: 4rem;
  }
`;
const Price = styled.div`
  font-size: 1.7rem;

  @media screen and (max-width: 600px) {
    font-size: 1.3rem;
  }
`;
const Parameters = styled.label`
  font-size: 1.1rem;

  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;
const Links = styled(Nav.Link)`
  font-size: 1rem;

  @media screen and (max-width: 600px) {
    font-size: 0.7rem;
  }
`;
const QtyRow = styled(Row)`
  display: flex;
  align-items: center;
  flex-direction: col;
  margin-right: 0;
  padding-left: 1rem;

  @media screen and (max-width: 768px) {
    padding-left: 1rem;
    justify-content: start;
    margin-top: 2rem;
  }
`;
const ActionButtons = styled(Button)`
  width: 90%;
  padding: 6px 12px;
  background-color: #fc7845;
  text-transform: none;
  border-radius: 3px;

  &:hover {
    box-shadow: 3px 5px 12px 2px rgba(0, 0, 0, 0.15);
  }

  @media screen and (max-width: 576px) {
    width: 100%;
    margin-bottom: 30px;
  }
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FlexBoxRow = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const FlexBoxCol = styled(Col)`
  padding-left: 0;
  padding-right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Check = styled(Button)`
  width: 30%;
  height: 40px;
  padding: 0px;
  display: inline;
  background-color: #f7f7f9;
  color: black;
  border: 1px solid #eceeef;
  transform: translateY(-2.5px);
`;
