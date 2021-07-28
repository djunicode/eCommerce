/* eslint no-return-assign: "error" */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { Dropdown } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import FilterSidebar from '../components/FilterSidebar';
import { getProductByCategory } from '../actions/categoryActions';
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

import '../css/card.module.css';

const CategoryScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductByCategory(id));
    dispatch(filter({}));
  }, [dispatch, id]);

  const searchedCategory = useSelector(
    (state) => state.productsByCategory,
  );
  const { loading, error, products } = searchedCategory;
  console.log(products);

  const [localProducts, setLocalProducts] = useState(products);
  const [productsSet, setProductsSet] = useState(false);

  if (products.length > 0 && !productsSet) {
    setLocalProducts(products);
    setProductsSet(true);
  }

  const filtersApplied = useSelector((state) => state.filter);
  const { filters } = filtersApplied;
  console.log(filters);

  let breaker = false;

  let noProds = true;
  let renderedProds = [];
  useEffect(() => {
    renderedProds = [];
  }, [filters, localProducts, id]);

  if (localProducts && localProducts.length === 0 && !loading) {
    return (
      <Message variant="danger">
        No Products found in this Category
      </Message>
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <FilterSidebar page="Category" />
          {localProducts[0] && (
            <StyledBadgeSortDiv>
              <StyledBadge variant="danger">
                <span style={{ color: '#5F5F5F' }}>
                  Categories /{' '}
                </span>
                {localProducts[0].category.name}{' '}
                <Link to="/">
                  <i
                    className="fas fa-times"
                    style={{ color: '#5F5F5F', marginLeft: '1rem' }}
                  />
                </Link>
              </StyledBadge>
              <Dropdown>
                <StyledDropdownToggle>Sort By</StyledDropdownToggle>
                <Dropdown.Menu style={{ background: '#fff' }}>
                  <StyledDropdownItem
                    as="button"
                    onClick={() => {
                      // dispatch(getProductByCategory(id, 'asc'));
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
                    }}
                  >
                    Price - Low to High
                  </StyledDropdownItem>
                  <StyledDropdownItem
                    as="button"
                    onClick={() => {
                      // dispatch(getProductByCategory(id, 'desc'));
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
            {Object.keys(localProducts).length > 0 &&
              Object.keys(filters).length === 0 &&
              localProducts.map((product) => (
                <Product product={product} key={product._id} />
              ))}

            {Object.keys(localProducts).length > 0 &&
              Object.keys(filters).length > 0 &&
              localProducts.map(
                (product) =>
                  product.price <= filters.price.max &&
                  product.price >= filters.price.min &&
                  product.avgRating >= filters.rating &&
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
          {noProds &&
            Object.keys(filters).length > 0 &&
            filters.rating !== Infinity && (
              <>
                {(noProds = false)}
                {renderedProds.length === 0 && (
                  <StyledWarning variant="danger">
                    No Products Found
                  </StyledWarning>
                )}
                {/* <StyledSimilarProdsH1>
                  Similar Products
                </StyledSimilarProdsH1> */}
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

export default CategoryScreen;
