import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import Rating from './Rating';

import { LIGHT_BLUE } from '../util/colors';
import styles from '../css/card.module.css';

const Product = ({ product }) => {
  return (
    <StyledCard className={`my-3 ${styles.card}`}>
      <Link to={`/product/${product._id}`}>
        <StyledImg src={product.image} variant="top" />
        {product.discount > 0 && (
          <StyledDiscount as="p">-{product.discount}%</StyledDiscount>
        )}
      </Link>

      <StyledCardBody>
        <Card.Text as="h4">
          <Rating value={product.avgRating} />
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
        {product.countInStock === 0 && (
          <StyledOutOfStock as="p">
            <i>Out of Stock</i>
          </StyledOutOfStock>
        )}
      </StyledCardBody>
    </StyledCard>
  );
};

export default Product;

const StyledCard = styled(Card)`
  background-color: ${LIGHT_BLUE};
  margin: auto 12px;
  padding: 12px !important;

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2),
      0 1.5px 5px 0 rgba(0, 0, 0, 0.19);
    transition: 0.2s;
  }
`;

const StyledImg = styled(Card.Img)`
  width: 100% !important;
  height: 250px !important;
  margin-bottom: 4px;
`;

const StyledDiscount = styled(Card.Text)`
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: #d9534f;
  color: white;
  padding: 6px;
  border-radius: 6px;
`;

const StyledCardBody = styled(Card.Body)`
  padding: 3px !important;
`;

const StyledTitle = styled(Card.Title)`
  font-size: 18px;
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

const StyledOutOfStock = styled.p`
  color: red;
  font-size: 9px;
  float: right;
  background-color: #ffcdd2;
  opacity: 0.8;
  padding: 6px;
  border-radius: 4px;
  border: 1px red solid;

  @media (max-width: 445px) {
    float: none;
    text-align: center;
  }
`;
