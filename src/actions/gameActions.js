import { ROLL_DICE, TAKE_FROM_ROLL } from './types';

export const rollDice = (roll) => (dispatch) => {
  dispatch({
    type: ROLL_DICE,
    payload: roll
  });
};

export const takeFromRoll = (dice) => (dispatch) => {
  dispatch({
    type: TAKE_FROM_ROLL,
    payload: dice
  })
}
