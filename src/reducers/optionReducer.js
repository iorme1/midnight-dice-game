// This is where our actual state is going to go. And where we check our actions

import { START_GAME } from '../actions/types';

const initialState = {
  options: {
    playerCount: 2,
    stakeAmount: 1
  }
};

export default function(state = initialState, action) {
  switch(action.type) {
    case START_GAME:
      return {
        ...state
      };
    default:
      return state;
  }
}
