import {
  FILTER_LIST_FAIL,
  FILTER_LIST_REQUEST,
  FILTER_LIST_SUCCESS,
  FILTER_LIST_RESET,
} from '../constants/filterConstants';

export const filter = (filters) => (dispatch) => {
  try {
    dispatch({
      type: FILTER_LIST_REQUEST,
    });
    // console.log(filters);

    dispatch({
      type: FILTER_LIST_RESET,
    });

    dispatch({
      type: FILTER_LIST_SUCCESS,
      payload: filters,
    });
  } catch (error) {
    dispatch({
      type: FILTER_LIST_FAIL,
      payload: error,
    });
  }
};
