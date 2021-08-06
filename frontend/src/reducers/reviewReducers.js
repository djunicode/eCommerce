import {
  REVIEW_GET_FAIL,
  REVIEW_GET_REQUEST,
  REVIEW_GET_SUCCESS,
  REVIEW_POST_FAIL,
  REVIEW_POST_REQUEST,
  REVIEW_POST_SUCCESS,
} from '../constants/reviewConstants';

export const getReviewsReducer = (
  state = { loadingReviews: false, reviews: [], errorReviews: '' },
  action,
) => {
  switch (action.type) {
    case REVIEW_GET_REQUEST:
      return { ...state, loadingReviews: true };
    case REVIEW_GET_SUCCESS:
      return {
        ...state,
        loadingReviews: false,
        reviews: action.payload,
      };
    case REVIEW_GET_FAIL:
      return {
        ...state,
        loadingReviews: false,
        errorReviews: action.payload,
      };
    default:
      return state;
  }
};

export const postReviewReducer = (
  state = { loadingReview: false, reviewPost: [], errorReview: '' },
  action,
) => {
  switch (action.type) {
    case REVIEW_POST_REQUEST:
      return { ...state, loadingReview: true };
    case REVIEW_POST_SUCCESS:
      return {
        ...state,
        loadingReview: false,
        reviewPost: action.payload,
      };
    case REVIEW_POST_FAIL:
      return {
        ...state,
        loadingReview: false,
        errorReview: action.payload,
      };
    default:
      return state;
  }
};
