import React from 'react';
import { Row, Col } from 'react-bootstrap';

function Robot({ message, bottom }) {
  if (bottom) {
    return (
      <>
        <Row className="my-3">
          <Col xs={2}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '35px',
                width: '35px',
                borderRadius: '50%',
                backgroundColor: 'white',
              }}
            >
              <i className="fas fa-robot" />
            </div>
          </Col>
          <Col xs={9}>
            <div
              className="p-2 rounded"
              style={{
                backgroundColor: 'white',
                display: 'inline-block',
                maxWidth: '100%',
              }}
            >
              {message}
            </div>
          </Col>
        </Row>
        <div ref={bottom} />
      </>
    );
  }

  return (
    <Row className="my-3">
      <Col xs={2}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '35px',
            width: '35px',
            borderRadius: '50%',
            backgroundColor: 'white',
          }}
        >
          <i className="fas fa-robot" />
        </div>
      </Col>
      <Col xs={9}>
        <div
          className="p-2 rounded"
          style={{
            backgroundColor: 'white',
            display: 'inline-block',
            maxWidth: '100%',
          }}
        >
          {message}
        </div>
      </Col>
    </Row>
  );
}

export default Robot;
