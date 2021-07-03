import {
  CART_ADD_SUCCESS,
  CART_ADD_REQUEST,
  CART_ADD_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from '../constants/cartConstants';

export const cartAddReducer = (
  state = { cartLoading: false, cartData: {}, error: false },
  action,
) => {
  switch (action.type) {
    case CART_ADD_REQUEST:
      return { ...state, cartLoading: true, error: false };
    case CART_ADD_SUCCESS:
      return {
        ...state,
        cartLoading: false,
        error: false,
        cartData: action.payload,
      };
    case CART_ADD_FAIL:
      return { ...state, cartLoading: false, error: action.payload };
    default:
      return { ...state };
  }
};

const cartReducer = (
  state = { loading: false, data: [], error: false },
  action,
) => {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { cartItems: [] };
    case CART_LIST_SUCCESS:
      return {
        cartItems: action.payload,
      };
    case CART_LIST_FAIL:
      return { error: action.payload };

    // case CART_ADD_ITEM:
    //   const item = action.payload;

    //   const existItem = state.cartItems.find(
    //     (x) => x.product === item.product,
    //   );

    //   if (existItem) {
    //     return {
    //       ...state,
    //       cartItems: state.cartItems.map((x) =>
    //         x.product === existItem.product ? item : x,
    //       ),
    //     };
    //   }
    //   return {
    //     ...state,
    //     cartItems: [...state.cartItems, item],
    //   };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product !== action.payload,
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_ITEMS:
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
