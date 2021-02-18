import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

function Buttons({ option, handleClick }) {
  return (
    <BUTTON_STYLES
      className="py-1 px-2 mx-1 mb-2 mt-1"
      name={option}
      onClick={() => {
        handleClick(option);
      }}
    >
      {option.msg}
    </BUTTON_STYLES>
  );
}

export default Buttons;

const BUTTON_STYLES = styled(Button)`
  background: #dff2fa;
  border: 2px solid #5eaaa8;
  border-radius: 20px;
  color: black;
  text-transform: none;
  transition: 0.4s;

  &:hover {
    background: #5eaaa8;
    border: 2px solid #dff2fa;
    border-radius: 20px;
    color: black;
    text-transform: none;
  }

  &:focus {
    background: #dff2fa;
    border: 2px solid #5eaaa8;
    border-radius: 20px;
    color: black;
    text-transform: none;
  }
`;
