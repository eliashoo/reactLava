import React, { Component } from 'react';
import {Glyphicon, Label } from 'react-bootstrap';

import FieldGroup from './FieldGroup.js';

class Out extends Component {
  render() {
    const {name,ch} = this.props;
    return (
      <Label bsStyle="success">
        <Glyphicon glyph="bullhorn" />
        {name} - {ch}
      </Label>
    );
  }
}
class OutSetup extends Component {
  handleChange = (event) => {
    this.props.handleChange(event);
  }
  render() {
    const {name,ch} = this.props;
    return (
      <div>
      <FieldGroup id="nameText" autoFocus label="Name"
        onChange={this.handleChange} value={name} name="name"/>
      <FieldGroup id="chText" label="Ch"
        onChange={this.handleChange} value={ch} name="ch"/>
      </div>
    )
  }
}
export {OutSetup};
export default Out;
