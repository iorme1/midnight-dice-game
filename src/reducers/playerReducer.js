import {
  PLAYERS,
  ADD_TO_SELECTION,
  UPDATE_PLAYER_STATS
} from '../actions/types';

const initialState = {
  players: []
};

export default function(state = initialState, action) {
  switch(action.type) {
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
