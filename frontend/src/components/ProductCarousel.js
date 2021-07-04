/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
import {
  Carousel,
  Row,
  Col,
  Card,
  Button,
  CardDeck,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
import { BACKGROUND } from '../util/colors';

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector(
    (state) => state.productTopRated,
  );

  const { loading, error, products } = productTopRated;

  const query = `query {
    getNewProducts {
      name,
      price,
      image,
      _id
    }
  }`;

  useEffect(() => {
    dispatch(listTopProducts(query));
  }, [dispatch]);

  const width = window.innerWidth;
  let x;
  if (width >= 992) {
    x = 5;
  } else if (width >= 768) {
    x = 4;
  } else if (width >= 576) {
    x = 3;
  } else if (width < 576) {
    x = 1;
  }

  const content = [];

  if (products) {
    const number = products.length;
    const y = number / x;

    for (let i = 0; i < y; i++) {
      content.push(
        <Carousel.Item key={i}>
          <CardDeck>
            <Row
              style={{ width: '100%' }}
              xs={1}
              sm={3}
              md={4}
              lg={5}
            >
              {products
                .slice(i * x, (i + 1) * x)
                .map((topproducts) => (
                  <Col key={topproducts._id}>
                    <NACard>
                      <Card.Body
                        style={{
                          padding: '0',
                        }}
                      >
                        <img
                          src={topproducts.image}
                          variant="top"
                          alt="new arrival"
                          style={{
                            width: '100%',
                            height: 'auto',
                            marginBottom: 0,
                          }}
                        />
                        <NAtitle className="natitle">
                          {topproducts.name}
                        </NAtitle>
                        <NAprice className="naprice">
                          Rs. {topproducts.price}
                        </NAprice>
                      </Card.Body>
                      <NAFooter>
                        <Link to={`/product/${topproducts._id}`}>
                          <NAbutton>View</NAbutton>
                        </Link>
                      </NAFooter>
                    </NACard>
                  </Col>
                ))}
            </Row>
          </CardDeck>
        </Carousel.Item>,
      );
    }
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Carousel pause="hover" className="product-carousel">
        {content}
      </Carousel>
    </>
  );
};

export default ProductCarousel;

// STYLED COMPONENTS
const NACard = styled(Card)`
  border: none;
  margin: 0;
  height: 100%;
  background-color: white !important;
`;
const NAtitle = styled(Card.Title)`
  font-size: 1.2rem;
  text-transform: capitalize;
  margin: 25px 0 5px 0;

  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;
const NAprice = styled(Card.Text)`
  font-weight: light;
  text-transform: capitalize;
  font-size: 1.2rem;
  margin: 10px 0 20px 0;

  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;
const NAFooter = styled(Card.Footer)`
  background-color: white !important;
  padding: 0;
  border: none;
  margin-top: 15px;
`;
const NAbutton = styled(Button)`
  font-size: 0.8rem;
  letter-spacing: 2px;
  color: white;
  background-color: #f05454;
  padding: 10px;
  width: 100%;

  &:hover {
    background-color: #30475e;
  }

  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
    padding: 6px;
  }
`;
