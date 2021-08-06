import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_BY_CATEGORY_REQUEST,
  PRODUCT_BY_CATEGORY_SUCCESS,
  PRODUCT_BY_CATEGORY_FAIL,
  PRODUCT_BY_SUBCATEGORY_REQUEST,
  PRODUCT_BY_SUBCATEGORY_SUCCESS,
  PRODUCT_BY_SUBCATEGORY_FAIL,
} from '../constants/productConstants';
import { logout } from './userActions';

export const listProducts = (query) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const userinfo = JSON.parse(localStorage.getItem('userInfo'));

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
      type: PRODUCT_LIST_SUCCESS,
      payload: data.data.getProducts,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    if (error.response.status === 401) {
      dispatch(logout());
    }
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    if (error.response.status === 401) {
      dispatch(logout());
    }
  }
};

export const deleteProduct = (query) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const userinfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    const { data } = await axios.post(
      'http://localhost:5000/graphql',
      { query },
      config,
    );

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data.data.deleteProduct,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    if (error.response.status === 401) {
      dispatch(logout());
    }
  }
};

export const createProduct = (query) => async (dispatch) => {
  console.log('this works');
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const userinfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo.token}`,
      },
    };
    console.log(config);

    const { data } = await axios.post(
      'http://localhost:5000/graphql',
      { query },
      config,
    );

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.data.createProduct,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    if (error.response.status === 401) {
      dispatch(logout());
    }
  }
};

export const updateProduct = (query) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const userinfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    const { data } = await axios.post(
      'http://localhost:5000/graphql',
      { query },
      config,
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data.data.updateProduct,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    if (error.response.status === 401) {
      dispatch(logout());
    }
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
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

      await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        config,
      );

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      if (error.response.status === 401) {
        dispatch(logout());
      }
    }
  };

export const listTopProducts = (query) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

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
      type: PRODUCT_TOP_SUCCESS,
      payload: data.data.getNewProducts,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchProducts = (query) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SEARCH_REQUEST });

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
      type: PRODUCT_SEARCH_SUCCESS,
      payload: data.data.searchProduct,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductByCategory = (query) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_BY_CATEGORY_REQUEST });

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
      type: PRODUCT_BY_CATEGORY_SUCCESS,
      payload: data.data.getProductByCategory,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductBySubCategory =
  (query) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_BY_SUBCATEGORY_REQUEST });

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
        type: PRODUCT_BY_SUBCATEGORY_SUCCESS,
        payload: data.data.getProductBySubCategory,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_BY_SUBCATEGORY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      if (error.response.status === 401) {
        dispatch(logout());
      }
    }
  };
