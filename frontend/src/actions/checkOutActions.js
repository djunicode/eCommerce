import axios from 'axios';
import {
  ADDRESS_POST_FAIL,
  ADDRESS_POST_REQUEST,
  ADDRESS_POST_SUCCESS,
} from '../constants/checkOutConstants';
import { logout } from './userActions';

const addAddress = (address) => async (dispatch) => {
  try {
    dispatch({
      type: ADDRESS_POST_REQUEST,
    });

    const userinfo = JSON.parse(localStorage.getItem('userInfo'));

    const data = JSON.stringify({
      query: `mutation{
        updateUserProfile(userInput: {
          phoneNo: "9820560183",
          userAddress: [${address}]
        }) {
          name,
          userAddress {
              country
          }
        }
      }`,
    });

    const config = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: {
        Authorization: `Bearer ${userinfo.token}`,
        'Content-Type': 'application/json',
      },
      data,
    };

    const response = await axios(config);
    console.log(response.data);

    dispatch({
      type: ADDRESS_POST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ADDRESS_POST_FAIL,
      payload: message,
    });
  }
};

export default addAddress;
