import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import random from '../utils/random';
import { connect } from 'react-redux';
import {
  rollDice,
  takeFromRoll,
  resetRoll,
  roundStart,
  rollAvailable,
  updatePot,
  activePlayerChange
 } from '../actions/gameActions';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { addToSelection, updatePlayerStats} from '../actions/optionActions';
import { diceMap } from '../utils/diceMap';
import Dice from './Dice';
import RollUnavailableAlert from './AlertRollUnavailable';
import RoundHasNotBegunAlert from './AlertRoundHasNotBegun';
import { Container,Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import RoundLogic from '../game-logic/roundLogic';


class Roll extends Component {
  state = {
    rollAlert: false,
    roundAlert: false
  }

  rollDice = () => {
    if (this.props.game.roundInProgress === false) {
      this.setState({ roundAlert: true });
      return;
    }

    if (this.props.game.rollAvailable) {
      let { currentRoll } = this.props.game;

      let updatedRoll = currentRoll.map(dice => random(1, 6))
      this.props.rollDice(updatedRoll);
      // make roll unavailable until user selects a die.
      this.props.rollAvailable(false);
    } else {
      this.setState({ rollAlert: true });
    }
  }

  takeFromRoll(diceIdx, diceNum) {
    let { currentRoll } = this.props.game;
    let { players } = this.props.options;
    let { activePlayerID } = this.props.game;

    let gameData = RoundLogic.getCurrGameData(players, activePlayerID, diceNum);
    let updatedRoll = RoundLogic.updateRoll(diceIdx, diceNum, currentRoll);
    let isTurnOver = updatedRoll.length === 0;  // boolean to checking whether any dice remain

    this.props.takeFromRoll(updatedRoll);
    this.props.rollAvailable(true);

    this.gameStatusChecks(isTurnOver, gameData)
  }


  gameStatusChecks(isTurnOver, gameData) {
    if (isTurnOver && RoundLogic.roundOver(gameData.currPlyrsState)) {
      this.handleRoundOver(gameData)
    } else if (isTurnOver) {
      this.handleTurnOver(gameData)
    } else {
      // player's turn is still active. no more modifications to players/game state
      this.props.updatePlayerStats(gameData.currPlyrsState)
    }
  }


  handleTurnOver(gameData) {
    let turnEndingState = RoundLogic.handleTurnStats(gameData);
    let { players } = this.props.options;
    let nextPlayer = RoundLogic.activePlayerChange(gameData.currPlyr.id, players);
    this.props.updatePlayerStats(turnEndingState);
    this.props.activePlayerChange(nextPlayer);
    this.props.resetRoll([0,0,0,0,0,0]);
  }


  handleRoundOver(gameData) {
    // input the last player's turn stats so we can then determine if there is a winner
    let finalTurnEndingState = RoundLogic.handleTurnStats(gameData);
    let winner = RoundLogic.getWinner(finalTurnEndingState) // returns an array of winner(s)

    if (winner.length === 1) {
      this.winRound(finalTurnEndingState, winner);
    } else {
      // game has multiple winners here, therefore it is a tie round.
      this.tieRound(finalTurnEndingState, winner);
    }

    this.props.resetRoll([0,0,0,0,0,0]);
    this.props.roundStart(false);
  }


  winRound(finalTurnEndingState, winner) {
    let winningPlayer = winner[0];
    let winnerID = winningPlayer.id
    let profit = this.props.game.pot + winningPlayer.profit
    let updatedPlayersState = RoundLogic.handleWinRound(winnerID, profit, finalTurnEndingState);

    this.props.updatePlayerStats(updatedPlayersState);
    this.props.updatePot(0); // reset pot to $0 because we paid out winner
    this.props.activePlayerChange(winnerID); // next player starting new round will be the winner
  }


  tieRound(finalTurnEndingState, winners) {
    let nextPlayer = winners[random(0, winners.length-1)].id; // random winner starts next round
    let updatedPlayersState = RoundLogic.handleTieRound(finalTurnEndingState); // resets player selections, pot continues on into next round

    this.props.updatePlayerStats(updatedPlayersState);
    this.props.activePlayerChange(nextPlayer);
  }


  render() {
    let { currentRoll } = this.props.game;

    return (
      <Container>
        <SweetAlert
          show={this.state.rollAlert}
          title="Rollling Not Allowed"
          html
          text={renderToStaticMarkup(<RollUnavailableAlert />)}
          onConfirm={() => this.setState({ rollAlert: false })}
        />
        <SweetAlert
          show={this.state.roundAlert}
          title="Round has not begun yet..."
          html
          text={renderToStaticMarkup(<RoundHasNotBegunAlert />)}
          onConfirm={() => this.setState({ roundAlert: false })}
        />
        <div className="row">
          <div className="col-md-12 text-center">
            <Button
              className="m-4 roll-dice-btn"
              color="primary"
              onClick={this.rollDice}
            >
              ROLL DICE
              <FontAwesomeIcon className="ml-1" icon={faDice} ></FontAwesomeIcon>
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            {currentRoll.map( (dice,i) => (
              <Dice
                key={`dice${i}`}
                diceNumber={diceMap[dice]}
                take={this.takeFromRoll.bind(this, i, dice)}
              />
            ))}
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  options: state.options
});

export default connect(mapStateToProps, {
   rollDice,
   takeFromRoll,
   addToSelection,
   resetRoll,
   updatePlayerStats,
   roundStart,
   rollAvailable,
   updatePot,
   activePlayerChange
 }
)(Roll);
