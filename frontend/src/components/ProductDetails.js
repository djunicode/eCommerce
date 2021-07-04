import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ProductDetails = () => {
  return (
    <>
      <span
        style={{
          color: '#30475E',
          letterSpacing: '0',
          fontWeight: '600',
        }}
      >
        GENERAL
      </span>
      <Row className="mt-3">
        <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
          Ideal For
        </Col>
        <Col
          xs={7}
          md={10}
          style={{ color: 'black', fontWeight: '600' }}
        >
          Men and women, boys, girls, unisex
        </Col>
      </Row>
      <Row className="my-1">
        <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
          Shape
        </Col>
        <Col
          xs={7}
          md={10}
          style={{ color: 'black', fontWeight: '600' }}
        >
          Rectangle
        </Col>
      </Row>
      <Row className="my-1">
        <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
          Cover Material
        </Col>
        <Col
          xs={7}
          md={10}
          style={{ color: 'black', fontWeight: '600' }}
        >
          No cover
        </Col>
      </Row>
      <Row className="my-1">
        <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
          Filling Material
        </Col>
        <Col
          xs={7}
          md={10}
          style={{ color: 'black', fontWeight: '600' }}
        >
          EVA
        </Col>
      </Row>
      <Row className="my-1">
        <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
          Other Features
        </Col>
        <Col
          xs={7}
          md={10}
          style={{ color: 'black', fontWeight: '600' }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Exercitationem harum nihil illo nam praesentium, voluptate
          illum explicabo accusantium doloremque. Minima corrupti
          culpa, odio maiores beatae pariatur voluptatem dolorem optio
          necessitatibus.
        </Col>
      </Row>
      <hr />
      <span
        style={{
          color: '#30475E',
          letterSpacing: '0',
          fontWeight: '600',
        }}
      >
        DIMENSIONS
      </span>
      <Row className="mt-3">
        <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
          Width
        </Col>
        <Col
          xs={7}
          md={10}
          style={{ color: 'black', fontWeight: '600' }}
        >
          24 inch
        </Col>
      </Row>
      <Row className="my-1">
        <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
          Height
        </Col>
        <Col
          xs={7}
          md={10}
          style={{ color: 'black', fontWeight: '600' }}
        >
          72 inch
        </Col>
      </Row>
      <Row className="my-1">
        <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
          Thickness
        </Col>
        <Col
          xs={7}
          md={10}
          style={{ color: 'black', fontWeight: '600' }}
        >
          6 mm
        </Col>
      </Row>
      <Row className="my-1">
        <Col md={2} xs={5} style={{ color: '#5F5F5F' }}>
          Weight
        </Col>
        <Col
          xs={7}
          md={10}
          style={{ color: 'black', fontWeight: '600' }}
        >
          500 g
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
