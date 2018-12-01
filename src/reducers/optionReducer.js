import { 
  PLAYERS,
  STAKES,
  ADD_TO_SELECTION,
  PLAYER_CHANGE,
  QUALIFICATION
} from '../actions/types';

const initialState = {
    players: [
      {
        id: 1, profit: 0, selections: [],
        active: "true", playedTurn: false,
        scoreTotal: 0, qualified: false
      },
      {
        id: 2, profit: 0, selections: [],
        active: "false", playedTurn: false,
        scoreTotal: 0, qualified: false
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
    case PLAYER_CHANGE:
      return {
        ...state,
        players: action.payload
      };
    case QUALIFICATION:
      return {
        ...state,
        players: action.payload
      };
    default:
      return state;
  }
}
