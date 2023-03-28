import { FETCH_QUESTIONS, FETCH_QUESTION, NEW_QUESTION } from '../actions/types';

const initialState = {
  items: [],
  item: {},
  question: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return {
        ...state,
        items: action.payload
      };
    case FETCH_QUESTION:
      return {
        ...state,
        question: action.payload
      };
    case NEW_QUESTION:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}