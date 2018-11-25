import React, { Component } from 'react';


class PlayerRow extends Component {
  render() {
    return (
      <tr>
        <th scope="row">0</th>
        <td>$0</td>
        <td>{this.props.name}</td>
      </tr>
    );
  }
}

export default PlayerRow;
