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

function OrderSummaryScreen() {
  const [os, setOs] = useState('on');
  const [da, setDa] = useState('off');
  const [p, setP] = useState('off');
  const [ana, setAna] = useState(false);

  const handleTab = (e) => {
    if (e.target.name === 'order_summary') {
      setOs('done');
      setDa('on');
    }
    if (e.target.name === 'pop') {
      setP('on');
      setDa('done');
    }
  };

  return (
    <>
      <div
        className="m-3"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span className="mr-5">
          {os === 'on' && (
            <i
              style={{ color: '#F05454' }}
              className="fas fa-circle"
            />
          )}
          {os === 'off' && (
            <i
              style={{ color: '#F05454' }}
              className="far fa-circle"
            />
          )}
          {os === 'done' && (
            <i
              style={{ color: 'green' }}
              className="fas fa-check-circle"
            />
          )}
        </span>
        <span className="mr-5">
          {da === 'on' && (
            <i
              style={{ color: '#F05454' }}
              className="fas fa-circle"
            />
          )}
          {da === 'off' && (
            <i
              style={{ color: '#F05454' }}
              className="far fa-circle"
            />
          )}
          {da === 'done' && (
            <i
              style={{ color: 'green' }}
              className="fas fa-check-circle"
            />
          )}
        </span>
        <span className="mr-5">
          {p === 'on' && (
            <i
              style={{ color: '#F05454' }}
              className="fas fa-circle"
            />
          )}
          {p === 'off' && (
            <i
              style={{ color: '#F05454' }}
              className="far fa-circle"
            />
          )}
          {p === 'done' && (
            <i
              style={{ color: 'green' }}
              className="fas fa-check-circle"
            />
          )}
        </span>
      </div>
      <Container
        className="pb-3"
        fluid
        style={{
          backgroundColor: 'white',
          border: '1px solid #D5D5D5',
          letterSpacing: '0.5px',
          height: 'auto',
        }}
      >
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
                        style={{ backgroundColor: 'white' }}
                      />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="number">Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="number"
                        placeholder="Phone Number"
                        style={{ backgroundColor: 'white' }}
                      />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="email"
                        style={{ backgroundColor: 'white' }}
                      />
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
                        style={{ backgroundColor: 'white' }}
                      />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Phone Number"
                        style={{ backgroundColor: 'white' }}
                      />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="pincode">Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        placeholder="pincode"
                        style={{ backgroundColor: 'white' }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={12}>
                      <label htmlFor="address">Address</label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Address"
                        style={{ backgroundColor: 'white' }}
                      />
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
            <h1
              style={{
                letterSpacing: '0',
                textTransform: 'none',
                paddingBottom: '0px',
              }}
            >
              Payment
            </h1>
            <>
              <Row>
                <Col md={7}>
                  <Card className="px-3 py-2 mb-3">
                    <h5
                      className="ml-1"
                      style={{
                        letterSpacing: '0',
                        textTransform: 'none',
                        paddingBottom: '0px',
                        display: 'inline',
                      }}
                    >
                      Payment Method :
                    </h5>
                    <Row>
                      <Col xs={6}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            Debit Card
                          </label>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Credit Card
                          </label>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            Net Banking
                          </label>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Cash on Delivery
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row />
                  </Card>
                </Col>
              </Row>
            </>
          </>
        )}
      </Container>
    </>
  );
}

export default OrderSummaryScreen;
