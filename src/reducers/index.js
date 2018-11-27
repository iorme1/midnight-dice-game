import { combineReducers } from 'redux';
import optionReducer from './optionReducer';
import gameReducer from './gameReducer';


export default combineReducers({
  options: optionReducer,
  game: gameReducer,
})
