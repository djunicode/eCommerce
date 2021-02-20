import {
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_RESET,
  } from '../constants/categoryConstants';
  
  export const categoryReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST:
        return { loading: true, products: [] };
      case CATEGORY_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_LIST_RESET:
        return { products: [] };
      default:
        return state;
    }
  };  