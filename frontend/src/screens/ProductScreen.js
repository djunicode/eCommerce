/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Nav,
} from 'react-bootstrap';
import ReactImageMagnify from 'react-image-magnify';
// import { set } from 'mongoose';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import watchImg687 from '../images/wristwatch_687.jpg';
import watchImg1200 from '../images/wristwatch_1200.jpg';
import { getProduct } from '../actions/productidAction';
import Review from '../components/Review';
import Question from '../components/Question';

const initialValues = {
  question: '',
  review: '',
  rating: '',
};

// { history, match }
const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [pd, setPd] = useState(true);
  const [rr, setRr] = useState(false);
  const [q, setQ] = useState(false);
  const [aaq, setAaq] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [questions, setQuestions] = useState([
    { question: 'Is it durable ?', answer: 'Yes' },
  ]);
  const [war, setWar] = useState(false);

  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.productid,
  );

  const handleTab = (e) => {
    if (e.target.name === 'pd') {
      setPd(true);
      setRr(false);
      setQ(false);
    }
    if (e.target.name === 'rr') {
      setRr(true);
      setPd(false);
      setQ(false);
    }
    if (e.target.name === 'q') {
      setQ(true);
      setPd(false);
      setRr(false);
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const n = url.search('product');
    const id = url.substr(n + 8, url.length);
    console.log(id);
    const query = ` query{
      getProductById (id: "${id}") {
          _id
          name
          discount
          price
          discountedPrice
          user {
              _id
              name
              phoneNo
              email
              password
              isAdmin
              token
          }
          image
          brand {
              _id
              name
          }
          category {
              _id
              name
          }
          subcategory {
              _id
              name
          }
          new
          countInStock
          numReviews
          reviews {
              name
              rating
              comment
              user
          }
          description
      }
  }`;
    dispatch(getProduct(query));
  }, []);

  useEffect(() => {
    if (data.brand) {
      console.log(data.brand.name);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDone = () => {
    if (values.question) {
      setQuestions((q) => {
        setAaq(false);
        return [
          { question: values.question, answer: 'None Yet' },
          ...q,
        ];
      });
    }
    setValues((v) => ({ ...v, question: '' }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Container
            fluid
            style={{
              backgroundColor: 'white',
              border: '1px solid #D5D5D5',
              letterSpacing: '0.5px',
              height: 'auto',
            }}
          >
            <Row style={{ height: '100%' }}>
              <Col lg={6}>
                <div className="img-fluid" style={{ zIndex: '1000' }}>
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: watchImg687,
                        width: '100%',
                        height: 'auto',
                      },
                      largeImage: {
                        src: watchImg1200,
                        width: 1200,
                        height: 1800,
                      },
                      enlargedImagePosition: 'over',
                    }}
                    style={{ zIndex: '10000' }}
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
              <Col lg={5} className="fluid_instructions">
                <h1
                  style={{
                    letterSpacing: '0',
                    textTransform: 'none',
                    paddingBottom: '0px',
                  }}
                >
                  {data.name}
                </h1>
                <small
                  style={{
                    paddingTop: '0px',
                    color: '#5F5F5F',
                    fontSize: '0.9rem',
                    transform: 'translateY(-1.5%)',
                  }}
                >
                  {data.brand && data.brand.name}
                </small>
                <Rating value={4.5} text="(4.5)" />
                <div
                  className="mt-3"
                  style={{ color: '#222831', fontWeight: '450' }}
                >
                  <span
                    style={{
                      color: 'black',
                      fontWeight: '1000',
                      fontSize: '1.4rem',
                      marginBottom: '1000px',
                    }}
                  >
                    Rs {data.price}
                  </span>
                  <br />
                  {data.description}
                </div>
                <Row className="mt-3">
                  <Col xs={6}>
                    <Row
                      className="pl-3"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <label
                        className="mr-2"
                        style={{
                          color: 'black',
                          fontWeight: '1000',
                          fontSize: '1.1rem',
                        }}
                        htmlFor="size"
                      >
                        Size:
                      </label>
                      <Form.Control
                        as="select"
                        value={4}
                        onChange={(e) => setQty(e.target.value)}
                        style={{
                          width: 'auto',
                          paddingTop: '0px',
                          paddingBottom: '0px',
                          backgroundColor: '#eceeef',
                        }}
                        id="size"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                      </Form.Control>
                    </Row>
                  </Col>
                  <Col xs={6}>
                    <Row
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'col',
                      }}
                    >
                      <span
                        className="mr-2"
                        style={{
                          color: 'black',
                          fontWeight: '1000',
                          fontSize: '1.1rem',
                        }}
                      >
                        Qty:
                      </span>
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
                        {/* <i
                          className="fas fa-minus-square"
                          style={{
                            fontSize: '2rem',
                            color: '#5EAAA8',
                          }}
                          onClick={() => {
                            setQty((qt) => (qt > 1 ? qt - 1 : qt));
                          }}
                        /> */}
                        <Button
                          className="rounded py-1"
                          style={{
                            fontSize: '2rem',
                            backgroundColor: '#5EAAA8',
                            paddingRight: '0.7rem',
                            paddingLeft: '0.7rem',
                          }}
                          disabled={qty === 1}
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
                        {/* <i
                          className="fas fa-plus-square"
                          style={{
                            fontSize: '2rem',
                            color: '#5EAAA8',
                          }}
                          onClick={() => {
                            setQty((qt) =>
                              qt < data.countInStock ? qt + 1 : qt,
                            );
                          }}
                        /> */}
                        <Button
                          className="rounded px-2 py-1"
                          style={{
                            fontSize: '2rem',
                            backgroundColor: '#5EAAA8',
                          }}
                          disabled={qty === data.countInStock}
                          onClick={() => {
                            setQty((qt) =>
                              qt < data.countInStock ? qt + 1 : qt,
                            );
                          }}
                        >
                          +
                        </Button>
                      </span>
                    </Row>
                  </Col>
                </Row>

                <Row
                  className="mt-4 pl-3"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <label
                    style={{
                      color: 'black',
                      fontWeight: '1000',
                      fontSize: '1.1rem',
                      transform: 'translateY(-30%)',
                    }}
                    className="mr-2"
                  >
                    Delivery:
                  </label>
                  <span style={{ width: '70%' }}>
                    <Form.Control
                      type="text"
                      placeholder="Enter pincode"
                      className="rounded-left"
                      style={{
                        width: '80%',
                        display: 'inline',
                        backgroundColor: '#eceeef',
                      }}
                    />
                    <Button
                      className="rounded-right"
                      style={{
                        width: '20%',
                        padding: '0px',
                        display: 'inline',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        backgroundColor: '#f7f7f9',
                        color: 'black',
                      }}
                    >
                      CHECK
                    </Button>
                    <br />
                    <span style={{ fontSize: '0.7rem' }}>
                      Enter pincode to check whther delivery is
                      available.
                    </span>
                  </span>
                </Row>
                <Row
                  className="mt-3 mb-4"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Col xs={6} style={{ textAlign: 'center' }}>
                    <Button
                      className="rounded"
                      style={{
                        width: '70%',
                        padding: '6px 12px',
                        backgroundColor: '#F05454',
                        textTransform: 'none',
                      }}
                      onClick={() => {
                        localStorage.setItem(
                          'product',
                          JSON.stringify(data),
                        );
                        if (localStorage.getItem('product'))
                          window.location.href = '/cart';
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Col>
                  <Col xs={6} style={{ textAlign: 'center' }}>
                    <Button
                      className="rounded"
                      style={{
                        width: '70%',
                        padding: '6px 12px',
                        backgroundColor: '#FC7845',
                        textTransform: 'none',
                      }}
                    >
                      Buy Now
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <Container className="my-5" style={{ padding: '0px' }}>
            <Nav fill variant="tabs" defaultActiveKey="/home">
              <Nav.Item
                style={{ marginRight: '0', flex: '0 1 auto' }}
              >
                <Nav.Link
                  name="pd"
                  onClick={(e) => {
                    handleTab(e);
                  }}
                  style={{
                    backgroundColor: `${pd ? '#F9F9F9' : 'white'}`,
                    fontWeight: '700',
                    padding: '0.4rem 0.5rem',
                  }}
                >
                  Product Details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                style={{ marginRight: '0', flex: '0 1 auto' }}
              >
                <Nav.Link
                  name="rr"
                  onClick={(e) => {
                    handleTab(e);
                  }}
                  style={{
                    backgroundColor: `${rr ? '#F9F9F9' : 'white'}`,
                    fontWeight: '700',
                    padding: '0.4rem 0.5rem',
                  }}
                >
                  Ratings &amp; Reviews
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                style={{ marginRight: '0', flex: '0 1 auto' }}
              >
                <Nav.Link
                  name="q"
                  onClick={(e) => {
                    handleTab(e);
                  }}
                  style={{
                    backgroundColor: `${q ? '#F9F9F9' : 'white'}`,
                    fontWeight: '700',
                    padding: '0.4rem 0.5rem',
                  }}
                >
                  Questions
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Card
              className="p-4"
              style={{ backgroundColor: '#F9F9F9', border: 'none' }}
            >
              {pd && (
                <>
                  <span
                    style={{
                      color: '#30475E',
                      letterSpacing: '0',
                      fontWeight: '600',
                    }}
                  >
                    GENERAL
                  </span>
                  <Row className="mt-3">
                    <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
                      Ideal For
                    </Col>
                    <Col
                      xs={7}
                      md={10}
                      style={{ color: 'black', fontWeight: '600' }}
                    >
                      Men and women, boys, girls, unisex
                    </Col>
                  </Row>
                  <Row className="my-1">
                    <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
                      Shape
                    </Col>
                    <Col
                      xs={7}
                      md={10}
                      style={{ color: 'black', fontWeight: '600' }}
                    >
                      Rectangle
                    </Col>
                  </Row>
                  <Row className="my-1">
                    <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
                      Cover Material
                    </Col>
                    <Col
                      xs={7}
                      md={10}
                      style={{ color: 'black', fontWeight: '600' }}
                    >
                      No cover
                    </Col>
                  </Row>
                  <Row className="my-1">
                    <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
                      Filling Material
                    </Col>
                    <Col
                      xs={7}
                      md={10}
                      style={{ color: 'black', fontWeight: '600' }}
                    >
                      EVA
                    </Col>
                  </Row>
                  <Row className="my-1">
                    <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
                      Other Features
                    </Col>
                    <Col
                      xs={7}
                      md={10}
                      style={{ color: 'black', fontWeight: '600' }}
                    >
                      Lorem ipsum dolor sit, amet consectetur
                      adipisicing elit. Exercitationem harum nihil
                      illo nam praesentium, voluptate illum explicabo
                      accusantium doloremque. Minima corrupti culpa,
                      odio maiores beatae pariatur voluptatem dolorem
                      optio necessitatibus.
                    </Col>
                  </Row>
                  <hr />
                  <span
                    style={{
                      color: '#30475E',
                      letterSpacing: '0',
                      fontWeight: '600',
                    }}
                  >
                    DIMENSIONS
                  </span>
                  <Row className="mt-3">
                    <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
                      Width
                    </Col>
                    <Col
                      xs={7}
                      md={10}
                      style={{ color: 'black', fontWeight: '600' }}
                    >
                      24 inch
                    </Col>
                  </Row>
                  <Row className="my-1">
                    <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
                      Height
                    </Col>
                    <Col
                      xs={7}
                      md={10}
                      style={{ color: 'black', fontWeight: '600' }}
                    >
                      72 inch
                    </Col>
                  </Row>
                  <Row className="my-1">
                    <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
                      Thickness
                    </Col>
                    <Col
                      xs={7}
                      md={10}
                      style={{ color: 'black', fontWeight: '600' }}
                    >
                      6 mm
                    </Col>
                  </Row>
                  <Row className="my-1">
                    <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
                      Weight
                    </Col>
                    <Col
                      xs={7}
                      md={10}
                      style={{ color: 'black', fontWeight: '600' }}
                    >
                      500 g
                    </Col>
                  </Row>
                </>
              )}
              {rr && (
                <>
                  <span
                    style={{ color: '#30475E', cursor: 'pointer' }}
                    onClick={() => {
                      setWar((t) => !t);
                    }}
                  >
                    <i
                      className="far fa-edit"
                      style={{
                        display: 'inline',
                        fontSize: '20px',
                        color: '#30475E',
                      }}
                    />
                    &nbsp;
                    <span style={{ display: 'inline' }}>
                      Write a Review
                    </span>
                  </span>
                  {war && (
                    <>
                      <hr />
                      <label htmlFor="question">Review</label>
                      <input
                        type="text"
                        className="form-control"
                        id="question"
                        placeholder="Enter your Qustion"
                        name="question"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={values.question}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Button
                          className="btn btn-success rounded mt-2 px-2 py-1"
                          style={{ fontWeight: '1000' }}
                          onClick={() => {
                            handleDone();
                          }}
                        >
                          Done
                        </Button>
                      </div>
                    </>
                  )}
                  <Review />
                </>
              )}
              {q && (
                <>
                  <span
                    style={{ color: '#30475E', cursor: 'pointer' }}
                    onClick={() => {
                      setAaq((t) => !t);
                    }}
                  >
                    <i
                      className="far fa-edit"
                      style={{
                        display: 'inline',
                        fontSize: '20px',
                        color: '#30475E',
                      }}
                    />
                    &nbsp;
                    <span style={{ display: 'inline' }}>
                      ASK A QUESTION
                    </span>
                  </span>
                  {aaq && (
                    <>
                      <hr />
                      <label htmlFor="question">Question</label>
                      <input
                        type="text"
                        className="form-control"
                        id="question"
                        placeholder="Enter your Qustion"
                        name="question"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={values.question}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Button
                          className="btn btn-success rounded mt-2 px-2 py-1"
                          style={{ fontWeight: '1000' }}
                          onClick={() => {
                            handleDone();
                          }}
                        >
                          Done
                        </Button>
                      </div>
                    </>
                  )}
                  {questions.map((question, index) => {
                    return (
                      <Question
                        question={question.question}
                        answer={question.answer}
                      />
                    );
                  })}
                </>
              )}
            </Card>
          </Container>
          {/* <Chatbot /> */}
        </>
      )}
    </>
  );
};

export default ProductScreen;
