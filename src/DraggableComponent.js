import React, { Component } from 'react';
import {DragSource} from 'react-dnd';

var rasiaSource = {
  beginDrag: function (props) {
    return { type:"RASIA", id:props.id, left:props.left, top:props.top };
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
    if(this.props.isDragging) {
      return null;
    }

    const {left,top,connectDragSource} = this.props;

    var style = {
      left:left*100+"%",
      top:top*100+"%",
    }

    if(this.props.style) {
      Object.assign(style, this.props.style);
    }
    return (
      connectDragSource(
        <div className="component" style={style} >
          {this.props.children}
        </div>)
    );
  }
}

export default DragSource("RASIA",rasiaSource, collect)(DraggableComponent);
