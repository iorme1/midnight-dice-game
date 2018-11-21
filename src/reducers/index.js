import { combineReducers } from 'redux';
import optionReducer from './optionReducer';



export default combineReducers({
  options: optionReducer
})

// actions
/*
"STAKE SELECTION"

"PLAYER SELECTION"

"ROLL DICE"

"START GAME"
*/
