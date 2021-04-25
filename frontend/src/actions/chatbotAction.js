/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { useHistory } from 'react-router-dom';
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

    const Data = JSON.stringify({
      query: `mutation {
      editQuestions(details: [${mutation}]) {
        msg
      }
    }`,
      variables: {},
    });

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

    dispatch({
      type: CHATBOT_UPDATE_SUCCESS,
      payload: data.data.editQuestions.msg,
    });
  } catch (error) {
    dispatch({
      type: CHATBOT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    if (error.response.status === 401) {
      const history = useHistory();
      history.push('/login');
    }
  }
};
