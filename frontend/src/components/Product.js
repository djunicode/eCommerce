import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import Rating from './Rating';

import { LIGHT_BLUE } from '../util/colors';

const Product = ({ product }) => {
  return (
    <StyledCard className="my-3">
      <Link to={`/product/${product._id}`}>
        <StyledImg src={product.image} variant="top" />
        {product.discount > 0 && (
          <StyledDiscount as="p">-{product.discount}%</StyledDiscount>
        )}
      </Link>

      <StyledCardBody>
        <Card.Text as="h4">
          <Rating value={3} />
        </Card.Text>

        <Link to={`/product/${product._id}`}>
          <StyledTitle as="div">
            <strong>{product.name}</strong>
          </StyledTitle>
        </Link>

        <StyledBrand as="div">
          <p>{product.brand.name}</p>
        </StyledBrand>

        <StyledPrice as="b">Rs {product.price} /-</StyledPrice>
      </StyledCardBody>
    </StyledCard>
  );
};

export default Product;

const StyledCard = styled(Card)`
  background-color: ${LIGHT_BLUE};
  border-bottom: 1px solid gray !important;
  margin: 6px;

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2),
      0 1.5px 5px 0 rgba(0, 0, 0, 0.19);
  }
`;

const StyledImg = styled(Card.Img)`
  width: 250px !important;
  height: 250px !important;
  margin-bottom: auto;
`;

const StyledDiscount = styled(Card.Text)`
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: #d9534f;
  color: white;
  padding: 6px;
  border-radius: 6px;
`;

const StyledCardBody = styled(Card.Body)`
  padding: 3px !important;
`;

const StyledTitle = styled(Card.Title)`
  font-size: 20px;
`;

const StyledBrand = styled(Card.Title)`
  font-size: 14px;
  margin: 0 !important;
`;

const StyledPrice = styled(Card.Text)`
  font-weight: bold;
  color: grey;
  margin-bottom: 0;
`;
