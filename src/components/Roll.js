import React, { Component } from 'react';
import random from '../utils/random';
import { connect } from 'react-redux';
import { rollDice , takeFromRoll } from '../actions/gameActions';
import { addToSelection } from '../actions/optionActions';
import { diceMap } from '../utils/diceMap';
import Dice from './Dice';
import { Container,Button} from 'reactstrap';


class Roll extends Component {
  rollDice = () => {
    let board = [0,0,0,0,0,0]
    let roll = board.map(dice => random(1, 6))
    this.props.rollDice(roll);
  }

 takeFromRoll = (diceIdx, diceNum) => {
   let { currentRoll } = this.props.game;
   let currentPlayer = this.props.options.players.find(player => player.active === "true");
   let updatedRoll = currentRoll.filter((el,idx) => idx !== diceIdx )

   this.props.takeFromRoll(updatedRoll)
   this.addToSelection(currentPlayer, diceNum)
  }

  addToSelection(player, diceNum) {
     let updatedPlayerSelection = {...player};
     let updatedPlayersState = [...this.props.options.players];

     updatedPlayerSelection.selections.push(diceNum);

     updatedPlayersState.map(playerInfo => {
       if (playerInfo.id === player.id) {
         return updatedPlayerSelection;
       } else {
         return playerInfo;
       }
     });

     this.props.addToSelection(updatedPlayersState);
  }

  render() {
    let { currentRoll } = this.props.game;
  
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
              take={this.takeFromRoll.bind(this, i, dice)}
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
