import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { diceMap } from '../utils/diceMap';

class PlayerRow extends Component {
  render() {
    const { name, id, profit } = this.props;
    const { activePlayerID } = this.props.game;
    const player = this.props.options.players.find(player => player.id === id);
    const profitColor = profit >= 0 ? "green" : "red";
    const status = activePlayerID === id ? "Yes" : "No";
    const rollAnimation = 'animated rollIn main-dice';
    const rowStatus = status === "Yes" ? "row-active" : "";

    return (
      <tr className={`${rowStatus} row-size`}>
        <td>
          {player.selections.map((data,i) => (
            <FontAwesomeIcon
              key={`selection${i}`}
              className={`${rollAnimation} mr-2`}
              icon={diceMap[data]}
              size="2x"
              color="black"
            />
          ))}
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
  options: state.options
});

export default connect(mapStateToProps)(PlayerRow);
