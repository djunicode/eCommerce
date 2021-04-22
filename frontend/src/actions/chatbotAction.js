/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  CHATBOT_CREATE_FAIL,
  CHATBOT_CREATE_SUCCESS,
  CHATBOT_CREATE_REQUEST,
  CHATBOT_UPDATE_FAIL,
  CHATBOT_UPDATE_SUCCESS,
  CHATBOT_UPDATE_REQUEST,
} from '../constants/chatbotConstants';

export const getChat = (query) => async (dispatch) => {
  try {
    dispatch({
      type: CHATBOT_CREATE_REQUEST,
    });

    const request = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      data: {
        query,
      },
    };

    const { data } = await axios(request);
    console.log(data.data.questions);

    dispatch({
      type: CHATBOT_CREATE_SUCCESS,
      payload: data.data.questions,
    });
  } catch (error) {
    dispatch({
      type: CHATBOT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateChat = (mutation) => async (dispatch) => {
  try {
    dispatch({
      type: CHATBOT_UPDATE_REQUEST,
    });

    const request = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzIyNjcxNTIxYWVmNjNmOGUxNjhhNiIsImlhdCI6MTYxMzg5OTM3NywiZXhwIjoxNjEzOTAyOTc3fQ.U7b-lHDM41TLBDaDb2MW9c2G8I4HxEWbgK2wi30mVSI',
        'Content-Type': 'application/json',
      },
      data: {
        mutation,
      },
    };

    const { data } = await axios(request);
    console.log(data.data.questions);

    dispatch({
      type: CHATBOT_UPDATE_SUCCESS,
      payload: data.data.questions,
    });
  } catch (error) {
    dispatch({
      type: CHATBOT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
