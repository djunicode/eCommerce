/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  PRODUCTID_CREATE_FAIL,
  PRODUCTID_CREATE_SUCCESS,
  PRODUCTID_CREATE_REQUEST,
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
