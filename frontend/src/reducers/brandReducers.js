import {
    BRAND_LIST_REQUEST,
    BRAND_LIST_SUCCESS,
    BRAND_LIST_FAIL,
    BRAND_CREATE_REQUEST,
    BRAND_CREATE_SUCCESS,
    BRAND_CREATE_FAIL,
} from '../constants/brandConstants';

export const brandListReducer = (
    state = { brands: [] },
    action,
  ) => {
    switch (action.type) {
      case BRAND_LIST_REQUEST:
        return { brands: [] };
      case BRAND_LIST_SUCCESS:
        return {
          brands: action.payload,
        };
      case BRAND_LIST_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  };

export const brandCreateReducer = (
    state = { createBrand: [] },
    action,
  ) => {
    switch (action.type) {
      case BRAND_CREATE_REQUEST:
        return { createBrand: [] };
      case BRAND_CREATE_SUCCESS:
        return {
          createBrand: action.payload,
        };
      case BRAND_CREATE_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  };