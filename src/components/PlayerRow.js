import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { diceMap } from '../utils/diceMap';

class PlayerRow extends Component {
  render() {
    const { name, id, profit, score } = this.props;
    const { activePlayerID } = this.props.game;
    const player = this.props.players.players.find(player => player.id === id);
    const profitColor = profit >= 0 ? "green" : "red";
    const status = activePlayerID === id ? "Yes" : "No";
    const rollAnimation = 'animated rollIn main-dice';
    const rowStatus = status === "Yes" ? "row-active" : "";
    const scoreDisplay = player
      .selections
      .length === 6 ? "score-display" : "hidden"

    return (
      <tr className={`${rowStatus} row-size`}>
        <td className="selection-display">
          {player.selections.map((data,i) => (
            <FontAwesomeIcon
              key={`selection${i}`}
              className={`${rollAnimation} mr-2`}
              icon={diceMap[data]}
              size="2x"
              color="black"
            />
          ))}
          <span className={scoreDisplay}>{score}</span>
        </td>
        <td style={{color: profitColor}}>
          <FontAwesomeIcon icon={faMoneyBillAlt} className="mr-2"></FontAwesomeIcon>
          ${profit}
        </td>
        <td>
          <FontAwesomeIcon className="mr-1" icon={faMale}></FontAwesomeIcon>
          {name}
        </td>
        <td>{status}</td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  players: state.players
});

export default connect(mapStateToProps)(PlayerRow);
