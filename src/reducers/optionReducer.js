import {
  PLAYERS,
  STAKES,
  ADD_TO_SELECTION,
  UPDATE_PLAYER_STATS
} from '../actions/types';

const initialState = {
    players: [
      {
        id: 1, profit: 0, selections: [],
        playedTurn: false, scoreTotal: 0, qualified: false
      },
      {
        id: 2, profit: 0, selections: [],
        playedTurn: false, scoreTotal: 0, qualified: false
      }
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
    case ADD_TO_SELECTION:
      return {
        ...state,
        players: action.payload
      };
    case UPDATE_PLAYER_STATS:
      return {
        ...state,
        players: action.payload
      }
    default:
      return state;
  }
}
