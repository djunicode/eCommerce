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

    const userinfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(mutation);

    const Data = JSON.stringify({
      query: `mutation {
      editQuestions(details: [${mutation}]) {
        msg
      }
    }`,
      variables: {},
    });
    console.log(Data);

    const config = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: {
        Authorization: `Bearer ${userinfo.token}`,
        'Content-Type': 'application/json',
      },
      data: Data,
    };

    const { data } = await axios(config);
    console.log(data.editQuestions.msg);

    dispatch({
      type: CHATBOT_UPDATE_SUCCESS,
      payload: data,
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
