/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Card } from 'react-bootstrap';
import styled from 'styled-components';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';
import Chatbot from '../components/Chatbot/Chatbot';

function HomeScreen({ match }) {
  const { keyword } = match.params;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const category = [
    {
      categorytitle: 'CROCKERY AND MELAMINE',
      categorysrc: '../uploads/CROCKERY AND MELAMINE.jpg',
      categoryid: 1,
    },
    {
      categorytitle: 'COPPER AND BRASS UTENSILS',
      categorysrc: '../uploads/COPPER AND BRASS UTENSILS.jpg',
      categoryid: 2,
    },
    {
      categorytitle: 'BAKING ITEMS',
      categorysrc: '../uploads/BAKING ITEMS.jpg',
      categoryid: 3,
    },
    {
      categorytitle: 'CUTLERY',
      categorysrc: '../uploads/CUTLERY.jpg',
      categoryid: 4,
    },
    {
      categorytitle: 'STAINLESS STEEL UTENSILS',
      categorysrc: '../uploads/STAINLESS STEEL UTENSILS.jpg',
      categoryid: 5,
    },
    {
      categorytitle: 'GAS STOVES AND COOKERS',
      categorysrc: '../uploads/GAS STOVES AND COOKERS.jpg',
      categoryid: 6,
    },
    {
      categorytitle: 'HOME APPLIANCES',
      categorysrc: '../uploads/HOME APPLIANCES.jpg',
      categoryid: 7,
    },
    {
      categorytitle: 'THERMOWARE',
      categorysrc: '../uploads/THERMOWARE.jpg',
      categoryid: 8,
    },
    {
      categorytitle: 'NON STICK ITEMS',
      categorysrc: '../uploads/NON STICK ITEMS.jpg',
      categoryid: 9,
    },
    {
      categorytitle: 'PLASTIC HOUSEHOLD ITEMS',
      categorysrc: '../uploads/PLASTIC HOUSEHOLD ITEMS.jpg',
      categoryid: 10,
    },
    {
      categorytitle: 'CLEANING AND SANITARY ITEMS',
      categorysrc: '../uploads/CLEANING AND SANITARY ITEMS.jpg',
      categoryid: 11,
    },
    {
      categorytitle: 'FANCY ORGANISERS',
      categorysrc: '../uploads/FANCY ORGANISERS.jpg',
      categoryid: 12,
    },
    {
      categorytitle: 'FURNITURE HOUSEHOLD',
      categorysrc: '../uploads/FURNITURE HOUSEHOLD.jpg',
      categoryid: 13,
    },
    {
      categorytitle: 'USE AND THROW ITEMS',
      categorysrc: '../uploads/USE AND THROW ITEMS.jpg',
      categoryid: 14,
    },
    {
      categorytitle: 'MISCELLANEOUS',
      categorysrc: '../uploads/MISCELLANEOUS.jpg',
      categoryid: 15,
    },
  ];

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <h1>New Arrivals</h1>
          <ProductCarousel />
        </>
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}

      {/* CATEGORIES */}
      <h1 style={{ margin: '80px 0 0 0' }}>Categories</h1>
      <Row className="justify-content-center">
        {category.map((categories) => (
          <Col
            sm={12}
            md={6}
            lg={4}
            xl={3}
            key={categories.categoryid}
          >
            <CatCard>
              <Overlay />
              <Card.Img
                src={categories.categorysrc}
                alt={categories.categorytitle}
              />
              <Card.ImgOverlay>
                <Ctitle>{categories.categorytitle}</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;

// STYLED COMPONENTS
const CatCard = styled(Card)`
  border: none;
  text-align: center;
  position: relative;
  margin-bottom: 2rem;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    0deg,
    rgba(18, 25, 32, 0.8),
    rgba(18, 25, 32, 0.8)
  );
  height: 100%;
  width: 100%;
  z-index: 1;
`;
const Ctitle = styled(Card.Title)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  position: absolute;
  text-align: center;
  margin: 15px auto;
  left: 15px;
  right: 15px;
  z-index: 2;
`;
const Cbutton = styled(Button)`
  font-size: 0.8rem;
  color: #ffb396;
  border-color: #ffb396;
  padding: 10px 15px;
  position: absolute;
  bottom: 40px;
  margin: auto;
  left: 0;
  right: 0;
  z-index: 2;
  &:hover {
    background: #ffb396;
    color: #000000;
    border-color: #ffb396;
  }
`;
