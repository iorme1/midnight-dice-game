import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { renderToStaticMarkup } from 'react-dom/server';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import RoundInProgressAlert from './AlertRoundInProgress';
import { connect } from 'react-redux';
import { updatePlayerStats } from '../actions/playerActions';
import { roundStart, updatePot } from '../actions/gameActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

class StartRound extends Component {
    state = {
      show: false
    }

    startGame = () => {
      if (this.props.game.roundInProgress) {
        this.setState({ show: true })
        return;
      }

      let { stakeAmount } = this.props.game;

      this.setPlayerAntes(stakeAmount)
      this.props.roundStart(true)
    }


    setPlayerAntes = (stakeAmount) => {
      let playersState = this.props.players.players;

      let updatedPlayersState = playersState.map(player => {
        return  {
          ...player,
          profit: player.profit - stakeAmount
        };
      });

      this.props.updatePlayerStats(updatedPlayersState);
      this.addAntesToPot();
    }

    addAntesToPot = () => {
      let newPotState = this.props.game.pot + (this.props.players.players.length * this.props.game.stakeAmount)
      this.props.updatePot(newPotState)
    }


    render() {
      return (
        <Container style={{textAlign: 'center'}}>
          <SweetAlert
            show={this.state.show}
            title=""
            html
            text={renderToStaticMarkup(<RoundInProgressAlert />)}
            onConfirm={() => this.setState({ show: false })}
          />
          <Button
            className="mt-2 start-rnd-btn"
            color="success"
            onClick={this.startGame}
          >
            START ROUND
            <FontAwesomeIcon icon={faPlayCircle} className="ml-1"></FontAwesomeIcon>
          </Button>
        </Container>
      );
    }
}
const mapStateToProps = (state) => ({
  players: state.players, 
  game: state.game
});

export default connect(mapStateToProps, {
  updatePlayerStats,
  roundStart,
  updatePot
})(StartRound);
