import React, { Component } from 'react';
import {Glyphicon, Label } from 'react-bootstrap';

import FieldGroup from './FieldGroup.js';

class In extends Component {
  render() {
    const {name,ch} = this.props;
    return (
      <Label bsStyle="danger">
        <Glyphicon glyph="music" />
        {name} - {ch}
      </Label>
    );
  }
}
class InSetup extends Component {
  handleChange = (event) => {
    this.props.handleChange(event);
  }
  render() {
    const {name,ch,di,phantom} = this.props;
    return (
      <div>
        <FieldGroup id="nameText" autoFocus label="Name" type="text"
          onChange={this.handleChange} name="name" value={name} />
        <FieldGroup id="chText" label="Ch" type="text"
          onChange={this.handleChange} name="ch" value={ch} />
        <FieldGroup id="diCheck" label="DI" onChange={this.handleChange}
          name="di" defaultChecked={di} check/>
        <FieldGroup id="pahtomCheck" label="Phantom"
          onChange={this.handleChange} name="phantom"
          defaultChecked={phantom} check/>
      </div>
    )
  }
}
export {InSetup};
export default In;
