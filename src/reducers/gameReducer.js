// This is where our actual state is going to go. And where we check our actions

import {
  ROLL_DICE,
  TAKE_FROM_ROLL,
  RESET_ROLL,
  ROUND_STATUS_CHANGE,
  ROLL_STATUS_CHANGE
} from '../actions/types';

const initialState = {
  currentRoll: [0,0,0,0,0,0],
  roundInProgress: false, // this state determines wheter you can click the start round button or not
  rollAvailable: true  //this state determines whether a player can roll or if they must choose a die before rolling again
};

export default function(state = initialState, action) {
  switch(action.type) {
    case ROLL_DICE:
      return {
        ...state,
        currentRoll: action.payload
      };
      case TAKE_FROM_ROLL:
        return {
          ...state,
          currentRoll: action.payload
        };
      case RESET_ROLL:
        return {
          ...state,
          currentRoll: action.payload
        }
      case ROUND_STATUS_CHANGE:
        return {
          ...state,
          roundInProgress: action.payload
        }
      case ROLL_STATUS_CHANGE:
        return {
          ...state,
          rollAvailable: action.payload
        }
    default:
      return state;
  }
}
