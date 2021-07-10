import axios from 'axios';
import {
  ADDRESS_POST_FAIL,
  ADDRESS_POST_REQUEST,
  ADDRESS_POST_SUCCESS,
} from '../constants/checkOutConstants';

const addAddress = (address) => async (dispatch) => {
  try {
    dispatch({
      type: ADDRESS_POST_REQUEST,
    });

    const userinfo = JSON.parse(localStorage.getItem('userInfo'));

    const data = JSON.stringify({
      query: `mutation {
        addUserAddress(userAddressInput: {
          address:"${address.address}",
          city: "${address.city}",
          postalCode: "${address.postalCode}",
          country: "India",
        }) {
          userAddress {
            _id,
            address,
            city,
            postalCode,
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
    console.log(error);
    dispatch({
      type: ADDRESS_POST_FAIL,
      payload: error,
    });
  }
};

export default addAddress;
