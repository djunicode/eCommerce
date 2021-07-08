import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,
  updateUserProfile,
} from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { DARK_BLUE_2 ,LIGHT_PEACH, BACKGROUND } from '../util/colors';

const classes = {
  orderItemHeader: {
    borderBottom: "1px solid", 
    borderBottomColor: LIGHT_PEACH,
  },
  heading: {
    display: "inline-block", 
    color: DARK_BLUE_2, 
    fontSize: "1.5rem", 
    textDecoration: "none", 
  },
  price: {
    display: "inline-block", 
    color: "#808080", 
    fontSize: "1.2rem", 
    float: "right", 
    marginTop: "5px",
  },
  productName: {
    display: "inline-block", 
    fontWeight: "600", 
    fontSize: "1.1rem",
  },
  productQuantity: {
    display: "inline-block", 
    float: "right", 
    fontSize: "1.2rem", 
    marginTop: "10px",
  },
  productBrand: {
    color: "#808080", 
    fontSize: "1.01rem",
  },
  userDetails: {
    fontSize: "1.1rem", 
    marginTop: "10px",
  },
  boldify: {
    fontWeight: "550",
  },
  mainHeading: {
    background: BACKGROUND,
    borderBottom: "3px solid", 
    borderBottomColor: LIGHT_PEACH,
    color: DARK_BLUE_2, 
    fontSize: "1.5rem",
  },
  mainHeading2: {
    color: DARK_BLUE_2, 
    fontSize: "1.5rem",
  },
  userDetailsContainer: {
    background: BACKGROUND,
    borderBottom: "3px solid", 
    borderBottomColor: LIGHT_PEACH,
  },
  addresses: {
    background: BACKGROUND, 
    paddingTop: "20px",
  },
  icon: {
    float: "right", 
    marginTop: "5px", 
    cursor: "pointer",
  },
  icon2: {
    marginLeft: "20px",
    float: "right", 
    marginTop: "5px", 
    cursor: "pointer",
  },
  icon3: {
    float: "right", 
    marginTop: "25px", 
    cursor: "pointer",
  },
};

