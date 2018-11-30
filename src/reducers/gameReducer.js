// This is where our actual state is going to go. And where we check our actions

import { ROLL_DICE, TAKE_FROM_ROLL, RESET_ROLL } from '../actions/types';

const initialState = {
  currentRoll: [0,0,0,0,0,0]
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
    default:
      return state;
  }
}
