import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import styled from 'styled-components';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import FilterSidebar from '../components/FilterSidebar';
import { getCategories } from '../actions/categoryActions';
import { Badge } from 'react-bootstrap';

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
    const pricePass = [];

    return(
        <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <FilterSidebar page="Category"/>
          {products[0] && <StyledBadge variant="danger">{products[0].category.name.toUpperCase()}{' '} 
          <Link to="/home"><i className="fas fa-times" style={{ color: DARK_BLUE_2 }}/></Link>
          </StyledBadge>}
          <StyledGridDiv>
              {Object.keys(products).length > 0 && Object.keys(filters).length === 0 && (products.map((product) => ( <Product product={product} key={product._id} /> )))}
              
              {Object.keys(products).length > 0 && Object.keys(filters).length > 0 && (
                products.map((product) => (product.price <= filters.price) && (
                    (filters.brands.includes(product.brand.name) && (<Product product={product} key={product._id} />)
                  )
                ))
              )}
          </StyledGridDiv>
        </>
      )}
    </>
    );
};

export default CategoryScreen;

const StyledBadge = styled(Badge)`
  margin-left: 330px;
  font-size: 20px;
  border-radius: 8px;
  margin-top: -8px !important;
  background-color: ${LIGHT_BLUE} !important;
  color: ${DARK_BLUE_2} !important;
  border: 2px ${DARK_BLUE_2} solid;
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
`;