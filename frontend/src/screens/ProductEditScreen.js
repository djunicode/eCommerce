/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars, no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  updateProduct,
  createProduct,
} from '../actions/productActions';
import {
  BrandDropdown,
  CatDropdown,
  SubCatDropdown,
} from '../components/Dropdowns';
import NewOptions from '../components/NewOptions';
import { getProduct } from '../actions/productidAction';

const ProductEditScreen = ({ match, history }) => {
  const prodId = match.params.id;

  const dispatch = useDispatch();

  const productid = useSelector((state) => state.productid);
  const { loading, data, error } = productid;

  const queryProductDetails = `query {
    getProductById (id: "${prodId}") {
      name
      image
      brand {
        name
        _id
      }
      price
      discount
      description
      countInStock
      category {
        name
        _id
      }
      subcategory {
        name
        _id
      }
      options {
        name
        price
        discount
        countInStock
      }
    }
  }`;

  const initialValues = {
    name: '',
    image: '',
    brand: '',
    price: 0,
    discount: 0,
    countInStock: 0,
    category: '',
    subCategory: '',
    description: '',
    options: [],
  };

  useEffect(() => {
    dispatch(getProduct(queryProductDetails));
  }, [dispatch]);

  const [name, setName] = useState(initialValues.name);
  const [image, setImage] = useState(initialValues.image);
  const [brand, setBrand] = useState(initialValues.brand);
  const [price, setPrice] = useState(initialValues.price);
  const [discount, setDiscount] = useState(initialValues.discount);
  const [categ, setCateg] = useState(initialValues.category);
  const [subCateg, setSubCateg] = useState(initialValues.subCategory);
  const [countInStock, setCountInStock] = useState(
    initialValues.countInStock,
  );
  const [description, setDescription] = useState(
    initialValues.description,
  );
  // const [uploading, setUploading] = useState(false);
  // const [newArrival, setNewArrival] = useState(initialValues.newArrival);

  const [optionsInput, setOptionsInput] = useState([]);

  const [optName, setOptName] = useState('');
  const [optPrice, setOptPrice] = useState();
  const [optDiscount, setOptDiscount] = useState(0);
  const [optQty, setOptQty] = useState();

  const [validated, setValidated] = useState(false);
  const [dropdownError, setDropdownError] = useState({brand: 'none', category: 'none', subcategory: 'none', optionname: 'none', optionprice: 'none', optionqty: 'none'})


  useEffect(() => {
    if (data && data.brand && data.category && data.subcategory) {
      setName(data.name);
      setPrice(data.price);
      setImage(data.image);
      setBrand(data.brand._id);
      setDiscount(data.discount);
      setCountInStock(data.countInStock);
      setCateg(data.category._id);
      setSubCateg(data.subcategory._id);
      setDescription(data.description);
      setOptionsInput(data.options);
      console.log(optionsInput);
    }
  }, [data, optionsInput]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successUpdate) {
      history.push('/admin/productlist');
    }
  }, [successUpdate]);

  function handleSubmit(e) {
    const temp = {
      name: optName,
      discount: optDiscount,
      price: optPrice,
      countInStock: optQty,
    };
    if (optName !== '') {
      setOptionsInput([...optionsInput, temp]);
    }
    console.log(optionsInput);
  }

  const updateProductHandler = (event) => {
    handleSubmit();

    let dbrand, dcategory, dsubcategory, optionname, optionprice, optionqty;

    if(brand === '') {
      dbrand = 'flex';
    }

    if(categ === '') {
      dcategory = 'flex';
    }
    
    if(subCateg === '') {
      dsubcategory = 'flex'
    }

    if(optName === '') {
      optionname = 'flex'
    }

    if(!optPrice) {
      optionprice = 'flex'
    }

    if(!optQty) {
      optionqty = 'flex'
    }

    setDropdownError({brand: `${dbrand}`, category: `${dcategory}`, subcategory: `${dsubcategory}`, optionname: `${optionname}`, optionprice: `${optionprice}`, optionqty: `${optionqty}`});

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const temp = {
      name: optName,
      discount: optDiscount,
      price: optPrice,
      countInStock: optQty,
    };

    const newOptions = [...optionsInput, temp];

    const OptFields = newOptions.reduce((accumulator, option) => {
      const optionString = `{name: "${option.name}", price: ${option.price}, discount: ${option.discount}, countInStock: ${option.countInStock}},`;
      accumulator += optionString;
      console.log(accumulator);
      console.log(option);
      return accumulator;
    }, '');
    console.log(OptFields);

    const newString = `[${OptFields}]`;
    console.log(newString);

    const query = `mutation {
      updateProduct(productId: "${prodId}", updateProduct:{name: "${name}", discount: ${discount}, price: ${price}, options: ${newString}, image: "${image}", brand: "${brand}", category: "${categ}", subcategory: "${subCateg}", countInStock: ${countInStock}, description: "${description}"}) {
          _id
      }
    }
    `;

    dispatch(updateProduct(query));
  };

  const ctr = 1;

  const [click, setClick] = useState([
    {
      value: ctr,
    },
  ]);

  const addNew = () => {
    setClick([...click, { value: ctr + 1 }]);
    handleSubmit();
    setOptName('');
    setOptPrice(0);
    setOptDiscount(0);
    setOptQty(0);
  };

  // useEffect(() => {
  //   // setOptionsInput([...option, sample]);
  //   console.log(optionsInput);
  // }, [optionsInput]);

  return (
    <div style={{ padding: '0 4rem' }}>
      <Link
        to="/admin/productlist"
        className="btn btn-light my-3"
        style={{ border: '1px solid #D4D4D4' }}
      >
        Go Back
      </Link>
      <h1 style={{ marginBottom: '30px' }}>
        Edit Product : <span>{prodId}</span>
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Form
            style={{
              background: '#F9F9F9',
              padding: '3rem',
              marginBottom: '40px',
            }}
            noValidate
            validated={validated}
          >
            <Row style={{ marginBottom: '1rem' }}>
              <Col>
                <Row style={{ marginBottom: '1rem' }}>
                  <Col controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                  </Col>

                  <Col controlId="brand">
                    <BrandDropdown
                      brand={brand}
                      setBrand={setBrand}
                    />
                  </Col>

                  <Col controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder={price}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                  </Col>

                  <Col>
                    <Form.Group as={Col} controlId="countInStock">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder={countInStock}
                        value={countInStock}
                        onChange={(e) =>
                          setCountInStock(e.target.value)
                        }
                      />
                      <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row style={{ marginBottom: '1rem' }}>
                  <Col controlId="categ">
                    <CatDropdown categ={categ} setCateg={setCateg} />
                  </Col>

                  <Col controlId="subCateg">
                    <SubCatDropdown
                      categ={categ}
                      subCateg={subCateg}
                      setSubCateg={setSubCateg}
                    />
                  </Col>

                  <Col controlId="discount">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={discount}
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
                required
                as="textarea"
                rows={3}
                placeholder={description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Check 
              type="switch"
              id="custom-switch"
              label="ADD TO NEW ARRIVALS"
              style={{marginTop: '2rem', fontWeight: '600'}}
              onClick={() => {setNewArrival(!newArrival); console.log(newArrival);}}
            /> */}

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
        {optionsInput.map((opt, index) => {
          return (
            <div
              style={{
                background: '#F9F9F9',
                padding: '3rem',
                marginBottom: '40px',
              }}
            >
              <div>OPTION {index + 1}</div>
              <Form>
                <Row>
                  <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={opt.name}
                      name={opt.name}
                      onChange={(e) => {
                        setOptName(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder={opt.price}
                      name={opt.price}
                      onChange={(e) => {
                        setOptPrice(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={opt.discount}
                      name={opt.discount}
                      onChange={(e) => {
                        setOptDiscount(e.target.value);
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder={opt.countInStock}
                      name={opt.countInStock}
                      onChange={(e) => {
                        setOptQty(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                  </Col>
                </Row>
              </Form>
            </div>
          );
        })}
        {click.map((c, index) => {
          if (index === 0) {
            return <div />;
          }

          return (
            <div
              style={{
                background: '#F9F9F9',
                padding: '3rem',
                marginBottom: '40px',
              }}
            >
              <div>OPTION {optionsInput.length + index}</div>
              <NewOptions
                setOptName={setOptName}
                setOptPrice={setOptPrice}
                setOptDiscount={setOptDiscount}
                setOptQty={setOptQty}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          background: '#F9F9F9',
          padding: '2rem 3rem',
          marginBottom: '40px',
          color: '#30475E',
          fontWeight: '600',
        }}
        onClick={addNew}
      >
        <i className="fas fa-plus" style={{ marginRight: '15px' }} />{' '}
        ADD A NEW OPTION
      </div>
      <Col className="text-right">
        <Button
          style={{ background: '#F05454' }}
          onClick={updateProductHandler}
        >
          Save Changes
        </Button>
      </Col>
    </div>
  );
};

export default ProductEditScreen;
