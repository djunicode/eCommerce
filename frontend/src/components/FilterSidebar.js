import React, { useState } from 'react';
import {
  Row,
  Col,
  Accordion,
  Card,
  ListGroup,
  Form,
  Button,
  ButtonToolbar,
  Badge,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RangeSlider from 'react-bootstrap-range-slider';
import { BORDER_DARK, LIGHT_BLUE, DARK_BLUE_2 } from '../util/colors';

const FilterSidebar = (props) => {
  const brands = ['Nike', 'Nikon', 'Puma'];
  const rating = [4, 3, 2, 1];

  const priceBar = {
    max: 10000,
    min: 0,
  };
  const [priceRange, setPriceRange] = useState(priceBar.max / 2);
  const [chevronState, setChevronState] = useState({
    price: true,
    brand: false,
    avgRating: true,
  });

  const selectedBrands = [];
  const selectedRating = [];

  const removeDuplicates = (data) => {
    return [...new Set(data)];
  };

  const filterSubmitHandler = (e) => {
    e.preventDefault();
    console.log(priceRange);
    console.log(removeDuplicates(selectedBrands));
    console.log(removeDuplicates(selectedRating));
    const filters = {
      price: priceRange,
      brands: selectedBrands,
      rating: selectedRating
    };
    localStorage.setItem('filters-proshop', JSON.stringify(filters));
    window.location.reload();
  };

  return (
    <StyledLeftSidebar>
      <Row>
        <StyledH1>Filter By</StyledH1>
      </Row>
      <Row>
        <StyledAccordian defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => {
              setChevronState({
                price: !chevronState.price,
                brand: chevronState.brand,
                avgRating: chevronState.avgRating,
              });
            }}>
              Price <i className={chevronState.price ? `fas fa-chevron-up` : `fas fa-chevron-down`} />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form.Group as={Row}>
                  <Col xs="11">
                    <StyledRangeSlider
                      min={priceBar.min}
                      max={priceBar.max}
                      onChange={(e) => setPriceRange(e.target.value)}
                      tooltip="auto"
                      tooltipPlacement="bottom"
                      step={50}
                    />
                    <StyledButton variant="light">
                      Range: 0 - {priceRange}
                    </StyledButton>
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
            <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => {
              setChevronState({
                price: chevronState.price,
                brand: !chevronState.brand,
                avgRating: chevronState.avgRating,
              });
            }}>
              Brand <i className={chevronState.brand ? `fas fa-chevron-up` : `fas fa-chevron-down`} />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <StyledFormFlexRow>
                  {brands.map((elem) => (
                    <Form.Check
                      type="checkbox"
                      label={elem}
                      id={elem}
                      onChange={(elem) =>
                        selectedBrands.push(elem.target.id)
                      }
                      style={{ scale: 100 }}
                      key={elem}
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
            <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => {
              setChevronState({
                price: chevronState.price,
                brand: chevronState.brand,
                avgRating: !chevronState.avgRating,
              });
            }}>
              Avg Rating <i className={chevronState.avgRating ? `fas fa-chevron-up` : `fas fa-chevron-down`} />
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
                      onChange={(elem) =>
                        selectedRating.push(elem.target.id)
                      }
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
      <Row>
        <StyledSubmitButton
          onClick={filterSubmitHandler}
          variant='outline-dark'
        >
          Apply Filters
        </StyledSubmitButton>
      </Row>
    </StyledLeftSidebar>
  );
};

export default FilterSidebar;

const StyledLeftSidebar = styled.div`
  position: fixed;
  top: 85px;
  left: 6px;
  width: 300px;
  overflow-y:auto;
  text-align: left;
  box-shadow: 8px 0 6px -6px #bbb; 
  padding-left: 15px;
  margin-right: 10px;
  margin-left: 10px;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const StyledH1 = styled.h1`
  margin-left: 16px;
  margin-top: 12px;
  font-weight: 100;
`;

const StyledAccordian = styled(Accordion)`
  width: 90%;
  margin-bottom: 10px;
  border-bottom: 1.5px solid #ddd;
`;

const StyledRangeSlider = styled(RangeSlider)`
  width: 100%;
  margin-bottom: 8px;
`;

const StyledButton = styled(Badge)`
  margin-top: 12px;
  width: 100%;
  font-size: 13px;
  background-color: ${LIGHT_BLUE};
  color: gray;
`;

const StyledFormFlexRow = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledSubmitButton = styled(Button)`
  margin-top: 12px;
  border-radius: 10px;
  width: 90%;
  margin-bottom: 90px;
  color: ${DARK_BLUE_2};
  border-color: ${DARK_BLUE_2} !important;
  background-color: ${LIGHT_BLUE};

  &:hover{
    background-color: ${DARK_BLUE_2};
  }
`;
