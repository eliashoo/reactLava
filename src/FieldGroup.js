import React from 'react';

import {FormControl, FormGroup,Col,ControlLabel,Checkbox} from 'react-bootstrap';

function FieldGroup({id, label, help, check, ...props}) {
  return (
    <FormGroup controlId={id}>
      <Col componentClass={ControlLabel} xs={2}>
        {label}
      </Col>
      <Col xs={10}>
        {check ? <Checkbox {...props}/> : <FormControl {...props} />}
      </Col>
    </FormGroup>
  )
}
export default FieldGroup;
