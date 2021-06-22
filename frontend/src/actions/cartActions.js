import axios from 'axios';
import {
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_FAIL,
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
} from '../constants/cartConstants';

export const addToCart = (info) => async (dispatch) => {
  try {
    dispatch({
      type: CART_ADD_REQUEST,
    });
    console.log(info);

    const userinfo = JSON.parse(localStorage.getItem('userInfo'));

    const Data = {
      query: `mutation {
        updateCart(contents: [${info}]) {
          msg
        }
      }`,
    };

    const request = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: {
        Authorization: `Bearer ${userinfo.token}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    const response = await axios(request);
    console.log(response);

    dispatch({
      type: CART_ADD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CART_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cart.cartItems),
  );
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
