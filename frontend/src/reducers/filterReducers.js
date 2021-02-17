import {
  FILTER_LIST_FAIL,
  FILTER_LIST_REQUEST,
  FILTER_LIST_SUCCESS,
  FILTER_LIST_RESET,
} from '../constants/filterConstants';

export const filterReducer = (state = { filters: {} }, action) => {
  switch (action.type) {
    case FILTER_LIST_REQUEST:
      return { loading: true, filters: {} };
    case FILTER_LIST_SUCCESS:
      return { loading: false, filters: action.payload };
    case FILTER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case FILTER_LIST_RESET:
      return { filters: {} };
    default:
      return state;
  }
};
