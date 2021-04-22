import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

function Message({ message, bottom }) {
  if (bottom) {
    return (
      <>
        <Row className="my-3">
          <Col xs={3} />
          <Col xs={9} style={{ textAlign: 'end' }}>
            <div
              className="p-2 rounded"
              style={{
                backgroundColor: '#DFF2FA',
                display: 'inline-block',
                maxWidth: '100%',
              }}
            >
              <Font>{message}</Font>
            </div>
          </Col>
        </Row>
        <div ref={bottom} />
      </>
    );
  }

  return (
    <Row className="my-3">
      <Col xs={3} />
      <Col xs={9} style={{ textAlign: 'end' }}>
        <div
          className="p-2 rounded"
          style={{
            backgroundColor: '#DFF2FA',
            display: 'inline-block',
            maxWidth: '100%',
          }}
        >
          <Font>{message}</Font>
        </div>
      </Col>
    </Row>
  );
}

export default Message;

const Font = styled.span`
  line-height: 30px;
  letter-spacing: 0.03em;
`;
