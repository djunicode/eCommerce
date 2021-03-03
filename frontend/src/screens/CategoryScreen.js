/* eslint no-return-assign: "error" */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { Dropdown } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import FilterSidebar from '../components/FilterSidebar';
import { getCategories } from '../actions/categoryActions';

import { DARK_BLUE_2 } from '../util/colors';

import {
  StyledBadgeSortDiv,
  StyledBadge,
  StyledDropdownToggle,
  StyledDropdownItem,
  StyledGridDiv,
  StyledSimilarProdsH1,
} from '../util/StyledComponents';

const CategoryScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories(id));
  }, [dispatch, id]);

  const searchedCategory = useSelector((state) => state.category);
  const { loading, error, products } = searchedCategory;
  console.log(products);

  const filtersApplied = useSelector((state) => state.filter);
  const { filters } = filtersApplied;
  console.log(filters);

  let noProds = true;
  const renderedProds = [];

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <FilterSidebar page="Category" />
          {products[0] && (
            <StyledBadgeSortDiv>
              <StyledBadge variant="danger">
                {products[0].category.name.toUpperCase()}{' '}
                <Link to="/home">
                  <i
                    className="fas fa-times"
                    style={{ color: DARK_BLUE_2 }}
                  />
                </Link>
              </StyledBadge>
              <Dropdown>
                <StyledDropdownToggle id="dropdown-basic">
                  SORT BY
                </StyledDropdownToggle>
                <Dropdown.Menu>
                  <StyledDropdownItem
                    as="button"
                    onClick={() => dispatch(getCategories(id, 'asc'))}
                  >
                    Price - Low to High
                  </StyledDropdownItem>
                  <StyledDropdownItem
                    as="button"
                    onClick={() =>
                      dispatch(getCategories(id, 'desc'))
                    }
                  >
                    Price - High to Low
                  </StyledDropdownItem>
                </Dropdown.Menu>
              </Dropdown>
            </StyledBadgeSortDiv>
          )}
          <StyledGridDiv>
            {Object.keys(products).length > 0 &&
              Object.keys(filters).length === 0 &&
              products.map((product) => (
                <Product product={product} key={product._id} />
              ))}

            {Object.keys(products).length > 0 &&
              Object.keys(filters).length > 0 &&
              products.map(
                (product) =>
                  product.price <= filters.price.max &&
                  product.price >= filters.price.min &&
                  filters.brands.includes(product.brand.name) &&
                  filters.rating <= product.avgRating && (
                    <>
                      <Product product={product} key={product._id} />
                      {(noProds = true)}
                      {console.log(renderedProds.push(product))}
                    </>
                  ),
              )}
          </StyledGridDiv>
          {noProds && Object.keys(filters).length > 0 && (
            <>
              {(noProds = false)}
              <StyledSimilarProdsH1>
                Similar Products
              </StyledSimilarProdsH1>
              <StyledGridDiv>
                {products.map(
                  (product) =>
                    filters.brands.includes(product.brand.name) &&
                    !renderedProds.includes(product) && (
                      <Product product={product} key={product._id} />
                    ),
                )}
              </StyledGridDiv>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CategoryScreen;
