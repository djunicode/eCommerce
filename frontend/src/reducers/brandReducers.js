import {
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_SUCCESS,
  BRAND_CREATE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_EDIT_REQUEST,
  BRAND_EDIT_SUCCESS,
  BRAND_EDIT_FAIL,
} from '../constants/brandConstants';

export const brandListReducer = (state = { brands: [] }, action) => {
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

export const brandDeleteReducer = (
  state = { deleteBrand: [] },
  action,
) => {
  switch (action.type) {
    case BRAND_DELETE_REQUEST:
      return { deleteBrand: [] };
    case BRAND_DELETE_SUCCESS:
      return {
        deleteBrand: action.payload,
      };
    case BRAND_DELETE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const brandEditReducer = (
  state = { editBrand: [] },
  action,
) => {
  switch (action.type) {
    case BRAND_EDIT_REQUEST:
      return { editBrand: [] };
    case BRAND_EDIT_SUCCESS:
      return {
        editBrand: action.payload,
      };
    case BRAND_EDIT_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
