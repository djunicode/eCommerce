/* eslint no-return-assign: "error" */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { Dropdown } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import FilterSidebar from '../components/FilterSidebar';
import { search } from '../actions/searchActions';
import { filter } from '../actions/filterActions';

import {
  StyledBadgeSortDiv,
  StyledBadge,
  StyledDropdownToggle,
  StyledDropdownItem,
  StyledGridDiv,
  StyledSimilarProdsH1,
  StyledWarning,
} from '../util/StyledComponents';

import { DARK_BLUE_2 } from '../util/colors';

import '../css/card.module.css';

const SearchScreen = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(search(keyword));
  }, [dispatch, keyword]);

  const searchedProduct = useSelector((state) => state.search);
  const { loading, error, products } = searchedProduct;

  const [localProducts, setLocalProducts] = useState(products);
  const [productsSet, setProductsSet] = useState(false);

  if (products.length > 0 && !productsSet) {
    setLocalProducts(products);
    setProductsSet(true);
  }

  const filtersApplied = useSelector((state) => state.filter);
  const { filters } = filtersApplied;

  let breaker = false;

  if (localProducts && localProducts.length === 0 && !loading) {
    return (
      <Message variant="danger">
        No Products Matched the Search criteria!
      </Message>
    );
  }

  let noProds = true;
  const renderedProds = [];

  //

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <FilterSidebar page="Search" />
          {localProducts[0] && (
            <StyledBadgeSortDiv>
              <StyledBadge variant="danger">
                {keyword.toUpperCase()}{' '}
                <Link to="/">
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
                    onClick={() => {
                      // dispatch(search(keyword, 'asc'));
                      // if (
                      //   filters.brands &&
                      //   JSON.parse(
                      //     sessionStorage.getItem(
                      //       'proshop_brand_length',
                      //     ),
                      //   ) === filters.brands.length
                      // ) {
                      //   dispatch(filter({}));
                      // }
                      const temp = [...localProducts];
                      setLocalProducts(
                        temp.sort((a, b) => {
                          return a.price - b.price;
                        }),
                      );
                      // console.log(localProducts.sort(
                      //   (a,b) => {
                      //     console.log(a.price, b.price);
                      //     return (a.price - b.price)
                      //   }
                      // ));
                    }}
                  >
                    Price - Low to High
                  </StyledDropdownItem>
                  <StyledDropdownItem
                    as="button"
                    onClick={() => {
                      // dispatch(search(keyword, 'desc'));
                      // if (
                      //   filters.brands &&
                      //   JSON.parse(
                      //     sessionStorage.getItem(
                      //       'proshop_brand_length',
                      //     ),
                      //   ) === filters.brands.length
                      // ) {
                      //   dispatch(filter({}));
                      // }
                      const temp = [...localProducts];
                      setLocalProducts(
                        temp.sort((a, b) => {
                          return b.price - a.price;
                        }),
                      );
                    }}
                  >
                    Price - High to Low
                  </StyledDropdownItem>
                </Dropdown.Menu>
              </Dropdown>
            </StyledBadgeSortDiv>
          )}
          <StyledGridDiv>
            {localProducts &&
              localProducts.length > 0 &&
              Object.keys(filters).length === 0 &&
              localProducts.map((product) => (
                <Product product={product} key={product._id} />
              ))}

            {localProducts &&
              localProducts.length > 0 &&
              Object.keys(filters).length > 0 &&
              localProducts.map(
                (product) =>
                  product.price <= filters.price.max &&
                  product.price >= filters.price.min &&
                  product.avgRating >= filters.rating &&
                  filters.brands.includes(product.brand.name) && (
                    <>
                      <Product product={product} key={product._id} />
                      {(noProds = true)}
                      {console.log(renderedProds.push(product))}
                    </>
                  ),
              )}
          </StyledGridDiv>
          {noProds &&
            Object.keys(filters).length > 0 &&
            filters.rating !== Infinity && (
              <>
                {(noProds = false)}
                {renderedProds.length === 0 && (
                  <>
                    <StyledWarning variant="danger">
                      No Products Found
                    </StyledWarning>
                    {/* <StyledSimilarProdsH1>
                    Similar localProducts
                  </StyledSimilarProdsH1> */}
                  </>
                )}
                {/* {renderedProds.length === 0 && (
                  <StyledSimilarProdsH1>
                    Similar localProducts xxx
                  </StyledSimilarProdsH1>
                )} */}
                {localProducts.map((product) => {
                  if (
                    !breaker &&
                    filters.brands.includes(product.brand.name) &&
                    !renderedProds.includes(product)
                  ) {
                    breaker = true;
                    return (
                      <StyledSimilarProdsH1>
                        Similar Products
                      </StyledSimilarProdsH1>
                    );
                  }
                })}
                <StyledGridDiv>
                  {localProducts.map(
                    (product) =>
                      filters.brands.includes(product.brand.name) &&
                      !renderedProds.includes(product) && (
                        <Product
                          product={product}
                          key={product._id}
                        />
                      ),
                  )}
                </StyledGridDiv>
              </>
            )}
          {noProds &&
            Object.keys(filters).length > 0 &&
            filters.rating === Infinity && (
              <>
                {(noProds = false)}
                <StyledGridDiv>
                  {localProducts.map(
                    (product) =>
                      filters.brands.includes(product.brand.name) &&
                      !renderedProds.includes(product) && (
                        <Product
                          product={product}
                          key={product._id}
                        />
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

export default SearchScreen;
