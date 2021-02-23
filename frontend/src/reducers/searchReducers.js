import {
  SEARCH_LIST_FAIL,
  SEARCH_LIST_REQUEST,
  SEARCH_LIST_SUCCESS,
  SEARCH_LIST_RESET,
} from '../constants/searchConstants';

export const searchReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case SEARCH_LIST_REQUEST:
      return { loading: true, products: [] };
    case SEARCH_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case SEARCH_LIST_FAIL:
      return { loading: false, error: action.payload };
    case SEARCH_LIST_RESET:
      return { products: [] };
    default:
      return state;
  }
};
