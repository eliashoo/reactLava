import React, { Component } from 'react';
import {Glyphicon, Label } from 'react-bootstrap';

import FieldGroup from './FieldGroup.js';

class Box extends Component {
  render() {
    const {name} = this.props;
    return (
      <Label bsStyle="primary">
        <Glyphicon glyph="th" />
        {name}
      </Label>
    );
  }
}
class BoxSetup extends Component {
  handleChange = (event) => {
    this.props.handleChange(event);
  }
  render() {
    const {name} = this.props;
    return (
      <div>
      <FieldGroup id="nameText" autoFocus label="Name" name="name"
        value={name} onChange={this.handleChange}/>
      </div>
    )
  }
}
export default Box;
export {BoxSetup};
