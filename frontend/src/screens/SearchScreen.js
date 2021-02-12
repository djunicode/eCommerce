import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import FilterSidebar from '../components/FilterSidebar';

const SearchScreen = (props) => {
  const dispatch = useDispatch();

  const searchedProduct = useSelector((state) => state.search);
  const { loading, error, products } = searchedProduct;
  console.log(products);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <FilterSidebar />
          <Row>
            {products.data && (
              products.data.searchProduct.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default SearchScreen;
