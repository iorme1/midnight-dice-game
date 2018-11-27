import { ROLL_DICE, PLAYER_CHANGE } from './types';

export const rollDice = (roll) => (dispatch) => {
  dispatch({
    type: ROLL_DICE,
    payload: roll
  });
};

export const playerChange = (nextPlayer) => (dispatch) => {
  dispatch({
    type: PLAYER_CHANGE,
    payload: nextPlayer
  });
};
