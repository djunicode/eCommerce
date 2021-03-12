import React, { useEffect } from 'react';
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
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search
    ? Number(location.search.split('=')[1])
    : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  const addedtocart = [
    {
      name: 'some products',
      price: 1299,
      brand: 'some shop name',
      qty: 2,
      size: '12 x 8',
      image: '../uploads/Baking Items.jpg',
    },
    {
      name: 'some products',
      price: 1299,
      brand: 'some shop name',
      qty: 2,
      size: '12 x 8',
      image: '../uploads/Cutlery.jpg',
    },
    {
      name: 'some products',
      price: 1299,
      brand: 'some shop name',
      qty: 2,
      size: '12 x 8',
      image: '../uploads/Cutlery.jpg',
    },
  ];

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {addedtocart.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {addedtocart.map((item) => (
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
                        <div>{item.brand}</div>
                      </Col>
                      <Col>Rs {item.price}</Col>
                    </Row>
                    <Row>
                      <Col>
                        Size:
                        <span>
                          <Form.Control as="select" value={item.size}>
                            <option>{item.size}</option>
                          </Form.Control>
                        </span>
                      </Col>
                      <Col>
                        Qty:
                        <span>
                          <Form.Control
                            value={item.qty}
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
                          onClick={() =>
                            removeFromCartHandler(item.product)
                          }
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
            <ListGroup.Item>
              <h2>
                Subtotal (
                {addedtocart.reduce((acc, item) => acc + item.qty, 0)}
                ) items
              </h2>
              $
              {addedtocart
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={addedtocart.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
