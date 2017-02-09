import React from 'react';

import {FormControl, FormGroup,Col,ControlLabel,Checkbox} from 'react-bootstrap';

function FieldGroup({horizontal, type,id, label, help,  ...props}) {
  if(horizontal) {
    return (
      <FormGroup controlId={id}>
        <Col componentClass={ControlLabel} xs={2}>
          {label}
        </Col>
        <Col xs={10}>
          {type === 'checkbox' ? <Checkbox {...props}/> : <FormControl {...props} />}
        </Col>
      </FormGroup>
  )} else {
    return (
      <FormGroup controlId={id}>
        {type === 'checkbox' ? '' : <ControlLabel>{label}</ControlLabel>}
        {type === 'checkbox' ? <Checkbox inline {...props}>{label}</Checkbox> : <FormControl {...props} />}
      </FormGroup>
  )}
}
export default FieldGroup;
