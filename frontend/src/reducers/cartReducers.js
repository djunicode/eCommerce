import {
  CART_ADD_SUCCESS,
  CART_ADD_REQUEST,
  CART_ADD_FAIL,
} from '../constants/cartConstants';

const cartReducer = (
  state = { loading: false, data: [], error: false },
  action,
) => {
  switch (action.type) {
    case CART_ADD_REQUEST:
      return { ...state, loading: true, error: false };
    case CART_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case CART_ADD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

export default cartReducer;
