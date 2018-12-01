import {
  PLAYERS,
  STAKES,
  ADD_TO_SELECTION,
  PLAYER_CHANGE,
  QUALIFICATION
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

export const playerChange = (players) => (dispatch) => {
  dispatch({
    type: PLAYER_CHANGE,
    payload: players
  });
};

export const qualification = (players) => (dispatch) => {
  dispatch({
    type: QUALIFICATION,
    payload: players
  });
};
