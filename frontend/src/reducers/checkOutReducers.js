import {
  ADDRESS_GET_FAIL,
  ADDRESS_GET_REQUEST,
  ADDRESS_GET_SUCCESS,
  ADDRESS_POST_FAIL,
  ADDRESS_POST_REQUEST,
  ADDRESS_POST_SUCCESS,
} from '../constants/checkOutConstants';

export const getAddressReducer = (
  state = { loading: false, data: [], error: '' },
  action,
) => {
  switch (action.type) {
    case ADDRESS_GET_REQUEST:
      return { ...state, loading: true };
    case ADDRESS_GET_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ADDRESS_GET_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postAddressReducer = (
  state = { loading: false, data: [], error: '' },
  action,
) => {
  switch (action.type) {
    case ADDRESS_POST_REQUEST:
      return { ...state, loading: true };
    case ADDRESS_POST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ADDRESS_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
