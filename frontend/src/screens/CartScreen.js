/* eslint-disable no-unused-vars, operator-assignment, array-callback-return */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Media,
  Button,
  Card,
  Image,
} from 'react-bootstrap';
import styled from 'styled-components';
import Message from '../components/Message';
import { addToCart, getCartItems } from '../actions/cartActions';
import Loader from '../components/Loader';

const CartScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [productQty, setProductQty] = useState([]);
  const [removeItem, setRemoveItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  let totalAmount = 0;
  let total = 0;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { loading, cartItems, error } = cart;

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
          price
          image
          countInStock
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
  }, [dispatch, removeItem]);

  useEffect(() => {
    const content = [];
    if (cartItems.contents) {
      cartItems.contents.map((ca, index) => {
        content[index] = {
          id: ca.product._id,
          optionSelected: ca.isOptionSelected,
          optionName: ca.optionName,
          price: ca.price,
          qty: ca.quantity,
        };
        console.log();
        // setTotalAmount(total + (content[index]['price'] * content[index]['qty']));
        totalAmount =
          total + content[index].price * content[index].qty;
        total = totalAmount;
        console.log(content[index].price);
        console.log(totalAmount);
        console.log(total);
        return null;
      });
      console.log(content);
      setProductQty(content);
      setTotalPrice(totalAmount);
    }
  }, [cartItems]);

  // useEffect(() => {
  //   if (productId) {
  //     dispatch(addToCart(productQty));
  //   }
  // }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    const mutation = [];
    productQty.map((item) => {
      if (productQty.qty !== 0) {
        mutation.push(
          `{product:"${item.id}", isOptionSelected: ${item.optionSelected}, optionName: "${item.optionName}", price: ${item.price}, quantity: ${item.qty}}`,
        );
      }
    });
    dispatch(addToCart(mutation));
    console.log('check out is called');
    console.log(mutation);
  };

  const removeHandler = (temp) => {
    const mutation = [];
    temp.map((item, index) => {
      if (temp[index].qty !== 0) {
        console.log(temp[index].qty);
        mutation.push(
          `{product:"${item.id}", isOptionSelected: ${item.optionSelected}, optionName: "${item.optionName}", price: ${item.price}, quantity: ${item.qty}}`,
        );
      }
    });
    dispatch(addToCart(mutation));
    console.log('remove handler is called');
    console.log(mutation);
  };

  let x;
  if (window.innerWidth <= 576) {
    x = 70;
  } else {
    x = 100;
  }

  return (
    <Wrapper>
      <Row xs={1} md={2}>
        <Column md={9} lg={8}>
          <Link
            to="/"
            className="btn btn-light my-3"
            style={{ border: '1px solid #D4D4D4' }}
          >
            Go Back
          </Link>
          <h1>My Cart</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>
              {error}
              <br />
              You need to <Link to="/login">Login</Link> first.
            </Message>
          ) : cartItems.contents &&
            cartItems.contents.length === 0 ? (
            <Message>
              Your cart is empty. <br />
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.contents &&
                cartItems.contents.map((item, index) => (
                  <ListItem>
                    <Media>
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fluid
                        className="mr-4"
                        width={x}
                        height={x}
                      />
                      <Media.Body>
                        <Row style={{ marginBottom: '1.2rem' }}>
                          <Col sm={8}>
                            {item.product.countInStock === 0 ? (
                              <div style={{ color: '#D81616' }}>
                                This product is out of stock
                              </div>
                            ) : (
                              ''
                            )}
                            <ProductName>
                              {item.product.name}
                            </ProductName>
                          </Col>
                          <Col xs={12} sm={4}>
                            <ProductPrice>
                              Rs {item.price}
                            </ProductPrice>
                          </Col>
                        </Row>
                        <Row xs={2} sm={3}>
                          <SecondCol xs={12} sm={5}>
                            <span style={{ marginRight: '0.5rem' }}>
                              Option:
                            </span>
                            <SpanBox>
                              {item.isOptionSelected
                                ? `${item.optionName}`
                                : 'None'}
                            </SpanBox>
                          </SecondCol>
                          <SecondCol xs={10} sm={5}>
                            Qty:
                            <span>
                              <QtyButtons
                                disabled={
                                  productQty[index] &&
                                  (productQty[index].qty === 1 ||
                                    productQty[index].qty === 0)
                                }
                                onClick={() => {
                                  setProductQty((c) => {
                                    const temp = [...c];
                                    temp[index].qty =
                                      temp[index].qty - 1;
                                    return temp;
                                  });
                                  totalAmount =
                                    totalPrice -
                                    productQty[index].price;
                                  console.log(totalAmount);
                                  setTotalPrice(totalAmount);
                                }}
                              >
                                -
                              </QtyButtons>
                            </span>
                            <SpanBox>
                              {productQty[index] &&
                                productQty[index].qty}
                            </SpanBox>
                            <span>
                              <QtyButtons
                                disabled={
                                  productQty[index] &&
                                  (productQty[index].qty ===
                                    item.product.countInStock ||
                                    productQty[index].qty === 0)
                                }
                                onClick={() => {
                                  setProductQty((c) => {
                                    const temp = [...c];
                                    temp[index].qty =
                                      temp[index].qty + 1;
                                    return temp;
                                  });
                                  totalAmount =
                                    totalPrice +
                                    productQty[index].price;
                                  console.log(totalAmount);
                                  setTotalPrice(totalAmount);
                                }}
                              >
                                +
                              </QtyButtons>
                            </span>
                          </SecondCol>
                          <SecondCol xs={2} sm={2}>
                            <TrashButton
                              type="button"
                              variant="light"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    'Are you sure you want to remove this item from cart?',
                                  )
                                ) {
                                  setProductQty((c) => {
                                    const temp = [...c];
                                    temp[index].qty = 0;
                                    console.log(temp);
                                    removeHandler(temp);
                                    return temp;
                                  });
                                  setRemoveItem(removeItem + 1);
                                }
                              }}
                            >
                              <i className="fas fa-trash" />
                            </TrashButton>
                          </SecondCol>
                        </Row>
                      </Media.Body>
                    </Media>
                  </ListItem>
                ))}
            </ListGroup>
          )}
        </Column>

        {/* ***** PAYMENT DETAILS ***** */}
        <Col md={3} lg={4}>
          <Card>
            <ListGroup variant="flush">
              <PriceList>
                <h4 style={{ color: '#30475E' }}>PRICE DETAILS</h4>
              </PriceList>
              <hr
                style={{ backgroundColor: '#FFB396', margin: '0' }}
              />

              {cartItems.contents &&
                cartItems.contents.map((item, index) => (
                  <PriceList>
                    <Row>
                      <Col xs={8}>
                        <ItemPriceName>
                          {item.product.name}
                        </ItemPriceName>
                        <div style={{ color: '#5F5F5F' }}>
                          {productQty[index] && productQty[index].qty}{' '}
                          items
                        </div>
                      </Col>
                      <Col xs={4}>
                        <ItemPrice>
                          Rs{' '}
                          {productQty[index] &&
                            item.price * productQty[index].qty}
                        </ItemPrice>
                      </Col>
                    </Row>
                  </PriceList>
                ))}

              <PriceList>
                <hr style={{ backgroundColor: '#E0E0E0' }} />
                <Row>
                  <Col>
                    <TotalAmountText>Total Amount</TotalAmountText>
                  </Col>
                  <Col>
                    <TotalAmount>Rs {totalPrice}</TotalAmount>
                  </Col>
                </Row>
              </PriceList>

              <PriceList>
                <Link to="/OrderSummaryScreen">
                  <CheckoutButton
                    type="button"
                    className="btn-block"
                    disabled={
                      cartItems.contents &&
                      cartItems.contents.length === 0
                    }
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </CheckoutButton>
                </Link>
              </PriceList>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default CartScreen;

