import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import ReactImageMagnify from 'react-image-magnify';
import watchImg687 from '../images/wristwatch_687.jpg';
import watchImg1200 from '../images/wristwatch_1200.jpg';
import { getProduct } from '../actions/productidAction';
import { set } from 'mongoose';
import Review from '../components/Review';
import Question from '../components/Question';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [pd, setPd] = useState(true);
  const [rr, setRr] = useState(false);
  const [q, setQ] = useState(false);


  const product = {
    name: 'dhiraj',
  }

  const query = `query{
    getProductById(id: "602d3a5531c2d135d0b5bc03") {
      name,
      price, 
      description,
      discountedPrice,
      category{
        name
      }
      subcategory{
        name
      }
    }
  }`;

  const dispatch = useDispatch();

  const handleTab = (e)=>{
    if(e.target.name === "pd"){
      setPd(true);
      setRr(false);
      setQ(false);
    }
    if(e.target.name === "rr"){
      setRr(true);
      setPd(false);
      setQ(false);
    }
    if(e.target.name === "q"){
      setQ(true);
      setPd(false);
      setRr(false);
    }
  }

  useEffect(()=>{
    dispatch(getProduct(query));
  },[])

  return (
    <>
      <Container fluid style={{backgroundColor:'white', border:'1px solid #D5D5D5', letterSpacing:'0.5px', height:'auto'}}>
        <Row style={{height:"100%"}}>
          <Col lg={6}>
            <div className="img-fluid" style={{zIndex:'1000'}}>
              <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: watchImg687,
                    width: '100%',
                    height: 'auto'
                },
                largeImage: {
                    src: watchImg1200,
                    width: 1200,
                    height: 1800
                },
              }} 
              style={{zIndex:"10000"}}
              />
            </div>
          </Col>
          <div style={{borderLeft: '1px solid #929293', height:'95%', borderRadius: '1px', transform:'translateY(1.8%)'}}></div>
          <Col lg={5} className="fluid_instructions">
            <h1 style={{letterSpacing:'0', textTransform:'none', paddingBottom:'0px'}}>Some Chair</h1>
            <small style={{paddingTop:'0px', color:'#5F5F5F', fontSize:'0.9rem', transform: 'translateY(-1.5%)'}}>Brand Name</small>
            <Rating value={4.5} text="(4.5)"/>
            <div className="mt-3" style={{color:'#222831', fontWeight:'450'}}>
              <span style={{color:'black', fontWeight:'1000', fontSize:'1.4rem', marginBottom:'1000px'}}>Rs 1299</span><br/>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem harum nihil illo nam praesentium, voluptate illum explicabo accusantium doloremque. Minima corrupti culpa, odio maiores beatae pariatur voluptatem dolorem optio necessitatibus.
            </div>
            <Row className="mt-3">
              <Col xs={6}>
                <Row style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Col xs={3}>
                    <span style={{color:'black', fontWeight: '1000', fontSize:'1.1rem'}}>
                      Size: 
                    </span>
                  </Col>
                  <Col xs={9} >
                    <Form.Control
                      as='select'
                      value={4}
                      onChange={(e)=>setQty(e.target.value)}
                      style={{width:'auto', paddingTop:'0px', paddingBottom:'0px', backgroundColor:'#eceeef'}}
                    >
                      <option value={1}>
                        1
                      </option>
                      <option value={2}>
                        2
                      </option>
                      <option value={3}>
                        3
                      </option>
                      <option value={4}>
                        4
                      </option>
                    </Form.Control>
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <Row style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Col xs={3} style={{padding:'0px'}}>
                    <span style={{color:'black', fontWeight: '1000', fontSize:'1.1rem'}}>
                      Qty: 
                    </span>
                  </Col>
                  <Col xs={3} style={{padding:'0px', textAlign:'center'}}>
                    <i className="fas fa-minus-square" style={{fontSize:"2rem", color:"#5EAAA8"}}></i>
                  </Col>
                  <Col xs={3} style={{padding:'0px'}}>
                    <div style={{padding:'0.75rem 1rem', backgroundColor:'#eceeef'}}>
                      20
                    </div>
                  </Col>
                  <Col xs={3} style={{padding:'0px', textAlign:'center'}}>
                    <i className="fas fa-plus-square" style={{fontSize:"2rem", color:"#5EAAA8"}}></i>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-4" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <Col xs={3} style={{paddingRight:'0px'}}>
                <span style={{color:'black', fontWeight: '1000', fontSize:'1.1rem'}}>
                  Colour: 
                </span>
              </Col>
              <Col xs={9} style={{textAlign:'left', paddingLeft:'0px'}}>
                <i className="fas fa-square-full mx-1" style={{fontSize:'2rem'}}></i>
                <i className="fas fa-square-full mx-1" style={{fontSize:'2rem'}}></i>
                <i className="fas fa-square-full mx-1" style={{fontSize:'2rem'}}></i>
                <i className="fas fa-square-full mx-1" style={{fontSize:'2rem'}}></i>
                <i className="fas fa-square-full mx-1" style={{fontSize:'2rem'}}></i>
              </Col>
            </Row>
            <Row className="mt-4" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <Col xs={3}>
                <span style={{color:'black', fontWeight: '1000', fontSize:'1.1rem'}}>
                  Delivery: 
                </span>
              </Col>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter pincode"
                  className="rounded-left"
                  style={{width:'80%', display:'inline', backgroundColor:'#eceeef'}}
                />
                <Button className="rounded-right" style={{width:'20%', padding:'0px', display:'inline', paddingTop:'0.75rem', paddingBottom:'0.75rem', backgroundColor:'#f7f7f9', color:'black'}}>CHECK</Button>
              </Col>
            </Row>
            <Row style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <Col xs={3}>

              </Col>
              <Col xs={9} style={{fontSize:'0.7rem'}}>
                Enter pincode to check whther delivery is available.
              </Col>
            </Row>
            <Row className="mt-3 mb-4" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <Col xs={6} style={{textAlign:'center'}}>
                <Button className="rounded" style={{width:"70%", padding:'6px 12px', backgroundColor:'#F05454', textTransform:'none'}}>Add to Cart</Button>
              </Col>
              <Col xs={6} style={{textAlign:'center'}}>
                <Button className="rounded" style={{width:"70%", padding:'6px 12px', backgroundColor:'#FC7845', textTransform:'none'}}>Buy Now</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="my-5" style={{padding:'0px'}}>
        <Button className="rounded-top" style={{padding:'6px 12px', backgroundColor:'white', textTransform:'none', color:'black'}} name="pd" onClick={(e)=>{handleTab(e)}}>
          Product Details
        </Button>
        <Button className="rounded-top" style={{padding:'6px 12px', backgroundColor:'white', textTransform:'none', color:'black'}} name="rr" onClick={(e)=>{handleTab(e)}}>
          Ratings &amp; Reviews
        </Button>
        <Button className="rounded-top" style={{padding:'6px 12px', backgroundColor:'white', textTransform:'none', color:'black'}} name="q" onClick={(e)=>{handleTab(e)}}>
          Questions
        </Button>
        <Card className="p-4" style={{backgroundColor:'#F9F9F9'}}>
          {pd && 
          (
            <>
              <span style={{color:'#30475E', letterSpacing:'0', fontWeight:"600"}}>
                GENERAL
              </span>
              <Row className="mt-3">
                <Col md={2} xs={5} style={{color:'#5F5F5F'}}>
                  Ideal For
                </Col>
                <Col xs={7} md={10} style={{color:'black'}}>
                  Men and women, boys, girls, unisex
                </Col>
              </Row>
              <Row className="my-1">
                <Col md={2} xs={5} style={{color:'#5F5F5F'}}>
                  Shape
                </Col>
                <Col xs={7} md={10} style={{color:'black'}}>
                  Rectangle
                </Col>
              </Row>
              <Row className="my-1">
                <Col md={2} xs={5} style={{color:'#5F5F5F'}}>
                  Cover Material
                </Col>
                <Col xs={7} md={10} style={{color:'black'}}>
                  No cover
                </Col>
              </Row>
              <Row className="my-1">
                <Col md={2} xs={5} style={{color:'#5F5F5F'}}>
                  Filling Material
                </Col>
                <Col xs={7} md={10} style={{color:'black'}}>
                  EVA
                </Col>
              </Row>
              <Row className="my-1">
                <Col md={2} xs={5} style={{color:'#5F5F5F'}}>
                  Other Features
                </Col>
                <Col xs={7} md={10} style={{color:'black'}}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem harum nihil illo nam praesentium, voluptate illum explicabo accusantium doloremque. Minima corrupti culpa, odio maiores beatae pariatur voluptatem dolorem optio necessitatibus.
                </Col>
              </Row>
              <hr/>
              <span style={{color:'#30475E', letterSpacing:'0', fontWeight:"600"}}>
                DIMENSIONS
              </span>
              <Row className="mt-3">
                <Col md={2} xs={5} style={{color:'#5F5F5F'}}>
                  Width
                </Col>
                <Col xs={7} md={10} style={{color:'black'}}>
                  24 inch
                </Col>
              </Row>
              <Row className="my-1">
                <Col md={2} xs={5} style={{color:'#5F5F5F'}}>
                  Height
                </Col>
                <Col xs={7} md={10} style={{color:'black'}}>
                  72 inch
                </Col>
              </Row>
              <Row className="my-1">
                <Col md={2} xs={5} style={{color:'#5F5F5F'}}>
                  Thickness
                </Col>
                <Col xs={7} md={10} style={{color:'black'}}>
                  6 mm
                </Col>
              </Row>
              <Row className="my-1">
                <Col md={2} xs={5} style={{color:'#5F5F5F'}}>
                  Weight
                </Col>
                <Col xs={7} md={10} style={{color:'black'}}>
                  500 g
                </Col>
              </Row>
            </>
          )
          }
          {
            rr && 
            (
              <>
                <span style={{color:'#30475E'}}><i className="far fa-edit" style={{display:'inline', fontSize:'20px', color:'#30475E'}}/>&nbsp;<span style={{display:'inline'}}>WRITE A REVIEW</span></span>
                <Review/>
              </>
            )
          }
          {
            q &&
            (
              <>
                <span style={{color:'#30475E'}}><i className="far fa-edit" style={{display:'inline', fontSize:'20px', color:'#30475E'}}/>&nbsp;<span style={{display:'inline'}}>ASK A QUESTION</span></span>
                <Question/>
              </>
            )
          }
        </Card>
      </Container>
    </>
  );
};

export default ProductScreen;
