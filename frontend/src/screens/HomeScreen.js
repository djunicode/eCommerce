/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Card, Container } from 'react-bootstrap';
import styled from 'styled-components';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import {
  getProductByCategory,
  listCategories,
} from '../actions/categoryActions';
import Chatbot from '../components/Chatbot/Chatbot';
import PushNotifBtn from '../components/PushNotifBtn';

function HomeScreen() {
  // const { keyword } = match.params;

  // const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const query = `query {
    getCategories {
      name,
      _id
    }
  }`;

  useEffect(() => {
    dispatch(listCategories(query));
  }, [dispatch]);

  const content = [];

  const homeCategories = {
    'Stainless Steel Utensils': 'StainlessSteelUtensils',
    'Copper And Brass Utensils': 'CopperAndBrassUtensils',
    'Plastic Household Items': 'PlasticHouseholdItems',
    'Furniture Household': 'FurnitureHousehold',
    'Thermoware Items': 'ThermowareItems',
    'Non Stick Items': 'NonStickItems',
    'Home Appliances': 'HomeAppliances',
    'Crockery and Melamine': 'CrockeryandMelamine',
    Cutlery: 'Cutlery',
    'Gas Stoves and Cookers': 'GasStovesandCookers',
    'Cleaning and SanitaryItems': 'CleaningandSanitaryItems',
    'Use and throw Items(Non reusable Items)':
      'UseandthrowItems(NonreusableItems)',
    'Fancy Organizers': 'FancyOrganizers',
    'Baking Items': 'BakingItems',
    Miscellaneous: 'Miscellaneous',
  };

  if (categories) {
    content.push(
      <Row className="justify-content-center" key="1">
        {categories.map((homecategories) => (
          <Col xs={12} sm={6} md={4} xl={3} key={homecategories._id}>
            <CatCard>
              <Overlay />
              <Card.Img
                src={`${process.env.PUBLIC_URL}/uploads/${
                  homeCategories[homecategories.name]
                }.jpg`}
                alt={homecategories.name}
                loading="lazy"
              />
              <Card.ImgOverlay>
                <Ctitle className="ctitle">
                  {homecategories.name}
                </Ctitle>
                <Link
                  to={`/category/${homecategories._id}`}
                  onClick={() => {
                    dispatch(
                      getProductByCategory(homecategories._id),
                    );
                  }}
                >
                  <Cbutton
                    className="cbutton"
                    variant="outline-primary"
                  >
                    SHOP NOW
                  </Cbutton>
                </Link>
              </Card.ImgOverlay>
            </CatCard>
          </Col>
        ))}
      </Row>,
    );
  }

  return (
    <Container>
      <PushNotifBtn />
      <Meta />

      <h1>New Arrivals</h1>
      <ProductCarousel />
      <h1 style={{ margin: '100px 0 0 0' }}>Categories</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          {content}
          <Chatbot />
        </>
      )}
    </Container>
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
    rgba(18, 25, 32, 0.75),
    rgba(18, 25, 32, 0.75)
  );
  height: 100%;
  width: 100%;
  z-index: 1;
`;
const Ctitle = styled(Card.Title)`
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #ffffff;
  position: absolute;
  text-align: center;
  margin: 15px auto;
  left: 15px;
  right: 15px;
  z-index: 2;

  @media screen and (max-width: 600px) {
    font-size: 1rem;
    left: 7px;
    right: 7px;

    margin: 8px auto;
  }
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

  @media screen and (max-width: 600px) {
    font-size: 0.7rem;
    padding: 6px 10px;
    bottom: 25px;
  }
`;
