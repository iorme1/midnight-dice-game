import { PLAYERS, STAKES } from './types';

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
