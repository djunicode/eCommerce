import axios from 'axios';
import {
  REVIEW_GET_FAIL,
  REVIEW_GET_REQUEST,
  REVIEW_GET_SUCCESS,
  REVIEW_POST_FAIL,
  REVIEW_POST_REQUEST,
  REVIEW_POST_SUCCESS,
} from '../constants/reviewConstants';

export const getReviews = (id) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_GET_REQUEST,
    });

    const request = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      data: {
        query: `
          query {
            getProductReviews(productId: "${id}") {
              name,
              rating,
              comment,
            }
          }
        `,
      },
    };

    const response = await axios(request);
    console.log(response.data.data.getProductReviews);

    dispatch({
      type: REVIEW_GET_SUCCESS,
      payload: response.data.data.getProductReviews,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postReview = (info) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_POST_REQUEST,
    });

    const userinfo = JSON.parse(localStorage.getItem('userInfo'));

    const request = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: {
        Authorization: `Bearer ${userinfo.token}`,
        'Content-Type': 'application/json',
      },
      data: {
        query: `
        mutation {
          createProductReview(productId: "${info.productId}", productReview:{
            name: "${info.name}",
            rating: ${info.rating},
            comment: "${info.comment}",
          }) {
            _id
          }
        }
        `,
      },
    };

    console.log(`
    mutation {
      createProductReview(productId: "${info.productId}", productReview:{
        name: "${info.name}",
        rating: ${info.rating},
        comment: "${info.comment}",
      }) {
        _id
      }
    }
    `);

    const response = await axios(request);
    console.log(response.data);

    dispatch({
      type: REVIEW_POST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
