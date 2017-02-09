import React, { Component } from 'react';
import {Glyphicon, Label } from 'react-bootstrap';
import Elements from './Elements.js';

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
    const fields = Elements["in"].fields;
    const {name,ch,di,phantom} = this.props;
    return (
      <div>
        {fields.map( (field) => (
          <FieldGroup horizontal={this.props.horizontal} key={field.name} id='${field.name}Text' label={field.name} type={field.type}
            onChange={this.handleChange} name={field.name} value={this.props[field.name]} />
        ))}
      </div>
    )
  }
}
export {InSetup};
export default In;
