import React from 'react';
import { Row, Col } from 'react-bootstrap';

function OrderItem({ product }) {
  return (
    <>
      <Row style={{ position: 'relative' }}>
        <Col xs={3} />
        <Col xs={9}>
          <h1
            style={{
              letterSpacing: '0',
              textTransform: 'none',
              paddingBottom: '0px',
              overflow: 'wrap',
              marginTop: '15px',
            }}
          >
            {product.name}
          </h1>
          <h1
            style={{
              letterSpacing: '0',
              textTransform: 'none',
              paddingBottom: '0px',
              position: 'absolute',
              top: '0px',
              right: '25px',
              overflow: 'wrap',
              marginTop: '15px',
            }}
          >
            Rs {product.price}
          </h1>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default OrderItem;
