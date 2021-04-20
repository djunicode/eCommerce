import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { updateProduct } from '../actions/productActions';
import { listCategories, listSubCategories } from '../actions/categoryActions';
import SizeModal from '../components/Modals';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const prodId = match.params._id;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [categ, setCateg] = useState('6033f160eb01e64a1ccf7046');
  const [subCateg, setSubCateg] = useState('6033f161eb01e64a1ccf7055');
  const [countInStock, setCountInStock] = useState(0);
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [newArrival, setNewArrival] = useState(false);
  // const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const { catloading, caterror, categories } = categoryList;

  const queryCategories = `query {
    getCategories {
      name,
      _id
    }
  }`;

  useEffect(() => {
    dispatch(listCategories(queryCategories));
  }, [dispatch]);

  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subloading, suberror, subcategories } = subCategoryList;

  const querySub = `query{
    getSubCategories (categoryId: "${categ}") {
      name
      _id
    }
  }`;

  useEffect(() => {
    if(categ != "") {
        dispatch(listSubCategories(querySub));
      }
  }, [categ]);

  const updateQuery = `mutation {
    updateProduct (productId:"6033f161eb01e64a1ccf705f", updateProduct:{name:"iphone", price: 100, image: "one", brand: "some brand", category:"6033f160eb01e64a1ccf7046", subcategory: "6033f161eb01e64a1ccf7055", countInStock: 2, description: "something"}) {
      name
      price
    }
  }`;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
      } 
    //   else if (!product.name || product._id !== prodId) {
    //     dispatch(listProductDetails(prodId));
    //   } else {
    //     setName(product.name);
    //     setPrice(product.price);
    //     setImage(product.image);
    //     setBrand(product.brand);
    //     setCategory(product.category);
    //     setCountInStock(product.countInStock);
    //     setDescription(product.description);
    // }
  }, [dispatch, history, prodId, product, successUpdate]);

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   setUploading(true);

  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     };

  //     const { data } = await axios.post(
  //       '/api/upload',
  //       formData,
  //       config,
  //     );

  //     setImage(data);
  //     setUploading(false);
  //   } catch (err) {
  //     console.error(err);
  //     setUploading(false);
  //   }
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(updateQuery),
    );
  };

  // const [modalShow, setModalShow] = React.useState(false);
  // const [sizes, setSizes] = useState([
  //   {
  //     value: '',
  //   },
  // ]);
  // const [prices, setPrices] = useState([
  //   {
  //     value: 0,
  //   },
  // ]);

  // const addSize = (size) => {
  //   setSizes([...sizes, { size }]);
  // };
  // const addPrice = (price) => {
  //   setPrices([...prices, { price }]);
  // };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && (
        <Message variant="danger">{errorUpdate}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* <SizeModal
            addSize={addSize}
            addPrice={addPrice}
            show={modalShow}
            onHide={() => setModalShow(false)}
          /> */}
          <Form style={{ background: '#F9F9F9', padding: '3rem' }}>
            <Row>
              <Col>
                <Row style={{ marginBottom: '1rem' }}>
                  <Col controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>

                  <Col controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </Col>

                  <Col controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row style={{ marginBottom: '1rem' }}>
                  <Col controlId="categ">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        // value={category}
                        onChange={(e) => {setCateg(e.target.value);}}
                    >
                    {categories.map((cat) => (
                        <option value={cat._id}>{cat.name}</option>
                    ))}
                    {/* <option onClick={() => {setModalShow(true)}}>+ Add Category</option> */}
                    </Form.Control>
                  </Col>

                  <Col controlId="subCateg">
                    <Form.Label>Sub Category</Form.Label>
                    <Form.Control
                      as="select"
                      // value={subCategory}
                      onChange={(e) => {setSubCateg(e.target.value);}}
                    >
                    {subcategories.map((sub) => (
                      <option value={sub._id}>{sub.name}</option>
                    ))}
                    {/* <option>+ Add Sub Category</option> */}
                    </Form.Control>
                  </Col>

                  <Col controlId="discount">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      placeholder="Enter discount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>

              {/* <Col md={4}>
                <Table size="sm">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: '0',
                          border: 'none',
                          color: '#222831',
                        }}
                      >
                        <Form.Label>Size</Form.Label>
                      </td>
                      <td
                        style={{
                          padding: '0',
                          border: 'none',
                          color: '#222831',
                        }}
                      >
                        <Form.Label>Price</Form.Label>
                      </td>
                    </tr>
                    {sizes.map((s) => {
                      return (
                        <tr>
                          <SizeCol>{s.size}</SizeCol>
                          {prices.map((p) => {
                            return <SizeCol>{p.price}</SizeCol>;
                          })}
                        </tr>
                      );
                    })}
                    <tr>
                      <SizeCol
                        colSpan="2"
                        onClick={() => setModalShow(true)}
                      >
                        + Add size and price
                      </SizeCol>
                    </tr>
                  </tbody>
                </Table>
              </Col> */}
            </Row>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col} controlId="countInStock">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="size">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Check 
              type="switch"
              id="custom-switch"
              label="ADD TO NEW ARRIVALS"
              style={{marginTop: '2rem', fontWeight: '600'}}
              onClick={() => {setNewArrival(!newArrival); console.log(newArrival);}}
            />
            {/* 
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group> */}
          </Form>
          </>
      )}
      <Button onClick={submitHandler}>Save Changes</Button>
    </>
  );
};

export default ProductEditScreen;

const SizeCol = styled.td`
  border: 1px solid rgb(0, 0, 0, 0.05);
  background: rgb(255, 255, 255);
`;
