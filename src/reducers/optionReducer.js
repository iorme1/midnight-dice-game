// This is where our actual state is going to go. And where we check our actions

import { PLAYERS, STAKES } from '../actions/types';

const initialState = {
    playerCount: 2,
    stakeAmount: 1
};

export default function(state = initialState, action) {
  switch(action.type) {
    case STAKES:
      return {
        ...state,
        stakeAmount: action.payload
      };
    case PLAYERS:
    return {
      ...state,
      playerCount: action.payload
    };
    default:
      return state;
  }
}
