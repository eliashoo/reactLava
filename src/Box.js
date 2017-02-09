import React, { Component } from 'react';
import {Glyphicon, Label } from 'react-bootstrap';
import Elements from './Elements.js';

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
    const fields = Elements["box"].fields;
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
export default Box;
export {BoxSetup};
