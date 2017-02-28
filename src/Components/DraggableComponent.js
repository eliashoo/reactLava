import React, { Component } from 'react';
import {DragSource} from 'react-dnd';
import Rasia from './Rasia'

var rasiaSource = {
  beginDrag: function ({id}) {
    return { type:"RASIA", id};
  }
}

function collect({dragSource}, monitor) {
  return {
    connectDragSource: dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DraggableComponent extends Component {
  render() {
    const {
      connectDragSource,
      isDragging,
      hideWhenDrag,
      children
    } = this.props;

    if(hideWhenDrag && isDragging) {
      return null;
    }
    // DragSource can only wrap native elements so div is needed here
    return connectDragSource(<div style={{display:'inline-block'}}>{children}</div>);
  }
}

export default DragSource("RASIA",rasiaSource, collect)(DraggableComponent);
