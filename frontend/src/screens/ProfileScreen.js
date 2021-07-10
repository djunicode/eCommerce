import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,
  updateUserProfile,
} from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { DARK_BLUE_2, LIGHT_PEACH, BACKGROUND } from '../util/colors';

const classes = {
  orderItemHeader: {
    borderBottom: '1px solid',
    borderBottomColor: LIGHT_PEACH,
    maxWidth: '100%',
    overflow: 'hidden',
  },
  heading: {
    display: 'inline-block',
    color: DARK_BLUE_2,
    fontSize: '1.5rem',
    textDecoration: 'none',
  },
  price: {
    display: 'inline-block',
    color: '#808080',
    fontSize: '1.2rem',
    float: 'right',
    marginTop: '5px',
  },
  productName: {
    display: 'inline-block',
    fontWeight: '600',
    fontSize: '1.1rem',
  },
  productQuantity: {
    display: 'inline-block',
    float: 'right',
    fontSize: '1.2rem',
    marginTop: '10px',
  },
  productBrand: {
    color: '#808080',
    fontSize: '1.01rem',
  },
  userDetails: {
    fontSize: '1.1rem',
    marginTop: '10px',
  },
  boldify: {
    fontWeight: '550',
  },
  mainHeading: {
    background: BACKGROUND,
    borderBottom: '3px solid',
    borderBottomColor: LIGHT_PEACH,
    color: DARK_BLUE_2,
    fontSize: '1.5rem',
  },
  mainHeading2: {
    color: DARK_BLUE_2,
    fontSize: '1.5rem',
  },
  userDetailsContainer: {
    background: BACKGROUND,
    borderBottom: '3px solid',
    borderBottomColor: LIGHT_PEACH,
  },
  addresses: {
    background: BACKGROUND,
    paddingTop: '20px',
  },
  icon: {
    float: 'right',
    marginTop: '5px',
    cursor: 'pointer',
  },
  icon2: {
    marginLeft: '20px',
    float: 'right',
    marginTop: '5px',
    cursor: 'pointer',
  },
  icon3: {
    float: 'right',
    marginTop: '-100px',
    cursor: 'pointer',
  },
  textbox: {
    display: 'inline-block',
    width: '100%',
    marginTop: '7px',
  },
};

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [addresses, setAddresses] = useState([]);

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
    orders,
  } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails());
      dispatch(listMyOrders());
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhoneNo(user.phoneNo);
      setAddresses(user.userAddress);
      if (orders) {
        setMyOrders(orders);
      } else {
        setMyOrders([]); // Empty orders is saved as None
      }
    }
  }, [dispatch, history, userInfo, user, success, isEditing, orders]);

  const handleAddressChange = (index, value, type) => {
    setAddresses((prev) => {
      const newAd = { ...prev[index] };

      switch (type) {
        case 'address':
          newAd.address = value;
          break;
        case 'city':
          newAd.city = value;
          break;
        case 'code':
          newAd.postalCode = value;
          break;
        case 'country':
          newAd.country = value;
          break;
        default:
          break;
      }

      const tprev = prev;
      tprev[index] = newAd;

      return [...tprev];
    });
  };

  const handleRemoveAddress = (idx) => {
    const newAddresses = addresses.filter((address) => {
      return addresses.indexOf(address) !== idx;
    });
    setAddresses(newAddresses);
  };

  const submitHandler = () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      const userAddressInput = addresses.map((ad) => {
        return `{address:"${ad.address}",city:"${ad.city}",country:"${ad.country}",postalCode:"${ad.postalCode}"}`;
      });
      dispatch(
        updateUserProfile({
          name,
          email,
          phoneNo,
          password,
          userAddressInput,
        }),
      );
      setEditing(false);
      setMessage('');
    }
  };

  return (
    <Row>
      <Col
        md={{ span: 4, offset: 1 }}
        xl={{ span: 3, offset: 1 }}
        style={{ marginBottom: '25px' }}
      >
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
                {isEditing ? (
                  <div style={{ float: 'right' }}>
                    <i
                      className="fas fa-check"
                      style={{
                        marginLeft: '10px',
                        marginRight: '15px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        submitHandler();
                      }}
                      onKeyDown={() => {}}
                      role="textbox"
                      tabIndex={0}
                    />
                    <i
                      className="fas fa-times"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setEditing(false)}
                      onKeyDown={() => {}}
                      role="textbox"
                      tabIndex={0}
                    />
                  </div>
                ) : (
                  <>
                    <i
                      className="fas fa-edit"
                      style={classes.icon}
                      onClick={() => setEditing(true)}
                      onKeyDown={() => {}}
                      role="textbox"
                      tabIndex={0}
                    />
                  </>
                )}
              </ListGroup.Item>
              <ListGroup.Item style={classes.userDetailsContainer}>
                {isEditing ? (
                  <>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Name:</b>{' '}
                      <input
                        type="text"
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Phone No:</b>{' '}
                      <input
                        type="text"
                        placeholder="Enter phone no"
                        onChange={(e) => setPhoneNo(e.target.value)}
                        value={phoneNo}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Email:</b>{' '}
                      <input
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Password:</b>{' '}
                      <input
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Confirm Password:</b>{' '}
                      <input
                        type="password"
                        placeholder="Confirm password"
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        style={{ width: '100%' }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Name:</b> {name}
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Phone No:</b>{' '}
                      {phoneNo}
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Email:</b> {email}
                    </div>
                    <div style={classes.userDetails}>
                      <b style={classes.boldify}>Password:</b>{' '}
                      ********
                    </div>
                  </>
                )}

                <br />
                <div style={classes.mainHeading2}>
                  SAVED ADDRESSES
                </div>
              </ListGroup.Item>
              <ListGroup.Item style={classes.addresses}>
                {addresses.map((address, index) =>
                  isEditing ? (
                    <div key={addresses.indexOf(address)}>
                      <div>
                        <div
                          style={{ width: '85%', fontSize: '1.1rem' }}
                        >
                          <textarea
                            placeholder="Enter address"
                            value={address.address}
                            onChange={(e) =>
                              handleAddressChange(
                                index,
                                e.target.value,
                                'address',
                              )
                            }
                            style={{
                              display: 'inline-block',
                              width: '100%',
                              minHeight: '80px',
                            }}
                          />
                          <input
                            type="text"
                            style={classes.textbox}
                            placeholder="Enter City"
                            value={address.city}
                            onChange={(e) =>
                              handleAddressChange(
                                index,
                                e.target.value,
                                'city',
                              )
                            }
                          />
                          <input
                            type="text"
                            style={classes.textbox}
                            placeholder="Enter Postal Code"
                            value={address.postalCode}
                            onChange={(e) =>
                              handleAddressChange(
                                index,
                                e.target.value,
                                'code',
                              )
                            }
                          />
                          <input
                            type="text"
                            style={classes.textbox}
                            placeholder="Enter Country"
                            value={address.country}
                            onChange={(e) =>
                              handleAddressChange(
                                index,
                                e.target.value,
                                'country',
                              )
                            }
                          />
                        </div>
                        <i
                          className="far fa-minus-square fa-2x"
                          style={classes.icon3}
                          onClick={() => handleRemoveAddress(index)}
                          onKeyDown={() => {}}
                          role="textbox"
                          tabIndex={0}
                        />
                      </div>

                      {index !== addresses.length - 1 && <hr />}
                    </div>
                  ) : (
                    <div
                      key={addresses.indexOf(address)}
                      style={{ fontSize: '1.05rem' }}
                    >
                      {address &&
                        `${address.address && address.address}, ${
                          address.city && address.city
                        }, ${
                          address.postalCode && address.postalCode
                        }, ${address.country && address.country}`}
                      {index !== addresses.length - 1 && <hr />}
                    </div>
                  ),
                )}
                {isEditing && (
                  <div
                    style={{ marginLeft: '37%', marginTop: '15px' }}
                  >
                    <i
                      className="far fa-plus-square fa-2x"
                      onClick={() =>
                        setAddresses([
                          ...addresses,
                          {
                            address: `Address ${
                              addresses.length + 1
                            }`,
                            city: '',
                            country: '',
                            postalCode: '',
                          },
                        ])
                      }
                      onKeyDown={() => {}}
                      role="textbox"
                      tabIndex={0}
                    />
                  </div>
                )}
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
            {myOrders.map((myOrder) => (
              <div key={myOrder._id}>
                <ListGroup style={{ maxWidth: '100%' }}>
                  <ListGroup.Item style={classes.orderItemHeader}>
                    <Link
                      to={`/order/${myOrder._id}`}
                      style={classes.heading}
                    >
                      <div style={{ maxWidth: '100%' }}>
                        ORDER ID: {myOrder._id}
                      </div>
                    </Link>
                    <div style={classes.price}>
                      Rs. {myOrder.totalPrice}
                    </div>
                  </ListGroup.Item>

                  {myOrder.orderItems.map((orderItem) => (
                    <ListGroup.Item key={orderItem.product._id}>
                      <div style={classes.productName}>
                        {orderItem.product.name}
                      </div>
                      <div style={classes.productQuantity}>
                        Qty: {orderItem.qty}
                      </div>
                      <div style={classes.productBrand}>
                        Rs. {orderItem.price}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <br />
              </div>
            ))}
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
