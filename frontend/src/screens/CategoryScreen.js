import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import styled from 'styled-components';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import FilterSidebar from '../components/FilterSidebar';
import { getCategories } from '../actions/categoryActions';
import { Badge, DropdownButton, Dropdown } from 'react-bootstrap';

import { LIGHT_BLUE, DARK_BLUE_2 } from '../util/colors';

const CategoryScreen = props => {
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

    const sortLowToHighHandler = () => {
      products.sort((a, b) => a.price-b.price);
      console.log(products);
    };

    return(
        <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <FilterSidebar page="Category"/>
          {products[0] && (<StyledBadgeSortDiv>
            <StyledBadge variant="danger">{products[0].category.name.toUpperCase()}{' '} 
              <Link to="/home"><i className="fas fa-times" style={{ color: DARK_BLUE_2 }}/></Link>
            </StyledBadge>
            <Dropdown>
              <StyledDropdownToggle id="dropdown-basic">
                SORT BY  
              </StyledDropdownToggle>
              <Dropdown.Menu>
                <StyledDropdownItem as="button" onClick={() => dispatch(getCategories(id, 'asc'))}>Price - Low to High</StyledDropdownItem>
                <StyledDropdownItem as="button" onClick={() => dispatch(getCategories(id, 'desc'))}>Price - High to Low</StyledDropdownItem>
              </Dropdown.Menu>
            </Dropdown>
          </StyledBadgeSortDiv>)}
          <StyledGridDiv>
              {Object.keys(products).length > 0 && Object.keys(filters).length === 0 && (products.map((product) => ( <Product product={product} key={product._id} /> )))}
              
              {Object.keys(products).length > 0 && Object.keys(filters).length > 0 && (
                products.map((product) => (product.price <= filters.price) && (
                    (filters.brands.includes(product.brand.name) && (
                      <>
                        <Product product={product} key={product._id}/>
                        { noProds = true }
                        { console.log(renderedProds.push(product)) }
                      </>
                    )
                  )
                ))
              )}
          </StyledGridDiv>
          {noProds && Object.keys(filters).length > 0 && (
            <>
            {noProds = false}
            <StyledSimilarProdsH1>Similar Products</StyledSimilarProdsH1>
            <StyledGridDiv>
              {(
                products.map(product => (filters.brands.includes(product.brand.name) && (!renderedProds.includes(product)) &&(
                  <Product product={product} key={product._id} />
                )))
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

const StyledBadgeSortDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 330px;
  margin-right: 12px;
`;

const StyledBadge = styled.p`
  font-size: 20px;
  border-radius: 8px;
  background-color: ${LIGHT_BLUE} !important;
  color: ${DARK_BLUE_2} !important;
  border: 2px ${DARK_BLUE_2} solid;
  padding: 7px;
`;

const StyledDropdownToggle = styled(Dropdown.Toggle)`
  background-color: ${DARK_BLUE_2} !important;
  color: ${LIGHT_BLUE} !important;
  border-radius: 8px;
  padding: 10px !important;
  font-size: 16px;
`;

const StyledDropdownItem = styled(Dropdown.Item)`
  background-color: ${DARK_BLUE_2};
  color: ${LIGHT_BLUE};
  font-size: 16px;
  border: none !important;

  &:hover {
    background-color: ${LIGHT_BLUE};
    color: ${DARK_BLUE_2};
}
`;

const StyledGridDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 330px;
  overflow-y: auto !important;
  z-index: 1000 !important;
  background-color: ${LIGHT_BLUE};
  margin-right: 12px;
`;

const StyledSimilarProdsH1 = styled.h1`
  margin-left: 330px;
  padding: 0;
  margin-top: 8px;
`;