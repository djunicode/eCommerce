/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Media,
  Form,
  Button,
  Card,
  Image,
} from 'react-bootstrap';
import styled from 'styled-components';
import Message from '../components/Message';
import {
  addToCart,
  removeFromCart,
  getCartItems,
} from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search
    ? Number(location.search.split('=')[1])
    : 1;

  const dispatch = useDispatch();

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  const query = `query {
    getCart {
      _id
      user {
        name
      }
      contents {
        product {
          _id
          name
          brand {
            name
            _id
          }
          image
        }
        isOptionSelected
        optionName
        price
        quantity
      }
    }
  }`;

  useEffect(() => {
    dispatch(getCartItems(query));
  }, [dispatch]);

  // useEffect(() => {
  //   if (productId) {
  //     dispatch(addToCart(productId, qty));
  //   }
  // }, [dispatch, productId, qty]);

  // const removeFromCartHandler = (id) => {
  //   dispatch(removeFromCart(id));
  // };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cart')));
    console.log(JSON.parse(localStorage.getItem('cart')));
  }, []);

  return (
    <Row style={{ padding: '0 4rem' }}>
      <Col md={8}>
        <Link
          to="/"
          className="btn btn-light my-3"
          style={{ border: '1px solid #D4D4D4' }}
        >
          Go Back
        </Link>
        <h1>My Cart</h1>
        {cartItems && cartItems.length === 0 ? (
          <Message>
            Your cart is empty. <br />
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems &&
              cartItems.map((item, index) => (
                <ListGroup.Item>
                  <Media>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      className="mr-4"
                      width={120}
                      height={120}
                    />
                    <Media.Body>
                      <Row>
                        <Col>
                          <div>{item.name}</div>
                          <div>{item.brand.name}</div>
                        </Col>
                        <Col>Rs {item.price}</Col>
                      </Row>
                      <Row>
                        <Col>
                          Size:
                          <span>
                            {/* <Form.Control as="select" value={item.size}>
                            <option>{item.size}</option>
                          </Form.Control> */}
                          </span>
                        </Col>
                        <Col>
                          Qty:
                          <span>
                            <Form.Control
                              value={item.quantity}
                              // onChange={(e) =>
                              //   dispatch(
                              //     addToCart(
                              //       item.product,
                              //       Number(e.target.value),
                              //     ),
                              //   )
                              // }
                            >
                              {/* {[...Array(item.countInStock).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ),
                      )} */}
                            </Form.Control>
                          </span>
                        </Col>
                        <Col>
                          <Button
                            type="button"
                            variant="light"
                            // onClick={() => {
                            //   const cart = JSON.parse(
                            //     localStorage.getItem('cart'),
                            //   );
                            //   cart.splice(index, 1);
                            //   setCartItems(cart);
                            //   console.log(cart);
                            //   localStorage.setItem(
                            //     'cart',
                            //     JSON.stringify(cart),
                            //   );
                            // }}
                          >
                            <i className="fas fa-trash" />
                          </Button>
                        </Col>
                      </Row>
                    </Media.Body>
                  </Media>
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
      </Col>

      {/* ***** PAYMENT DETAILS ***** */}
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <PriceList>
              <h4>PRICE DETAILS</h4>
              <hr />
            </PriceList>
            {/* <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                ) items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item> */}
            <PriceList>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems && cartItems.length === 0}
                onClick={checkoutHandler}
                style={{ backgroundColor: '#F05454' }}
              >
                Proceed To Checkout
              </Button>
            </PriceList>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;

const PriceList = styled(ListGroup.Item)`
  background-color: #f9f9f9;
  border: none;
`;
