import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { DARK_BLUE_2, LIGHT_PEACH } from '../util/colors';

import { search } from '../actions/searchActions';
import { filter } from '../actions/filterActions';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const dispatch = useDispatch();

  // Apply once data received from backend
  // const searchState = useSelector((state) => state.search);
  // const { loading, error, products } = searchState;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(search(keyword));
    dispatch(filter());
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
    console.log(keyword);
  };

  return (
    <StyledForm onSubmit={submitHandler} inline>
      <StyledFormControl
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      />
      <StyledButton onClick={submitHandler}>
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
