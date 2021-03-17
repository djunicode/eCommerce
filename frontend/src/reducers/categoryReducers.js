import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_SUCCESS,
  SUBCATEGORY_LIST_FAIL,
} from '../constants/categoryConstants';

// eslint-disable-next-line import/prefer-default-export
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
