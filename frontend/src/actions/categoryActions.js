/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

import axios from 'axios';
import {
  PRODCUTS_BY_CATEGORY_ID_LIST_FAIL,
  PRODCUTS_BY_CATEGORY_ID_LIST_REQUEST,
  PRODCUTS_BY_CATEGORY_ID_LIST_RESET,
  PRODCUTS_BY_CATEGORY_ID_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_RESET,
  SUBCATEGORY_LIST_FAIL,
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_SUCCESS,
} from '../constants/categoryConstants';

const url = 'http://localhost:5000/graphql';

export const getProductByCategory = (id, sort = 'none') => async (
  dispatch,
) => {
  try {
    dispatch({
      type: PRODCUTS_BY_CATEGORY_ID_LIST_REQUEST,
    });

    const { data } = await axios.post(
      url,
      {
        query: `
            query{
                getProductByCategory(categoryId: "${id}"){
                    _id
                    name
                    discount
                    price
                    discountedPrice
                    user{
                        _id
                    }
                    image
                    brand{
                        _id
                        name
                    }
                    category{
                        _id
                        name
                    }
                    subcategory{
                        _id
                        name
                    }
                    new
                    countInStock
                    numReviews
                    reviews{
                        name
                        rating
                        comment
                        user
                    }
                    description
                    avgRating
                }
            }
        `,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('categoryActions.js');
    // console.log(data);

    let sortedData;
    if (sort === 'asc') {
      sortedData = data.data.getProductByCategory.sort(
        (a, b) => a.price - b.price,
      );
    } else if (sort === 'desc') {
      sortedData = data.data.getProductByCategory.sort(
        (a, b) => b.price - a.price,
      );
    } else {
      sortedData = data.data.getProductByCategory;
    }

    dispatch({
      type: PRODCUTS_BY_CATEGORY_ID_LIST_SUCCESS,
      payload: sortedData,
    });
  } catch (error) {
    dispatch({
      type: PRODCUTS_BY_CATEGORY_ID_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

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

    console.log(query);
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
