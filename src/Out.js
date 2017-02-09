import React, { Component } from 'react';
import {Glyphicon, Label } from 'react-bootstrap';
import Elements from './Elements.js';

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
    const fields = Elements["out"].fields;
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
export {OutSetup};
export default Out;
