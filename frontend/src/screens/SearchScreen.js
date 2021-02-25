// import React from 'react';
// import { useSelector } from 'react-redux';
// import styled from 'styled-components';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import Product from '../components/Product';
// import FilterSidebar from '../components/FilterSidebar';

// import { tempProds } from '../util/productData';
// import { LIGHT_BLUE } from '../util/colors';

const SearchScreen = () => {
  /*
  const searchedProduct = useSelector((state) => state.search);
  const { loading, error, products } = searchedProduct;
  // console.log(products);
  // console.log(tempProds);

  // const filters = JSON.parse(localStorage.getItem('filters-proshop'));
  // localStorage.removeItem('filters-proshop');
  // console.log(filters);
  // localStorage.setItem('filters-proshop', false);

  const filtersApplied = useSelector((state) => state.filter);
  const { loadingF, errorF, filters } = filtersApplied;

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <FilterSidebar />
          <StyledGridDiv>
            {tempProds.data &&
              tempProds.data.searchProduct.map((product) => (
                <>
                  {filters ? (
                    product.price < filters.price &&
                    filters.brands.includes(product.brand.name) && (
                      <Product product={product} key={product._id} />
                    )
                  ) : (
                    <Product product={product} key={product._id} />
                  )}
                </>
              ))}
          </StyledGridDiv>
        </>
      )}
    </>
  );
  */
};

export default SearchScreen;

/*
const StyledGridDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  left: 340px;
  right: 20px;
  top: 85px;
  overflow-y: auto !important;
  z-index: 100 !important;
  background-color: ${LIGHT_BLUE};
`;
*/
