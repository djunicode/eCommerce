import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { updateProduct } from '../actions/productActions';
import { createProduct } from '../actions/productActions';
import { listCategories, listSubCategories } from '../actions/categoryActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { printSchema } from 'graphql';
// import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { BrandDropdown, CatDropdown, SubCatDropdown } from '../components/Dropdowns';
import NewOptions from '../components/NewOptions';
import { set } from 'mongoose';

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
  const [optionsInput, setOptionsInput] = useState([]);

  const [optName, setOptName] = useState('');
  const [optPrice, setOptPrice] = useState(0);
  const [optDiscount, setOptDiscount] = useState(0);
  const [optQty, setOptQty] = useState(0);


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
  
  useEffect(() => {
      if (successCreate) {
        history.push('/admin/productlist');
        } 
  }, [successCreate, createdProduct]);

  function handleSubmit(e) {
    let temp = {name: optName, discount: optDiscount, price: optPrice, countInStock: optQty}
    setOptionsInput([...optionsInput, temp]);
    console.log(optionsInput);
  }

  const createProductHandler = () => {

    handleSubmit();

    let temp = {name: optName, discount: optDiscount, price: optPrice, countInStock: optQty}

    const newOptions = [...optionsInput, temp];

    var OptFields = newOptions.reduce((accumulator, option) => {let optionString=`{name: "${option.name}", price: ${option.price}, discount: ${option.discount}, countInStock: ${option.countInStock}},` 
    accumulator+=optionString;
    console.log(accumulator);
    console.log(optionsInput);
    return accumulator;
    }, "")
    console.log(OptFields);

    var newString = `[${OptFields}]`

    const query = `mutation {
      createProduct(productInput: {name: "${name}", discount: ${discount}, price: ${price}, options: ${newString}, image: "${image}", brand: "${brand}", category: "${categ}", subcategory: "${subCateg}", new: ${newArrival}, countInStock: ${countInStock}, numReviews: 0, description: "${description}"}) {
          name
          _id
      }
    }
    `;

    dispatch(createProduct(query));
    console.log("product created");
  };


  var ctr = 1;

  const [click, setClick] = useState([ctr]);

  const addNew = () => {
    setClick([...click, click+1 ]);
    console.log(click);
    handleSubmit();
    setOptName('');
    setOptPrice(0);
    setOptDiscount(0);
    setOptQty(0);
  }


  useEffect(() => {
    // setOptionsInput([...option, sample]);
    console.log(optionsInput);
  }, [optionsInput]);


  return (
    <div style={{padding: '120px 4rem'}}>
      <Link to="/admin/productlist" className="btn btn-light my-3" style={{border: '1px solid #D4D4D4'}}>
        Go Back
      </Link>
      <h1 style={{marginBottom: '30px'}}>Create New Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Form style={{ background: '#F9F9F9', padding: '3rem', marginBottom: '40px' }}>
            <Row style={{ marginBottom: '1rem' }}>
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
                  
                  <Col>
                    <Form.Group as={Col} controlId="countInStock">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter quantity"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                      />
                    </Form.Group>
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
      <div>
        {click.map((c,index) => {
          return( 
            <div style={{ background: '#F9F9F9', padding: '3rem', marginBottom: '40px' }}> 
              <div>OPTION {index+1}</div>
              <NewOptions setOptName={setOptName} setOptPrice={setOptPrice} setOptDiscount={setOptDiscount} setOptQty={setOptQty} /> 
            </div> 
          );
        })}
      </div>
      <div style={{ background: '#F9F9F9', padding: '2rem 3rem', marginBottom: '40px', color: '#30475E', fontWeight: '600'}} onClick={addNew}>
      <i class="fas fa-plus" style={{marginRight: '15px'}}></i> ADD A NEW OPTION
      </div>
      <Col className="text-right">
        <Button style={{background: '#F05454'}} onClick={createProductHandler}>Create Product</Button>
      </Col>
    </div>
  );
};

export default ProductCreateScreen;

const SizeCol = styled.td`
  border: 1px solid rgb(0, 0, 0, 0.05);
  background: rgb(255, 255, 255);
`;
