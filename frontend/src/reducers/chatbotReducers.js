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
      return { ...state, loading: false, data: action.payload };
    case CHATBOT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateChatbot = (
  state = { Loading: false, Data: [], Error: '' },
  action,
) => {
  switch (action.type) {
    case CHATBOT_UPDATE_REQUEST:
      return { ...state, Loading: true };
    case CHATBOT_UPDATE_SUCCESS:
      return { ...state, Loading: false, Data: action.payload };
    case CHATBOT_UPDATE_FAIL:
      return { ...state, Loading: false, Error: action.payload };
    default:
      return state;
  }
};
