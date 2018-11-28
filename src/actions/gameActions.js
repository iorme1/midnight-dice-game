import { ROLL_DICE, PLAYER_CHANGE, TAKE_FROM_ROLL } from './types';

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

export const takeFromRoll = (dice) => (dispatch) => {
  dispatch({
    type: TAKE_FROM_ROLL,
    payload: dice
  })
}
