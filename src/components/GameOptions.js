import React, { Component } from 'react';
import dollarConverter from '../utils/dollarConverter';
import {
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';


class GameOptions extends Component {

  state = {
    stakes: 1,
    playercount: 2
  }

  onChange = (e) => {
    let value = null;

    if (e.target.value.includes("$")) {
      value = dollarConverter(e.target.value);
    } else {
      value = parseInt(e.target.value);
    }

    this.setState({
      [e.target.name] : value
    })
  }

  render() {
    return (
      <div className="col-md-2">
        <Form>
          <FormGroup>
          <Label for="playercount">Players</Label>
          <Input
            type="select"
            name="playercount"
            id="playerSelect"
            className="mb-2"
            onChange={this.onChange}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
          <Label for="stakes">Stakes</Label>
          <Input
            type="select"
            name="stakes"
            id="stakeselect"
            onChange={this.onChange}
          >
            <option>$1</option>
            <option>$2</option>
            <option>$3</option>
            <option>$4</option>
            <option>$5</option>
          </Input>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default GameOptions;
