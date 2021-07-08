/* eslint-disable no-unused-vars */
import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
} from '../constants/orderConstants';
import { logout } from './userActions';

const url = 'http://localhost:5000/graphql';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem('cartItems');
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const userInfo = JSON.parse(
      window.localStorage.getItem('userInfo'),
    );

    console.log(userInfo.token);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      url,
      {
        query: `
      query{
        orderById(orderId: "${id}"){
          _id
          user{
            name
            email
            phoneNo
          }
          orderItems{
            qty
            price
            product{
              _id
              name
              image
            }
          }
          shippingAddress{
            address
            city
            postalCode
            country
          }
          paymentMethod
          paymentResult {
            id
          }
          taxPrice
          shippingPrice
          totalPrice
          isPaid
          paidAt
          isDelivered
          deliveredAt
        }
      }
      `,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );

    console.log(data);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.data.orderById,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config,
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      url,
      {
        query: `
          mutation{
            updateOrderToDelivered(orderId: "${order._id}"){
              isDelivered
            }
          }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data.data.updateOrderToDelivered,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const userinfo = JSON.parse(localStorage.getItem('userInfo'));

    const Data = JSON.stringify({
      query: `query orders {
        orders {
            _id
            user {
                  _id
                  name
                  phoneNo
                  email
                  password
                  isAdmin
                  token
              }
            orderItems {
                qty
                price
            }
            shippingAddress {
                address
                city
                postalCode
                country
            }
            paymentMethod
            paymentResult {
                id
                status
                update_time
                email_address
            }
            taxPrice
            shippingPrice
            totalPrice
            isPaid
            paidAt
            isDelivered
            deliveredAt
        }
    }`,
      variables: {},
    });

    const config = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: {
        Authorization: `Bearer ${userinfo.token}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    const { data } = await axios(config);
    console.log(data.data.orders);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data.data.orders,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};
