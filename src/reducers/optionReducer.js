// This is where our actual state is going to go. And where we check our actions

import { PLAYERS, STAKES } from '../actions/types';

const initialState = {
    players: [
      { id: 1, profit: 0, selections: [], active: "true" },
      { id: 2, profit: 0, selections: [], active: "false" }
    ],
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
      players: action.payload
    };
    default:
      return state;
  }
}
