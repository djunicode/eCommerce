/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-spread */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import {
  Row,
  Col,
  Accordion,
  Card,
  Form,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { filter } from '../actions/filterActions';
import { LIGHT_BLUE, DARK_BLUE_2 } from '../util/colors';

let selectedBrands = [];
let selectedRating = [];

const FilterSidebar = ({ page }) => {
  const dispatch = useDispatch();

  let brands = [];
  let ratings = [];
  const rating = [4, 3, 2, 1];
  const prices = {
    max: 1,
    min: 100000,
  };

  const prodData = useSelector((state) => {
    if (page === 'Search') {
      return state.search;
    }
    return state.productsByCategory;
  });
  const { products } = prodData;
  products.map((prod) => {
    brands.push(prod.brand.name);
    ratings.push(prod.avgRating);
    if (prod.price > prices.max) {
      prices.max = prod.price;
    }
    if (prod.price < prices.min) {
      prices.min = prod.price;
    }
  });
  brands = [...new Set(brands)];
  ratings = [...new Set(ratings)];

  const filterData = useSelector((state) => state.filter);
  const { filters } = filterData;
  console.log(filters);

  const [priceRange, setPriceRange] = useState({
    max: Math.max.apply(Math, [
      ...products.map((elem) => elem.price),
    ]),
    min: Math.min.apply(Math, [
      ...products.map((elem) => elem.price),
    ]),
  });
  const [chevronState, setChevronState] = useState({
    price: true,
    brand: false,
    avgRating: true,
  });

  const removeDuplicates = (data) => {
    return [...new Set(data)];
  };

  const brandsHandler = (elem) => {
    if (selectedBrands.length === 1) {
      if (selectedBrands.includes(elem.target.id)) {
        const filtersSelected = {
          price: priceRange,
          brands,
          rating: Math.min.apply(Math, selectedRating),
        };
        selectedBrands = [];
        dispatch(filter(filtersSelected));
      } else {
        selectedBrands.push(elem.target.id);
        filterSubmitHandler();
      }
    } else if (selectedBrands.length === brands.length - 1) {
      if (selectedBrands.includes(elem.target.id)) {
        selectedBrands = selectedBrands.filter(
          (item) => item !== elem.target.id,
        );
      } else {
        selectedBrands.push(elem.target.id);
      }
      filterSubmitHandler();
    } else {
      if (selectedBrands.includes(elem.target.id)) {
        selectedBrands = selectedBrands.filter(
          (item) => item !== elem.target.id,
        );
      } else {
        selectedBrands.push(elem.target.id);
      }
      filterSubmitHandler();
    }
  };

  const ratingHandler = (elem) => {
    // if (selectedRating.length === ratings.length) {
    //   selectedRating = [];
    // }
    selectedRating.includes(elem.target.id)
      ? (selectedRating = selectedRating.filter(
          (item) => item !== elem.target.id,
        ))
      : selectedRating.push(elem.target.id);
    if (selectedBrands.length === 0) {
      const filtersSelected = {
        price: priceRange,
        brands,
        rating: Math.min.apply(Math, selectedRating),
      };
      if (selectedRating.length === 0) {
        dispatch(
          filter({
            ...filtersSelected,
            rating: 0,
          }),
        );
      } else dispatch(filter(filtersSelected));
      console.log(filtersSelected);
    } else {
      filterSubmitHandler();
    }
  };

  const filterSubmitHandler = () => {
    removeDuplicates(selectedBrands);
    removeDuplicates(selectedRating);
    console.log(selectedRating);
    const filtersSelected = {
      price: priceRange,
      brands: selectedBrands,
      rating: Math.min.apply(Math, selectedRating),
    };
    dispatch(filter(filtersSelected));
    console.log(filtersSelected);
  };

  const commonPriceHander = () => {
    removeDuplicates(selectedBrands);
    removeDuplicates(selectedRating);
    if (selectedBrands.length === 0) {
      selectedBrands = brands;
    }
    console.log(selectedBrands);
    if (selectedRating.length === 0) {
      selectedRating = ratings;
    }
  };

  const price1Handler = () => {
    commonPriceHander();
    const filtersSelected = {
      price: {
        max: Math.floor(prices.max / 3),
        min: prices.min,
      },
      brands: selectedBrands,
      rating: Math.min.apply(Math, selectedRating),
    };
    setPriceRange({
      max: Math.floor(prices.max / 3),
      min: prices.min,
    });
    dispatch(filter(filtersSelected));
  };

  const price2Handler = () => {
    commonPriceHander();
    const filtersSelected = {
      price: {
        max: Math.floor((2 * prices.max) / 3),
        min: Math.floor(prices.max / 3),
      },
      brands: selectedBrands,
      rating: Math.min.apply(Math, selectedRating),
    };
    setPriceRange({
      max: Math.floor((2 * prices.max) / 3),
      min: Math.floor(prices.max / 3),
    });
    dispatch(filter(filtersSelected));
  };

  const price3Handler = () => {
    commonPriceHander();
    const filtersSelected = {
      price: {
        max: prices.max,
        min: Math.floor((2 * prices.max) / 3),
      },
      brands: selectedBrands,
      rating: Math.min.apply(Math, selectedRating),
    };
    setPriceRange({
      max: prices.max,
      min: Math.floor((2 * prices.max) / 3),
    });
    dispatch(filter(filtersSelected));
  };

  const [show, setShow] = useState({
    display: true,
    tab: false,
  });

  return (
    <>
      <StyledTabToggleBtn
        display={show}
        onClick={() =>
          setShow({
            display: true,
            tab: true,
          })
        }
      >
        Filters
      </StyledTabToggleBtn>
      <StyledLeftSidebar display={show}>
        <Row>
          <StyledH1>
            Filter By{' '}
            <StyledI
              className="fas fa-times"
              onClick={() =>
                setShow({
                  display: false,
                  tab: show.tab,
                })
              }
            />
          </StyledH1>
        </Row>
        <Row>
          <StyledAccordian defaultActiveKey="0">
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                onClick={() => {
                  setChevronState({
                    price: !chevronState.price,
                    brand: chevronState.brand,
                    avgRating: chevronState.avgRating,
                  });
                }}
              >
                Price{' '}
                <i
                  className={
                    chevronState.price
                      ? `fas fa-chevron-up`
                      : `fas fa-chevron-down`
                  }
                />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form.Group as={Row}>
                    <Col xs="11">
                      <Form>
                        <Form.Check
                          type="radio"
                          label={`Rs ${prices.min} - Rs ${Math.floor(
                            prices.max / 3,
                          )}`}
                          id={1}
                          onChange={price1Handler}
                          style={{ scale: 100 }}
                          key={1}
                          defaultChecked={
                            !!(
                              Object.keys(filters).length > 0 &&
                              filters.price.max ===
                                Math.floor(prices.max / 3) &&
                              filters.price.min === prices.min
                            )
                          }
                          name="priceRadioButton"
                        />
                        <Form.Check
                          type="radio"
                          label={`Rs ${Math.floor(
                            prices.max / 3,
                          )} - Rs ${Math.floor(
                            (2 * prices.max) / 3,
                          )}`}
                          id={2}
                          onChange={price2Handler}
                          style={{ scale: 100 }}
                          key={2}
                          defaultChecked={
                            !!(
                              Object.keys(filters).length > 0 &&
                              filters.price.max ===
                                Math.floor((2 * prices.max) / 3) &&
                              filters.price.min ===
                                Math.floor(prices.max / 3)
                            )
                          }
                          name="priceRadioButton"
                        />
                        <Form.Check
                          type="radio"
                          label={`Rs ${Math.floor(
                            (2 * prices.max) / 3,
                          )} - Rs ${prices.max}`}
                          id={3}
                          onChange={price3Handler}
                          style={{ scale: 100 }}
                          key={3}
                          defaultChecked={
                            !!(
                              Object.keys(filters).length > 0 &&
                              filters.price.max === prices.max &&
                              filters.price.min ===
                                Math.floor((2 * prices.max) / 3)
                            )
                          }
                          name="priceRadioButton"
                        />
                      </Form>
                    </Col>
                  </Form.Group>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </StyledAccordian>
        </Row>
        <Row>
          <StyledAccordian defaultActiveKey="1">
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                onClick={() => {
                  setChevronState({
                    price: chevronState.price,
                    brand: !chevronState.brand,
                    avgRating: chevronState.avgRating,
                  });
                }}
              >
                Brand{' '}
                <i
                  className={
                    chevronState.brand
                      ? `fas fa-chevron-up`
                      : `fas fa-chevron-down`
                  }
                />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <StyledFormFlexRow>
                    {brands.map((elem) => (
                      <Form.Check
                        type="checkbox"
                        label={elem}
                        id={elem}
                        onChange={brandsHandler}
                        style={{ scale: 100 }}
                        key={elem}
                        defaultChecked={
                          !!(
                            Object.keys(filters).length > 0 &&
                            filters.brands.includes(elem)
                          )
                        }
                      />
                    ))}
                  </StyledFormFlexRow>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </StyledAccordian>
        </Row>
        <Row>
          <StyledAccordian defaultActiveKey="0">
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                onClick={() => {
                  setChevronState({
                    price: chevronState.price,
                    brand: chevronState.brand,
                    avgRating: !chevronState.avgRating,
                  });
                }}
              >
                Avg Rating{' '}
                <i
                  className={
                    chevronState.avgRating
                      ? `fas fa-chevron-up`
                      : `fas fa-chevron-down`
                  }
                />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form>
                    {rating.map((elem) => (
                      <Form.Check
                        type="checkbox"
                        label={
                          <>
                            {elem}
                            {<i className="fas fa-star" />}
                            {` and above`}
                          </>
                        }
                        id={elem}
                        onChange={ratingHandler}
                        size="lg"
                        key={elem}
                      />
                    ))}
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </StyledAccordian>
        </Row>
      </StyledLeftSidebar>
    </>
  );
};

export default FilterSidebar;

const StyledTabToggleBtn = styled.button`
  position: fixed;
  top: 100px;
  left: -25px;
  padding: 12px 18px 12px 38px;
  margin: 10px auto;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  z-index: 5000 !important;
  background-color: ${DARK_BLUE_2};
  color: ${LIGHT_BLUE};
  visibility: ${(props) =>
    props.display.display && props.display.tab
      ? 'hidden'
      : 'visible'};

  @media (min-width: 900px) {
    display: none;
  }
`;

const StyledLeftSidebar = styled.div`
  position: fixed;
  top: 85px;
  left: 6px;
  width: 300px;
  overflow-y: auto;
  text-align: left;
  box-shadow: 8px 0 6px -6px #bbb;
  padding-left: 15px;
  margin-right: 10px;
  margin-left: 10px;
  height: 100vh;
  background-color: ${LIGHT_BLUE};

  &::-webkit-scrollbar {
    width: 0px;
    left: 0;
  }

  @media (max-width: 900px) {
    display: ${(props) =>
      props.display.display && props.display.tab ? '' : 'none'};
    z-index: 2000 !important;
  }
`;

const StyledH1 = styled.h1`
  margin-left: 16px;
  margin-top: 12px;
  font-weight: 400;
`;

const StyledI = styled.i`
  color: ${DARK_BLUE_2};
  margin-left: 70px;
  display: none;

  @media (max-width: 900px) {
    display: inline-block;
  }
`;

const StyledAccordian = styled(Accordion)`
  width: 90%;
  margin-bottom: 10px;
  border-bottom: 1.5px solid #ddd;
`;

const StyledFormFlexRow = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;
