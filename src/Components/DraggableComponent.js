import React, { Component } from 'react';
import {DragSource} from 'react-dnd';

var rasiaSource = {
  beginDrag: function (props) {
    return { type:"RASIA", id:props.id};
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DraggableComponent extends Component {
  render() {
    const {
      className,
      connectDragSource,
      children,
      selected,
      isDragging,
      ...props
    } = this.props;

    if(isDragging) {
      return null;
    }


    const selectedClass = selected ? 'selected' : '';
    const classes = `${className} component ${selectedClass}`
    return (
      connectDragSource(
        <div className={classes} {...props}>
          {children}
        </div>)
    );
  }
}

export default DragSource("RASIA",rasiaSource, collect)(DraggableComponent);
