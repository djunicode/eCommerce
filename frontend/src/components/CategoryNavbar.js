/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Nav,
  NavDropdown,
  Carousel,
  Row,
  Col,
} from 'react-bootstrap';
import styled from 'styled-components';
import {
  listCategories,
  listSubCategories,
} from '../actions/categoryActions';

const CategoryNav = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const subdispatch = useDispatch();

  const subCategoryList = useSelector(
    (state) => state.subCategoryList,
  );
  const { suberror, subcategories } = subCategoryList;

  const navquery = `query {
      getCategories {
        name,
        _id
      }
    }`;

  const addsubCategories = (id) => {
    const navsub = `query{
        getSubCategories(categoryId: "${id}") {
            name
            _id
        }
    }`;
    subdispatch(listSubCategories(navsub));
    console.log(subcategories);
  };

  // useEffect(() => {

  // }, [subdispatch]);

  useEffect(() => {
    dispatch(listCategories(navquery));
  }, [dispatch]);

  const content = [];

  if (categories) {
    if (subcategories) {
      content.push(
        <Nav className="mr-auto" key="1">
          {categories.map((navcategories) => (
            <CategoryList
              title={navcategories.name}
              id="collasible-nav-dropdown"
              key={navcategories._id}
              onClick={() => addsubCategories(navcategories._id)}
            >
              {subcategories.map((addsub) => (
                <NavDropdown.Item href="#" key={addsub._id}>
                  {addsub.name}
                </NavDropdown.Item>
              ))}
            </CategoryList>
          ))}
        </Nav>,
      );
    }
  }

  return (
    <>
      <CatNavbar>{content}</CatNavbar>
    </>
  );
};

export default CategoryNav;

const CatNavbar = styled(Navbar)`
  background-color: #fffcf2;
  padding: 0.5rem;
  overflow-x: scroll;
`;
const CategoryList = styled(NavDropdown)`
  font-size: 1rem;
  text-transform: capitalize;
  color: #30475e;
`;
