import axios from 'axios';
import {
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_SUCCESS,
  BRAND_CREATE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_EDIT_REQUEST,
  BRAND_EDIT_SUCCESS,
  BRAND_EDIT_FAIL,
} from '../constants/brandConstants';

const userinfo = JSON.parse(localStorage.getItem('userInfo'));
console.log(userinfo);

export const listBrands = (query) => async (dispatch) => {
  try {
    dispatch({ type: BRAND_LIST_REQUEST });

    const request = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      data: {
        query,
      },
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios(request);

    dispatch({
      type: BRAND_LIST_SUCCESS,
      payload: data.data.getBrands,
    });
  } catch (error) {
    dispatch({
      type: BRAND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNewBrand = (query) => async (dispatch) => {
  try {
    dispatch({ type: BRAND_CREATE_REQUEST });

    const request = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      data: {
        query,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    const { data } = await axios(request);

    dispatch({
      type: BRAND_CREATE_SUCCESS,
      payload: data.data.createBrand,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout());
    // }
    console.log(message);
    dispatch({
      type: BRAND_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteBrands = (query) => async (dispatch) => {
  try {
    dispatch({ type: BRAND_DELETE_REQUEST });

    const request = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      data: {
        query,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    const { data } = await axios(request);

    dispatch({
      type: BRAND_DELETE_SUCCESS,
      payload: data.data.deleteBrand,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout());
    // }
    console.log(message);
    dispatch({
      type: BRAND_DELETE_FAIL,
      payload: message,
    });
  }
};

export const editBrands = (query) => async (dispatch) => {
  try {
    dispatch({ type: BRAND_EDIT_REQUEST });

    const request = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      data: {
        query,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    const { data } = await axios(request);

    dispatch({
      type: BRAND_EDIT_SUCCESS,
      payload: data.data.updateBrand,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout());
    // }
    console.log(message);
    dispatch({
      type: BRAND_EDIT_FAIL,
      payload: message,
    });
  }
};
