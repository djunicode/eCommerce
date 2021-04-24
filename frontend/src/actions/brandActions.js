import axios from 'axios';
import {
    BRAND_LIST_REQUEST,
    BRAND_LIST_SUCCESS,
    BRAND_LIST_FAIL,
    BRAND_CREATE_REQUEST,
    BRAND_CREATE_SUCCESS,
    BRAND_CREATE_FAIL,
} from '../constants/brandConstants';

export const listBrands = (query) => async (dispatch) => {
    try {
      dispatch({ type: BRAND_LIST_REQUEST });
  
      const request = {
        method: 'post',
        url: 'http://localhost:5000/graphql',
        data: {
          query,
        },
        headers: { 'Content-Type': 'application/json' },
      };
  
      const { data } = await axios(request);
  
      dispatch({
        type: BRAND_LIST_SUCCESS,
        payload: data.data.getBrands,
      });
    } catch (error) {
      dispatch({
        type: BRAND_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createNewBrand = (query) => async (dispatch) => {
    try {
      dispatch({ type: BRAND_CREATE_REQUEST });
  
      const request = {
        method: 'post',
        url: 'http://localhost:5000/graphql',
        data: {
          query,
        },
        headers: { 'Content-Type': 'application/json' },
      };
  
      const { data } = await axios(request);
  
      dispatch({
        type: BRAND_CREATE_SUCCESS,
        payload: data.data.createBrand,
      });
    } catch (error) {
      dispatch({
        type: BRAND_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };