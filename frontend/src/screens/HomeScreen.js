import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Card } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';
import styled from 'styled-components';

const HomeScreen = ({ match }) => {
  const { keyword } = match.params;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);


  // STYLED COMPONENTS
  const CatCard = styled(Card)`
    border: none;
    text-align: center;
    position: relative;
    margin-bottom: 2rem;
  `
  const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(0deg, rgba(18, 25, 32, 0.8), rgba(18, 25, 32, 0.8));
    height: 100%;
    width: 100%;
    z-index: 1;
  `;
  const Ctitle = styled(Card.Title)`
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
    position: absolute;
    text-align: center;
    margin: 15px auto;
    left: 15px;
    right: 15px;
    z-index: 2;
  `;
  const Cbutton = styled(Button)`
    font-size: 0.8rem;
    color: #FFB396;
    border-color: #FFB396;
    padding: 10px 15px;
    position: absolute;
    bottom: 40px;
    margin: auto;
    left: 0;
    right: 0;
    z-index: 2;
    &:hover {
      background: #FFB396;
      color: #000000;
      border-color: #FFB396;
    }
  `;


  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      {/* <h1>New Arrivals</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword || ''}
          />
        </>
      )} */}

      {/* CATEGORIES */}
      <h1>Categories</h1>
      <Row className="justify-content-center">
          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/CROCKERY AND MELAMINE.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>CROCKERY AND MELAMINE</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/COPPER AND BRASS UTENSILS.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>COPPER AND BRASS UTENSILS</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/BAKING ITEMS.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>BAKING ITEMS</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/CUTLERY.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>CUTLERY</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/STAINLESS STEEL UTENSILS.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>STAINLESS STEEL UTENSILS</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/GAS STOVES AND COOKERS.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>GAS STOVES AND COOKERS</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/HOME APPLIANCES.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>HOME APPLIANCES</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/THERMOWARE.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>THERMOWARE</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/NON STICK ITEMS.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>NON-STICK ITEMS</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/PLASTIC HOUSEHOLD ITEMS.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>PLASTIC HOUSEHOLD ITEMS</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/CLEANING AND SANITARY ITEMS.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>CLEANING AND SANITARY ITEMS</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/FANCY ORGANISERS.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>FANCY ORGANISERS</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/FURNITURE HOUSEHOLD.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>FURNITURE HOUSEHOLD</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/USE AND THROW ITEMS.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>USE AND THROW ITEMS</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>

          <Col sm={12} md={6} lg={4} xl={3}>
            <CatCard>
              <Overlay/>
              <Card.Img src="../uploads/MISCELLANEOUS.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Ctitle>MISCELLANEOUS</Ctitle>
                <Cbutton variant="outline-primary">SHOP NOW</Cbutton>
              </Card.ImgOverlay>
            </CatCard>
          </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
