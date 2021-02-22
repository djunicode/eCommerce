import {
  PRODUCTID_CREATE_FAIL,
  PRODUCTID_CREATE_SUCCESS,
  PRODUCTID_CREATE_REQUEST,
} from '../constants/productidConstants';

export const productidReducer = (
  state = { loading: false, data: [], error: '' },
  action,
) => {
  switch (action.type) {
    case PRODUCTID_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCTID_CREATE_SUCCESS:
      console.log(action.payload);
      return { ...state, loading: false, data: action.payload };
    case PRODUCTID_CREATE_FAIL:
      console.log(action.payload);
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}