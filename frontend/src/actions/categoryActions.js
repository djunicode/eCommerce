import axios from 'axios';
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_SUCCESS,
  SUBCATEGORY_LIST_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  SUBCATEGORY_CREATE_REQUEST,
  SUBCATEGORY_CREATE_SUCCESS,
  SUBCATEGORY_CREATE_FAIL,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_EDIT_FAIL,
  SUBCATEGORY_EDIT_REQUEST,
  SUBCATEGORY_EDIT_SUCCESS,
  SUBCATEGORY_EDIT_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  SUBCATEGORY_DELETE_REQUEST,
  SUBCATEGORY_DELETE_SUCCESS,
  SUBCATEGORY_DELETE_FAIL,
} from '../constants/categoryConstants';

// eslint-disable-next-line import/prefer-default-export
export const listCategories = (query) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

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
      type: CATEGORY_LIST_SUCCESS,
      payload: data.data.getCategories,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSubCategories = (query) => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_LIST_REQUEST });

    const request = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      data: {
        query,
      },
      headers: { 'Content-Type': 'application/json' },
    };

    // console.log(query);
    const { data } = await axios(request);

    dispatch({
      type: SUBCATEGORY_LIST_SUCCESS,
      payload: data.data.getSubCategories,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategories = (query) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST });

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
      type: CATEGORY_CREATE_SUCCESS,
      payload: data.data.createCategory,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSubCategories = (query) => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_CREATE_REQUEST });

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
      type: SUBCATEGORY_CREATE_SUCCESS,
      payload: data.data.createSubCategory,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editCategories = (query) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_EDIT_REQUEST });

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
      type: CATEGORY_EDIT_SUCCESS,
      payload: data.data.updateCategory,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editSubCategories = (query) => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_EDIT_REQUEST });

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
      type: SUBCATEGORY_EDIT_SUCCESS,
      payload: data.data.updateSubCategory,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategories = (query) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });

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
      type: CATEGORY_DELETE_SUCCESS,
      payload: data.data.deleteCategory,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubCategories = (query) => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_DELETE_REQUEST });

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
      type: SUBCATEGORY_DELETE_SUCCESS,
      payload: data.data.deleteSubCategory,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};