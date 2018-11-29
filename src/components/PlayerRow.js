import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { diceMap } from '../utils/diceMap';

class PlayerRow extends Component {
  render() {

    const { name } = this.props;
    const { id } = this.props;
    const { active } = this.props;

    const player = this.props.options.players.find(player => player.id === id);
    const status = active === "false" ? "No" : "Yes";
    const rollAnimation = 'animated rollIn main-dice';

    return (
      <tr>
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
        <td>$0</td>
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
