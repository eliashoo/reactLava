import React, { Component } from 'react';
import lavaPic from './lava2.jpg';
import Rasia from './Rasia.js';
import {Col} from 'react-bootstrap';
import AddElement from './AddElement.js'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { DropTarget } from 'react-dnd';

const rasiaTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset();
    const item = monitor.getItem();
    const {left,top,id} = monitor.getItem();

    component.moveTo(id,left+delta.x, top+delta.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}


const style = {
  marginTop:"3em"
}
var id = 0;
class Lava extends Component {
  constructor(props) {
    super(props);
    this.state = {inouts:[],show:false,clientX:0,clientY:0,selected:null};
  }
  handleClick = (e) => {
    if(this.state.selected !== null) {
      var {left,top} = this.div.getBoundingClientRect();

      this.moveTo(this.state.selected, e.clientX-left,e.clientY-top);
      this.setState({selected:null});
      return;
    }
    if(this.state.showAddElement) {
      this.setState({showAddElement:!this.state.showAddElement});
      return;
    }
    this.setState({showAddElement:!this.state.showAddElement, clientX:e.clientX, clientY:e.clientY});
  }
  handleSelect = (id) => {
    if(id === this.state.selected) {
      this.setState({selected:null});
    } else {
      this.setState({selected:id});
    }
  }
  handleAdd = (e) => {
    e.stopPropagation();
    this.handleClick();
    var inouts = this.state.inouts.slice();
    var {left,top} = this.div.getBoundingClientRect();
    left = this.state.clientX - left;
    top = this.state.clientY - top;
    inouts.push({
      id:id++,
      left:left,
      top:top,
      type:e.currentTarget.name,
      spec:{}
    });
    this.setState({inouts});
  }
  handleDelete = (id) => {
    var inouts = this.state.inouts.filter( inout => inout.id !== id);
    this.setState({inouts,selected:null});
  }
  moveTo(id, left, top)  {
    var inouts = this.state.inouts.slice();
    var idx = inouts.findIndex( inout => inout.id === id);
    inouts[idx].left = left;
    inouts[idx].top = top;
    this.setState({inouts});
  }
  render() {
    const {connectDropTarget} = this.props;
    return (
      connectDropTarget(
        <div onClick={this.handleClick}>
          <Col md={8} mdOffset={2}  style={style}>
            <div ref={div => this.div=div} >
              <img src={lavaPic} alt="Stage map" style={{opacity:0.5,width:"100%"}}/>
              {this.state.inouts.map( r => (
                <Rasia handleSelect={this.handleSelect} selected={this.state.selected === r.id} handleDelete={this.handleDelete} {...r} key={r.id}/>
              ))}
            </div>
          </Col>
          <AddElement handleClick={this.handleAdd} left={this.state.clientX} show={this.state.showAddElement} top={this.state.clientY}/>
        </div>)
    )
  }
}
export default DragDropContext(HTML5Backend)(DropTarget("RASIA", rasiaTarget, collect)(Lava));
