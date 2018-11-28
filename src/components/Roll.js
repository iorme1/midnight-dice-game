import React, { Component } from 'react';
import random from '../utils/random';
import { connect } from 'react-redux';
import { rollDice , takeFromRoll } from '../actions/gameActions';
import { addToSelection } from '../actions/optionActions';
import Dice from './Dice';
import { Container,Button} from 'reactstrap';
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from '@fortawesome/free-solid-svg-icons';


class Roll extends Component {
  rollDice = () => {
    let board = [0,0,0,0,0,0]
    let roll = board.map(dice => random(1, 6))
    this.props.rollDice(roll);
  }

 takeFromRoll = (diceIdx) => {
   let { currentRoll } = this.props.game;
   let updatedRoll = currentRoll.filter((el,idx) => idx !== diceIdx )
   this.props.takeFromRoll(updatedRoll)

   // Now we need to take the dice number and add it to the current players' selection.
  }

  render() {

    let { currentRoll } = this.props.game;
    // maps integers to classes for fontawesome  dice visuals
    const diceMap = {
      1: faDiceOne,
      2: faDiceTwo,
      3: faDiceThree,
      4: faDiceFour,
      5: faDiceFive,
      6: faDiceSix
    };

    return (
      <Container>
        <div className="row">
          <div className="col-md-2">
            <Button
              color="primary"
              className="m-5"
              onClick={this.rollDice}
            >
            Roll Dice
            </Button>
          </div>
          {currentRoll.map( (dice,i) => (
            <Dice
              key={`dice${i}`}
              diceNumber={diceMap[dice]}
              take={this.takeFromRoll.bind(this, i)}
            />
          ))}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  options: state.options
});

export default connect(mapStateToProps, { rollDice, takeFromRoll, addToSelection })(Roll);
