import axios from 'axios';
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from '../constants/categoryConstants';

const url = 'http://localhost:5000/graphql';

export const getCategories = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
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
    console.log('categoryActions.js');
    console.log(data);

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data.data.getProductByCategory,
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
