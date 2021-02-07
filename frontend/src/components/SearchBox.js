import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

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
    <Form onSubmit={submitHandler} inline>
      <Sbox>
        <Input
          type="text"
          name="q"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search"
          className="mr-sm-2 ml-sm-5"
        >
        </Input>
        <SearchButton type="submit" variant="outline-success" className="p-2">
          <i className="fas fa-search fa-lg"></i>
        </SearchButton>
      </Sbox>
    </Form>
  );
};

export default SearchBox;
