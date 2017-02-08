import React from 'react';
import {ButtonToolbar, Button, Glyphicon} from 'react-bootstrap';

function AddElement(props) {
  if(!props.show) {
    return null;
  }
  const types = [["in","music"],["box","th"],["out","bullhorn"]];
  return (
    <div className="add-element">
      <ButtonToolbar>
        {types.map(type =>
        <Button key={type[0]}
          bsSize="xs"
          onClick={props.handleElementSelect}
          active={type[0] === props.selectedElement}
          name={type[0]}>
            <Glyphicon glyph={type[1]} />
        </Button>
      )}
      </ButtonToolbar>
    </div>
  )
}

export default AddElement;
