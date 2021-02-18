/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  CHATBOT_CREATE_FAIL,
  CHATBOT_CREATE_SUCCESS,
  CHATBOT_CREATE_REQUEST,
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
      payload: error,
    });
  }
};
