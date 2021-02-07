import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { DARK_BLUE_2, LIGHT_PEACH } from '../util/colors';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };


  // STYLED COMPONENTS
  const Sbox = styled.div`
    color: #FFDFC3;
    border: 1.5px solid #FFDFC3;
    margin-left: 20vw;
  `
  const Input = styled(Form.Control)`
    background-color: transparent;
    margin: 0 !important;
    width: 20vw !important;
  `
  const SearchButton = styled(Button)`
    color: #FFDFC3;
    border: none;
    margin: 0 10px;
  `


  return (
    <StyledForm onSubmit={submitHandler} inline>
      <StyledFormControl
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      />
      <StyledButton>
        <i className="fas fa-search" />
      </StyledButton>
    </StyledForm>
  );
};

export default SearchBox;

const StyledForm = styled(Form)`
  width: 45%;
  justify-content: center;
  margin: auto;
  border: 2px ${LIGHT_PEACH} solid;
  border-radius: 4px;
  align-items: space-between;
  flex-wrap: nowrap !important;
`;

const StyledFormControl = styled(Form.Control)`
  width: 80% !important;
  margin: auto 0 !important;
  padding-left: 0 !important;
  background-color: ${DARK_BLUE_2};
  color: ${LIGHT_PEACH};
  outline: none !important;
  box-shadow: none !important;

  &:focus{
    background-color: ${DARK_BLUE_2} !important;
    color: ${LIGHT_PEACH} !important;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${LIGHT_PEACH};
    -webkit-box-shadow: 0 0 0px 1000px #000 inset;
    transition: background-color 5000s ease-in-out 0s;
  }
}
`;

const StyledButton = styled(Button)`
  background-color: ${DARK_BLUE_2} !important;
  color: ${LIGHT_PEACH} !important;
  font-size: 20px;
  padding-right: 0 !important;
  outline: none !important;
  box-shadow: none !important;
`;
