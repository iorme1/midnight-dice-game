import {
  PLAYERS,
  STAKES,
  ADD_TO_SELECTION,
  UPDATE_PLAYER_STATS
} from './types';

export const setStakes = (stakes) => (dispatch) => {
  dispatch({
    type: STAKES,
    payload: stakes
  });
};

export const setPlayers = (players) => (dispatch) => {
  dispatch({
    type: PLAYERS,
    payload: players
  });
};

export const addToSelection = (player) => (dispatch) => {
  dispatch({
    type: ADD_TO_SELECTION,
    payload: player
  });
};

export const updatePlayerStats = (players) => (dispatch) => {
  dispatch({
    type: UPDATE_PLAYER_STATS,
    payload: players
  });
};
