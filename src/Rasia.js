import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import DraggableComponent from './DraggableComponent.js';
import Elements from './Elements';
import ElementComponents from './Components/ElementComponents';
import './rasia.css';

class Rasia extends Component {
  handleClick = (e) => {
    e.stopPropagation();
    this.props.handleClick(this.props.id);
  }
  render() {
    const {left,top,type,spec,selected} = this.props.inout;
    const {id} = this.props;

    let Comp = ElementComponents[type];

    const style = {
      left:left*100+"%",
      top:top*100+"%"
    }

    let className= `comp-${type}`;
    return (
      <div className="comp-container"
        style={style}
      >
          <DraggableComponent
            onClick={this.handleClick}
            className={className}
            selected={selected}
            id={id}
          >
            <Glyphicon glyph={Elements[type].glyph}/>
            <Comp {...spec}/>
          </DraggableComponent>
      </div>
    );
  }
}
export default Rasia;
