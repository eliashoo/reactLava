import React from 'react';
import {ButtonGroup, Button, Glyphicon} from 'react-bootstrap';

function AddElement(props) {
  if(!props.show) {
    return null;
  }
  const types = [["in","music","Instrument"],["box","th","Stage box"],["out","bullhorn","monitor"]];
  return (
      <ButtonGroup>
        {types.map(type =>
        <Button key={type[0]}
          bsSize="lg"
          title={type[2]}
          onClick={props.handleElementSelect}
          active={type[0] === props.selectedElement}
          name={type[0]}>
            <Glyphicon glyph={type[1]} />
        </Button>
      )}
    </ButtonGroup>
  )
}

export default AddElement;
