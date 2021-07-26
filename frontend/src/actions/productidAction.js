/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  PRODUCTID_CREATE_FAIL,
  PRODUCTID_CREATE_SUCCESS,
  PRODUCTID_CREATE_REQUEST,
  PINCODE_CHECK_FAIL,
  PINCODE_CHECK_REQUEST,
  PINCODE_CHECK_SUCCESS,
} from '../constants/productidConstants';

export const getProduct = (query) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCTID_CREATE_REQUEST,
    });

    const request = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      data: {
        query,
      },
    };

    const { data } = await axios(request);
    console.log(data);

    dispatch({
      type: PRODUCTID_CREATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTID_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postPincode = (info) => async (dispatch) => {
  try {
    dispatch({
      type: PINCODE_CHECK_REQUEST,
    });

    const data = JSON.stringify({
      query: `query{
        isDeliverable(postalCode: "${info}")
      }`,
    });

    const config = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    const response = await axios(config);
    console.log(response.data);

    dispatch({
      type: PINCODE_CHECK_SUCCESS,
      payload: response.data.data.isDeliverable,
    });
  } catch (error) {
    dispatch({
      type: PINCODE_CHECK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
