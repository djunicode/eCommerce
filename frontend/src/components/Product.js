import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

import styled from 'styled-components';
import { LIGHT_BLUE } from '../util/colors';

const Product = ({ product }) => {

  return (
    <StyledCard className="my-3">
      <Link to={`/product/${product._id}`}>
        <StyledImg src={product.image} variant="top" />
        {product.discount>0 && (<StyledDiscount as="p">-{product.discount}%</StyledDiscount>)}
      </Link>

      <StyledCardBody>
        <Card.Text as="h4">
          <Rating
            value={product.rating}
          />
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
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);

  &:hover{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const StyledImg = styled(Card.Img)`
  width: 250px !important;
  height: 250px !important;
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
  padding: 10px !important;
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