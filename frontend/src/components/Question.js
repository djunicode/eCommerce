import React from 'react';

function Question({ question, answer }) {
  return (
    <div>
      <hr />
      <span style={{ color: 'black', fontWeight: '1000' }}>
        Q: {question}
      </span>
      <br />
      <span style={{ color: '#5F5F5F' }}>A: {answer}</span>
      <br />
      <p style={{ color: '#5F5F5F' }}>
        <small>Seller Name</small>&nbsp;|&nbsp;
        <small style={{ color: '#5EAAA8' }}>+2 more answers</small>
      </p>
      <hr />
    </div>
  );
}

export default Question;
