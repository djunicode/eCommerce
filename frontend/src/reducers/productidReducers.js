/* eslint-disable import/prefer-default-export */
import {
  PRODUCTID_CREATE_FAIL,
  PRODUCTID_CREATE_SUCCESS,
  PRODUCTID_CREATE_REQUEST,
  PINCODE_CHECK_FAIL,
  PINCODE_CHECK_REQUEST,
  PINCODE_CHECK_SUCCESS,
} from '../constants/productidConstants';

export const productidReducer = (
  state = { loading: false, data: [], error: '' },
  action,
) => {
  switch (action.type) {
    case PRODUCTID_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCTID_CREATE_SUCCESS:
      console.log(action.payload.getProductById[0]);
      return {
        ...state,
        loading: false,
        data: action.payload.getProductById[0],
      };
    case PRODUCTID_CREATE_FAIL:
      console.log(action.payload);
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const pincodeReducer = (
  state = { pincodeLoading: false, isDeliverable: [], error: '' },
  action,
) => {
  switch (action.type) {
    case PINCODE_CHECK_REQUEST:
      return { ...state, pincodeLoading: true, isDeliverable: [] };
    case PINCODE_CHECK_SUCCESS:
      return {
        ...state,
        pincodeLoading: false,
        isDeliverable: action.payload,
      };
    case PINCODE_CHECK_FAIL:
      return {
        ...state,
        pincodeLoading: false,
        error: action.payload,
        isDeliverable: [],
      };
    default:
      return state;
  }
};
