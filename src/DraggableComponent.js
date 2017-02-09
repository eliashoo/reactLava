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

    const {left,top,connectDragSource,className} = this.props;

    var style = {
      left:left+"px",
      top:top+"px",
    }

    if(this.props.style) {
      Object.assign(style, this.props.style);
    }

    const classes = `${this.props.className} component`
    return (
      connectDragSource(
        <div className={classes} style={style} >
          {this.props.children}
        </div>)
    );
  }
}

export default DragSource("RASIA",rasiaSource, collect)(DraggableComponent);
