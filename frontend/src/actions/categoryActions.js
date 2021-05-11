import axios from 'axios';
import {
  PRODCUTS_BY_CATEGORY_ID_LIST_FAIL,
  PRODCUTS_BY_CATEGORY_ID_LIST_REQUEST,
  PRODCUTS_BY_CATEGORY_ID_LIST_RESET,
  PRODCUTS_BY_CATEGORY_ID_LIST_SUCCESS,
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


const userinfo = JSON.parse(localStorage.getItem('userInfo'));
console.log(userinfo);

const url = 'http://localhost:5000/graphql';

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

// export const createCategories = (query) => async (dispatch) => {
//   try {
//     dispatch({ type: CATEGORY_CREATE_REQUEST });

//     const request = {
//       method: 'post',
//       url: 'http://localhost:5000/graphql',
//       data: {
//         query,
//       },
//       headers: { 'Content-Type': 'application/json' },
//     };

//     const { data } = await axios(request);

//     dispatch({
//       type: CATEGORY_CREATE_SUCCESS,
//       payload: data.data.createCategory,
//     });
//   } catch (error) {
//     dispatch({
//       type: CATEGORY_CREATE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const createCategories = (query) => async (
  dispatch
) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userinfo.token}`,
      },
    };
    console.log(config);

    const { data } = await axios.post('http://localhost:5000/graphql', {query}, config);

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data.data.createCategory,
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
      type: CATEGORY_CREATE_FAIL,
      payload: message,
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
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userinfo.token}`, },
    };

    const { data } = await axios(request);

    dispatch({
      type: SUBCATEGORY_CREATE_SUCCESS,
      payload: data.data.createSubCategory,
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
      type: SUBCATEGORY_CREATE_FAIL,
      payload: message,
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
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userinfo.token}`, },
    };

    const { data } = await axios(request);

    dispatch({
      type: CATEGORY_EDIT_SUCCESS,
      payload: data.data.updateCategory,
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
      type: CATEGORY_EDIT_FAIL,
      payload: message,
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
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userinfo.token}`, },
    };

    const { data } = await axios(request);

    dispatch({
      type: SUBCATEGORY_EDIT_SUCCESS,
      payload: data.data.updateSubCategory,
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
      type: SUBCATEGORY_EDIT_FAIL,
      payload: message,
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
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userinfo.token}`, },
    };

    const { data } = await axios(request);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: data.data.deleteCategory,
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
      type: CATEGORY_DELETE_FAIL,
      payload: message,
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
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userinfo.token}`, },
    };

    const { data } = await axios(request);

    dispatch({
      type: SUBCATEGORY_DELETE_SUCCESS,
      payload: data.data.deleteSubCategory,
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
      type: SUBCATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};

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

    try {
      const brands = sortedData.map((elem) => elem.brand.name);
      sessionStorage.setItem(
        'proshop_brand_length',
        JSON.stringify([...new Set(brands)].length),
      );
    } catch (err) {}

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