import { PLAYERS, STAKES, ADD_TO_SELECTION } from './types';

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

export const addToSelection = (dice) => (dispatch) => {
  dispatch({
    type: ADD_TO_SELECTION,
    payload: dice
  })
}
