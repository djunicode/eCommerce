/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars, no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createProduct } from '../actions/productActions';
import {
  BrandDropdown,
  CatDropdown,
  SubCatDropdown,
} from '../components/Dropdowns';
import NewOptions from '../components/NewOptions';

const ProductCreateScreen = ({ history }) => {
  //   const productId = match.params.id;

  const [name, setName] = useState();
  const [image, setImage] = useState('one');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState(0);
  const [categ, setCateg] = useState('');
  const [subCateg, setSubCateg] = useState('');
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState();
  // const [uploading, setUploading] = useState(false);
  const [newArrival, setNewArrival] = useState(false);
  const [optionsInput, setOptionsInput] = useState([]);

  const [optName, setOptName] = useState('');
  const [optPrice, setOptPrice] = useState();
  const [optDiscount, setOptDiscount] = useState(0);
  const [optQty, setOptQty] = useState();

  const [validated, setValidated] = useState(false);
  const [dropdownError, setDropdownError] = useState({
    brand: 'none',
    category: 'none',
    subcategory: 'none',
    optionname: 'none',
    optionprice: 'none',
    optionqty: 'none',
  });

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

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  useEffect(() => {
    if (successCreate) {
      history.push('/admin/productlist');
    }
  }, [successCreate, createdProduct]);

  function handleSubmit(e) {
    const temp = {
      name: optName,
      discount: optDiscount,
      price: optPrice,
      countInStock: optQty,
    };
    setOptionsInput([...optionsInput, temp]);
    console.log(optionsInput);
  }

  const createProductHandler = (event) => {
    let dbrand;
    let dcategory;
    let dsubcategory;
    let optionname;
    let optionprice;
    let optionqty;

    if (brand === '') {
      dbrand = 'flex';
    }

    if (categ === '') {
      dcategory = 'flex';
    }

    if (subCateg === '') {
      dsubcategory = 'flex';
    }

    if (optName === '') {
      optionname = 'flex';
    }

    if (!optPrice) {
      optionprice = 'flex';
    }

    if (!optQty) {
      optionqty = 'flex';
    }

    setDropdownError({
      brand: `${dbrand}`,
      category: `${dcategory}`,
      subcategory: `${dsubcategory}`,
      optionname: `${optionname}`,
      optionprice: `${optionprice}`,
      optionqty: `${optionqty}`,
    });

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    console.log(optionsInput);

    if (optName !== '' && optPrice && optQty) {
      handleSubmit();

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
        console.log(optionsInput);
        return accumulator;
      }, '');
      console.log(OptFields);

      const newString = `[${OptFields}]`;

      const query = `mutation {
        createProduct(productInput: {name: "${name}", discount: ${discount}, price: ${price}, options: ${newString}, image: "${image}", brand: "${brand}", category: "${categ}", subcategory: "${subCateg}", new: ${newArrival}, countInStock: ${countInStock}, numReviews: 0, description: "${description}"}) 
        {
            name
            _id
        }
      }
      `;

      dispatch(createProduct(query));
    }
  };

  const ctr = 1;

  const [click, setClick] = useState([ctr]);

  const addNew = () => {
    setClick([...click, click + 1]);
    handleSubmit();
    setOptName('');
    setOptPrice(0);
    setOptDiscount(0);
    setOptQty(0);
  };

  // useEffect(() => {
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
      <h1 style={{ marginBottom: '30px' }}>Create New Product</h1>
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
                  <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                  </Col>

                  <Col>
                    <BrandDropdown
                      brand={brand}
                      setBrand={setBrand}
                      dropdownError={dropdownError}
                    />
                  </Col>

                  <Col>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                  </Col>

                  <Col>
                    <Form.Group as={Col}>
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Enter quantity"
                        value={countInStock}
                        onChange={(e) =>
                          setCountInStock(e.target.value)
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        This field is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row style={{ marginBottom: '1rem' }}>
                  <Col>
                    <CatDropdown
                      categ={categ}
                      setCateg={setCateg}
                      dropdownError={dropdownError}
                    />
                  </Col>

                  <Col>
                    <SubCatDropdown
                      categ={categ}
                      subCateg={subCateg}
                      setSubCateg={setSubCateg}
                      dropdownError={dropdownError}
                    />
                  </Col>

                  <Col>
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

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                This field is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Check
              type="switch"
              id="custom-switch"
              label="ADD TO NEW ARRIVALS"
              style={{ marginTop: '2rem', fontWeight: '600' }}
              onClick={() => {
                setNewArrival(!newArrival);
              }}
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
        {click.map((c, index) => {
          return (
            <div
              style={{
                background: '#F9F9F9',
                padding: '3rem',
                marginBottom: '40px',
              }}
            >
              <div>OPTION {index + 1}</div>
              <NewOptions
                setOptName={setOptName}
                setOptPrice={setOptPrice}
                setOptDiscount={setOptDiscount}
                setOptQty={setOptQty}
                dropdownError={dropdownError}
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
        <i className="fas fa-plus" style={{ marginRight: '15px' }} />
        ADD A NEW OPTION
      </div>
      <Col className="text-right">
        <Button
          style={{ background: '#F05454' }}
          onClick={createProductHandler}
        >
          Create Product
        </Button>
      </Col>
    </div>
  );
};

export default ProductCreateScreen;
