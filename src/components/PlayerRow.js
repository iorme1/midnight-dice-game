import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { diceMap } from '../utils/diceMap';

class PlayerRow extends Component {
  render() {

    const { name, id, active, profit } = this.props;
    const player = this.props.options.players.find(player => player.id === id);
    const profitColor = profit >= 0 ? "green" : "red";
    const status = active === "false" ? "No" : "Yes";
    const rollAnimation = 'animated rollIn main-dice';
    const rowStatus = active === "false" ? "" : "row-active";

    return (
      <tr className={rowStatus}>
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
        <td style={{color: profitColor}}>${profit}</td>
        <td>{name}</td>
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
