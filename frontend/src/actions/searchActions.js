/* eslint-disable import/prefer-default-export */
/* eslint no-shadow: "error" */
import axios from 'axios';
import {
  SEARCH_LIST_FAIL,
  SEARCH_LIST_REQUEST,
  SEARCH_LIST_SUCCESS,
} from '../constants/searchConstants';

const url = 'http://localhost:5000/graphql';

export const search = (searchTerm) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_LIST_REQUEST,
    });

    const { data } = await axios.post(
      url,
      {
        query: `
                query {
                    searchProduct(searchTerm: "${searchTerm}"){
                        _id
                        name
                        discount
                        price
                        image
                        brand {
                            _id
                            name
                        }
                        category {
                            _id
                            name
                        }
                        countInStock
                        numReviews
                        description
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
    console.log('searchActions.js');
    console.log(data);

    dispatch({
      type: SEARCH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