const Wrapper = styled.div`
  padding: 0 4rem;

  @media screen and (max-width: 900px) {
    padding: 0 2.5rem;
  }

  @media screen and (max-width: 700px) {
    padding: 0;
  }
`;
const Column = styled(Col)`
  @media screen and (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;
const SecondCol = styled(Col)`
  @media screen and (max-width: 576px) {
    padding-right: 0;
    margin-bottom: 0.6rem;
  }
`;
const ListItem = styled(ListGroup.Item)`
  padding: 1.5rem 2rem;
  @media screen and (max-width: 576px) {
    padding: 1rem 1.2rem;
  }
`;
const PriceList = styled(ListGroup.Item)`
  background-color: #f9f9f9;
  border: none;
  padding: 1rem 1.5rem;
  padding-bottom: 0.3rem;
`;
const QtyButtons = styled(Button)`
  font-size: 1rem;
  background-color: #5eaaa8;
  padding: 0 0.5rem;
  border-radius: 2px;
  margin: 0 0.5rem;
  @media screen and (max-width: 625px) {
    font-size: 0.7rem;
    line-height: 1rem;
    padding: 0 0.3rem;
    margin: 0 0.3rem;
  }
`;
const TrashButton = styled(Button)`
  padding: 0;
  font-size: 1rem;
  float: right;
  &:hover {
    background: none;
    color: #929293;
  }
  @media screen and (max-width: 576px) {
    margin-right: 1rem;
  }
  @media screen and (max-width: 425px) {
    margin-right: 0.5rem;
  }
`;
const SpanBox = styled.span`
  padding: 0.2rem 1rem;
  border: 1px solid #929293;
  @media screen and (max-width: 576px) {
    padding: 0.2rem 0.5rem;
  }
`;
const ProductName = styled.div`
  font-size: 1.2rem;
  @media screen and (max-width: 576px) {
    font-size: 0.8rem;
  }
`;
const ProductPrice = styled.div`
  font-size: 1rem;
  font-weight: 600;
  float: right;
  @media screen and (max-width: 576px) {
    font-size: 0.7rem;
    float: left;
    margin-top: 0.5rem;
    font-weight: 600;
  }
`;
const CheckoutButton = styled(Button)`
  background-color: #f05454;
  margin-bottom: 1rem;
  &:hover {
    background-color: #30475e;
  }
  @media screen and (max-width: 360) {
    font-size: 0.5rem !important;
  }
`;
const ItemPriceName = styled.div`
  font-size: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media screen and (max-width: 625px) {
    font-size: 0.7rem;
  }
`;
const ItemPrice = styled.div`
  font-size: 1rem;
  float: right;
  @media screen and (max-width: 625px) {
    font-size: 0.7rem;
  }
`;
const TotalAmountText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  @media screen and (max-width: 625px) {
    font-size: 0.7rem;
  }
`;
const TotalAmount = styled(ProductPrice)`
  @media screen and (max-width: 576px) {
    float: right;
  }
`;
