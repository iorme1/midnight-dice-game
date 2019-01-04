// This is where our actual state is going to go. And where we check our actions

import {
  ROLL_DICE,
  TAKE_FROM_ROLL,
  RESET_ROLL,
  ROUND_STATUS_CHANGE,
  ROLL_STATUS_CHANGE,
  UPDATE_POT,
  ACTIVE_PLAYER,
  STAKES
} from '../actions/types';

const initialState = {
  currentRoll: [0,0,0,0,0,0],
  roundInProgress: false,
  rollAvailable: true,
  pot: 0,
  activePlayerID: 1,
  stakeAmount: 1
};

export default function(state = initialState, action) {
  switch(action.type) {
    case STAKES:
      return {
        ...state,
        stakeAmount: action.payload
      };
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
        };
      case ROUND_STATUS_CHANGE:
        return {
          ...state,
          roundInProgress: action.payload
        };
      case ROLL_STATUS_CHANGE:
        return {
          ...state,
          rollAvailable: action.payload
        };
      case UPDATE_POT:
        return {
          ...state,
          pot: action.payload
        };
      case ACTIVE_PLAYER:
        return {
          ...state,
          activePlayerID: action.payload
        };
    default:
      return state;
  }
}
