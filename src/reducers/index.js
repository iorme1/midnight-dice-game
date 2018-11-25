import { combineReducers } from 'redux';
import optionReducer from './optionReducer';


export default combineReducers({
  options: optionReducer
})
