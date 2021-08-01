import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

function OrderItem({ product, indexNo }) {
  return (
    <>
      <Row style={{ position: 'relative' }}>
        <Col xs={9}>
          {product.product && (
            <ProductName>
              <span style={{ marginRight: '1rem' }}>
                {indexNo + 1}.
              </span>
              {product.product.name}
            </ProductName>
          )}
        </Col>
        <Col>
          <ProductPrice>Rs {product.price}</ProductPrice>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default OrderItem;

const ProductName = styled.div`
  font-size: 1.3rem;
  margin: 1rem 0;
  @media screen and (max-width: 576px) {
    font-size: 1rem;
  }
`;
const ProductPrice = styled(ProductName)`
  float: right;
`;
