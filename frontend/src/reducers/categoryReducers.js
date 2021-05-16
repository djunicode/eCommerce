import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_SUCCESS,
  SUBCATEGORY_LIST_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  SUBCATEGORY_CREATE_REQUEST,
  SUBCATEGORY_CREATE_SUCCESS,
  SUBCATEGORY_CREATE_FAIL,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_EDIT_FAIL,
  SUBCATEGORY_EDIT_REQUEST,
  SUBCATEGORY_EDIT_SUCCESS,
  SUBCATEGORY_EDIT_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  SUBCATEGORY_DELETE_REQUEST,
  SUBCATEGORY_DELETE_SUCCESS,
  SUBCATEGORY_DELETE_FAIL,
  PRODCUTS_BY_CATEGORY_ID_LIST_FAIL,
  PRODCUTS_BY_CATEGORY_ID_LIST_REQUEST,
  PRODCUTS_BY_CATEGORY_ID_LIST_RESET,
  PRODCUTS_BY_CATEGORY_ID_LIST_SUCCESS,
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

export const categoryEditReducer = (
  state = { editCategory: [] },
  action,
) => {
  switch (action.type) {
    case CATEGORY_EDIT_REQUEST:
      return { editCategory: [] };
    case CATEGORY_EDIT_SUCCESS:
      return {
        editCategory: action.payload,
      };
    case CATEGORY_EDIT_FAIL:
      return { error: action.payload };
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

export const subCategoryEditReducer = (
  state = { editSubcategory: [] },
  action,
) => {
  switch (action.type) {
    case SUBCATEGORY_EDIT_REQUEST:
      return { editSubcategory: [] };
    case SUBCATEGORY_EDIT_SUCCESS:
      return {
        editSubcategory: action.payload,
      };
    case SUBCATEGORY_EDIT_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const categoryDeleteReducer = (
  state = { deleteCategory: [] },
  action,
) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { deleteCategory: [] };
    case CATEGORY_DELETE_SUCCESS:
      return {
        deleteCategory: action.payload,
      };
    case CATEGORY_DELETE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const subCategoryDeleteReducer = (
  state = { deleteSubcategory: [] },
  action,
) => {
  switch (action.type) {
    case SUBCATEGORY_DELETE_REQUEST:
      return { deleteSubcategory: [] };
    case SUBCATEGORY_DELETE_SUCCESS:
      return {
        deleteSubcategory: action.payload,
      };
    case SUBCATEGORY_DELETE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const categoryCreateReducer = (
  state = { createCategory: [] },
  action,
) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { createCategory: [] };
    case CATEGORY_CREATE_SUCCESS:
      return {
        createCategory: action.payload,
      };
    case CATEGORY_CREATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const subCategoryCreateReducer = (
  state = { createSubcategory: [] },
  action,
) => {
  switch (action.type) {
    case SUBCATEGORY_CREATE_REQUEST:
      return { createSubcategory: [] };
    case SUBCATEGORY_CREATE_SUCCESS:
      return {
        createSubcategory: action.payload,
      };
    case SUBCATEGORY_CREATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

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
