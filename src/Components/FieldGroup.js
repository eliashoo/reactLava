import React from 'react';

import {FormControl, FormGroup,Col,ControlLabel,Checkbox} from 'react-bootstrap';

function FieldGroup({value, horizontal, type,id, label, help,  ...props}) {
  if(horizontal) {
    return (
      <FormGroup controlId={id}>
        {type !== 'checkbox' && (
          <Col componentClass={ControlLabel} xs={2}>
            {label}
          </Col>
        )}
        <Col xs={10}>
          {type === 'checkbox' ? <Checkbox inline checked={value} {...props}>{label}</Checkbox> : <FormControl value={value} {...props} />}
        </Col>
      </FormGroup>
  )} else {
    return (
      <FormGroup controlId={id}>
        {type === 'checkbox' ? '' : <ControlLabel>{label}</ControlLabel>}
        {type === 'checkbox' ? <Checkbox inline checked={value} {...props}>{label}</Checkbox> : <FormControl value={value} {...props} />}
      </FormGroup>
  )}
}
export default FieldGroup;