const ProfileScreen = ({ history }) => {
  let dummyUser = {
    name: 'Vidhan Shah',
    phoneNo: '9875432345',
    email: 'abc@abc.com',
    addresses: [
      'guihiohi, djsuhi,s ushushiosjio,ajiji ujoauoijioa', 
      'uigyhgfcxrdfh uy ujhb ukhkhuiy gu hih uy giuhiu to hi u hoy  yho uoo u o jioui iu iu iou oujo'
    ]
  };
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [addresses, setAddresses] = useState([]);
  let dummyOrders = [
    {
      _id: "1234512345",
      toatlPrice: 430,
      orderItems: [
        {name: "Some Chair", qty: 2, product: {brand: {name: "Brand 1"}}},
        {name: "Some Pen", qty: 8, product: {brand: {name: "Brand 2"}}},
        {name: "Some Table", qty: 1, product: {brand: {name: "Brand 3"}}},
      ]
    },
    {
      _id: "68697080",
      toatlPrice: 250,
      orderItems: [
        {name: "Some Pen", qty: 9, product: {brand: {name: "Brand 2"}}},
        {name: "Some Bottle", qty: 1, product: {brand: {name: "Brand 4"}}},
      ]
    },
  ];
  const [myOrders, setMyOrders] = useState([]);
  const [message, setMessage] = useState(null);
  const [isEditing, setEditing] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(
    (state) => state.userUpdateProfile,
  );
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const {
    loading: loadingOrders,
    error: errorOrders,
    // orders,
  } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user || !user.name || success) {
      // dispatch({ type: USER_UPDATE_PROFILE_RESET });
      // dispatch(getUserDetails('profile'));
      // dispatch(listMyOrders());
      setName(dummyUser.name);
      setEmail(dummyUser.email);
      setPhoneNo(dummyUser.phoneNo);
      setAddresses(dummyUser.addresses);
      setMyOrders(dummyOrders);
    } else {
      setName(dummyUser.name);
      setEmail(dummyUser.email);
      setPhoneNo(dummyUser.phoneNo);
      setAddresses(dummyUser.addresses);
      setMyOrders(dummyOrders);
    }
  }, [dispatch, history, userInfo, user, success, isEditing]);

  const handleAddressChange = (index, value) => {
    setAddresses((prev) => {
      prev[index] = value;

      return ([
        ...prev
      ])
    })
  };

  const handleRemoveAddress = (idx) => {
    let newAddresses = addresses.filter((address) => {
      return addresses.indexOf(address) !== idx;
    })
    setAddresses(newAddresses);
  };

  const submitHandler = () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // dispatch(
      //   updateUserProfile({ id: user._id, name, email, password }),
      // );
      setEditing(false);
    }
  };

  return (
    <Row>
      <Col md={{ span: 4, offset: 1 }} xl={{ span: 3, offset: 1 }} style={{marginBottom: "25px"}}>
        <h2>Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {}
        {success && (
          <Message variant="success">Profile Updated</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <ListGroup>
              <ListGroup.Item style={classes.mainHeading}>
                USER DETAILS
                {
                  isEditing ?
                  <>
                    <i className="fas fa-times" style={classes.icon2} onClick={() => setEditing(false)} />
                    <i className="fas fa-check" style={classes.icon} 
                    onClick={() => {
                      submitHandler();
                    }} />
                  </>
                  :
                  <>
                    <i className="fas fa-edit" style={classes.icon} onClick={() => setEditing(true)} />
                  </>
                }
              </ListGroup.Item>
              <ListGroup.Item style={classes.userDetailsContainer}>
                {
                  isEditing ? 
                  <>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Name:</b> <input type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Phone No:</b> <input type="text" placeholder="Enter phone no" onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} />
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Email:</b> <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Password:</b> <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Confirm Password:</b> <input type="password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                  </>
                  :
                  <>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Name:</b> {name}
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Phone No:</b> {phoneNo}
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Email:</b> {email}
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Password:</b> ********
                    </div>
                  </>
                }
                
                <br />
                <div style={classes.mainHeading2}>SAVED ADDRESSES</div>
              </ListGroup.Item>
              <ListGroup.Item style={classes.addresses}>
                {addresses.map((address, index) => 

                  isEditing ?
                  <>
                    <div>
                      <textarea key={index} value={address} onChange={(e) => handleAddressChange(index, e.target.value)} style={{width: "85%", minHeight: "80px"}} />
                      <i className="far fa-minus-square fa-2x" style={classes.icon3} onClick={() => handleRemoveAddress(index)} />
                    </div>
                    
                    {index !== (addresses.length-1) && <hr />}
                  </>
                  :
                  <>
                    <div key={index} style={{fontSize: "1.05rem"}}>
                      {address}
                      {index !== (addresses.length-1) && <hr />}
                    </div>
                  </>

                )}
                {
                  isEditing && 
                  <div style={{marginLeft: "37%", marginTop: "15px"}}>
                    <i className="far fa-plus-square fa-2x" onClick={() => setAddresses([...addresses, `Address ${addresses.length+1}`])} />
                  </div>
                }
              </ListGroup.Item>
            </ListGroup>
          </>
        )}
      </Col>
      <Col md={{ span: 6 }} xl={{ span: 6, offset: 1 }}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <>
            {myOrders.map((myOrder, index) =>
              <div>
                <ListGroup key={index}>
                  <ListGroup.Item style={classes.orderItemHeader}>
                  <Link to={`/order/${myOrder._id}`} style={classes.heading}>
                    <div>ORDER ID: {myOrder._id}</div>
                  </Link>
                  <div style={classes.price}>Rs. {myOrder.toatlPrice}</div>
                  </ListGroup.Item>
                  
                  {myOrder.orderItems.map((orderItem, index) => 
                    <ListGroup.Item key={index}>
                      <div style={classes.productName}>{orderItem.name}</div>
                      <div style={classes.productQuantity}>Qty: {orderItem.qty}</div>
                      <div style={classes.productBrand}>{orderItem.product.brand.name}</div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
                <br/>
              </div>
            )}
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
