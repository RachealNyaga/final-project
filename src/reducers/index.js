import { combineReducers } from 'redux';
import questionReducers from './questionReducers';

export default combineReducers({
  questions: questionReducers
});