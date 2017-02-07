import React from 'react';
import {ButtonToolbar, Button, Glyphicon} from 'react-bootstrap';

function AddElement(props) {
  if(!props.show) {
    return null;
  }
  const types = [["in","music"],["box","th"],["out","bullhorn"]];
  return (
    <div style={{left:props.left,top:props.top,position:"absolute"}}>
      <ButtonToolbar>
        {types.map(type =>
        <Button bsSize="large" onClick={props.handleClick} name={type[0]}><Glyphicon glyph={type[1]} /></Button>
      )}
      </ButtonToolbar>
    </div>
  )
}

export default AddElement;
