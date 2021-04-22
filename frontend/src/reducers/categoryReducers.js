/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

import {
  PRODCUTS_BY_CATEGORY_ID_LIST_FAIL,
  PRODCUTS_BY_CATEGORY_ID_LIST_REQUEST,
  PRODCUTS_BY_CATEGORY_ID_LIST_RESET,
  PRODCUTS_BY_CATEGORY_ID_LIST_SUCCESS,
  CATEGORY_LIST_RESET,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_SUCCESS,
  SUBCATEGORY_LIST_FAIL,
} from '../constants/categoryConstants';

export const productsByCategoryIdReducer = (
  state = { products: [] },
  action,
) => {
  switch (action.type) {
    case PRODCUTS_BY_CATEGORY_ID_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODCUTS_BY_CATEGORY_ID_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODCUTS_BY_CATEGORY_ID_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODCUTS_BY_CATEGORY_ID_LIST_RESET:
      return { products: [] };
    default:
      return state;
  }
};

export const categoryListReducer = (
  state = { categories: [] },
  action,
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subCategoryListReducer = (
  state = { subcategories: [] },
  action,
) => {
  switch (action.type) {
    case SUBCATEGORY_LIST_REQUEST:
      return { subcategories: [] };
    case SUBCATEGORY_LIST_SUCCESS:
      return {
        subcategories: action.payload,
      };
    case SUBCATEGORY_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
