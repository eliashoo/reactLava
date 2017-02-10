import React from 'react';
import {ButtonGroup, Button, Glyphicon} from 'react-bootstrap';
import Elements from './Elements';

function AddElement(props) {
  return (
      <ButtonGroup>
        {Object.keys(Elements).map(type =>
        <Button key={type}
          bsSize="lg"
          title={Elements[type].title}
          onClick={props.handleElementSelect}
          active={type === props.selectedElement}
          name={type}>
            <Glyphicon glyph={Elements[type].glyph} />
        </Button>
      )}
    </ButtonGroup>
  )
}

export default AddElement;
