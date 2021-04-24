import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { updateProduct } from '../actions/productActions';
import SizeModal from '../components/Modals';
import { createProduct } from '../actions/productActions';
import { listCategories, listSubCategories } from '../actions/categoryActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { printSchema } from 'graphql';
// import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { BrandDropdown, CatDropdown, SubCatDropdown } from '../components/Dropdowns';

const ProductCreateScreen = ({ match, history }) => {
//   const productId = match.params.id;

  const [name, setName] = useState('');
  const [image, setImage] = useState('one');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0.0);
  const [discount, setDiscount] = useState(0.0);
  const [categ, setCateg] = useState('6033f160eb01e64a1ccf7046');
  const [subCateg, setSubCateg] = useState('6033f161eb01e64a1ccf7055');
  const [countInStock, setCountInStock] = useState(0);
  const [size, setSize] = useState(0);
  const [description, setDescription] = useState('');
  // const [uploading, setUploading] = useState(false);
  const [newArrival, setNewArrival] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const query = `mutation {
    createProduct(productInput: {name: "${name}", discount: ${discount}, price: ${price}, user: "${userInfo._id}", image: "${image}", brand: "${brand}", category: "${categ}", subcategory: "${subCateg}", new: ${newArrival}, countInStock: ${countInStock}, numReviews: 0, description: "${description}"}) {
        name
        _id
    }
  }
  `;
  
  useEffect(() => {
      if (successCreate) {
        history.push('/admin/productlist');
        } 
  }, [successCreate, createdProduct]);

  const createProductHandler = () => {
      // if(userInfo) {
        dispatch(createProduct(query));
        console.log("product created");
        console.log(query);
        // history.push('/admin/productlist');
      // }
  };

//   const productUpdate = useSelector((state) => state.productUpdate);
//   const {
//     loading: loadingUpdate,
//     error: errorUpdate,
//     success: successUpdate,
//   } = productUpdate;

  // useEffect(() => {
  //   if (successUpdate) {
  //     dispatch({ type: PRODUCT_UPDATE_RESET });
  //     history.push('/admin/productlist');
  //     } 
  //     else if (!product.name || product._id !== productId) {
  //       dispatch(listProductDetails(productId));
  //     } else {
  //       setName(product.name);
  //       setPrice(product.price);
  //       setImage(product.image);
  //       setBrand(product.brand);
  //       setCategory(product.category);
  //       setCountInStock(product.countInStock);
  //       setDescription(product.description);
  //   }
  // }, [dispatch, history, productId, product, successUpdate]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(
//       updateProduct({
//         _id: productId,
//         name,
//         image,
//         brand,
//         category,
//         description,
//         countInStock,
//       }),
//     );
//   };


  return (
    <div style={{padding: '120px 4rem'}}>
      <Link to="/admin/productlist" className="btn btn-light my-3" style={{border: '1px solid #D4D4D4'}}>
        Go Back
      </Link>
      <h1>Create Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Form style={{ background: '#F9F9F9', padding: '3rem', marginBottom: '40px' }}>
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
                    <BrandDropdown brand={brand} setBrand = {setBrand} />
                  </Col>

                  <Col controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row style={{ marginBottom: '1rem' }}>
                  <Col controlId="categ">
                    <CatDropdown categ={categ} setCateg={setCateg}/>
                  </Col>

                  <Col controlId="subCateg">
                      <SubCatDropdown categ={categ} subCateg={subCateg} setSubCateg={setSubCateg}/>
                    </Col>
                  
                  <Col controlId="discount">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      type="number"
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
            */}

          </Form>
        </>
      )}
      <Button onClick={createProductHandler}>Save Changes</Button>
    </div>
  );
};

export default ProductCreateScreen;

const SizeCol = styled.td`
  border: 1px solid rgb(0, 0, 0, 0.05);
  background: rgb(255, 255, 255);
`;
