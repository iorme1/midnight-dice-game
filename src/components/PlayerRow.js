import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayerRow extends Component {
  
  render() {
    const { name } = this.props;
    const { active } = this.props;
    const status = active === "false" ? "No" : "Yes";

    return (
      <tr>
        <td></td>
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
})
export default connect(mapStateToProps)(PlayerRow);
