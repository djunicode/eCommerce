/* eslint-disable import/prefer-default-export */
import {
  CHATBOT_CREATE_FAIL,
  CHATBOT_CREATE_SUCCESS,
  CHATBOT_CREATE_REQUEST,
  CHATBOT_UPDATE_FAIL,
  CHATBOT_UPDATE_SUCCESS,
  CHATBOT_UPDATE_REQUEST,
} from '../constants/chatbotConstants';

export const chatbotReducer = (
  state = { loading: false, data: [], error: '' },
  action,
) => {
  switch (action.type) {
    case CHATBOT_CREATE_REQUEST:
      return { ...state, loading: true };
    case CHATBOT_CREATE_SUCCESS:
      console.log(action.payload);
      return { ...state, loading: false, data: action.payload };
    case CHATBOT_CREATE_FAIL:
      console.log(action.payload);
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateChatbot = (
  state = { loading: false, data: [], error: '' },
  action,
) => {
  switch (action.type) {
    case CHATBOT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case CHATBOT_UPDATE_SUCCESS:
      console.log(action.payload);
      return { ...state, loading: false, data: action.payload };
    case CHATBOT_UPDATE_FAIL:
      console.log(action.payload);
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
