import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import DraggableComponent from './DraggableComponent.js';
import ModalForm from './ModalForm.js';
import Elements from './Elements';

class Rasia extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal:this.props.shoulOpenModal,spec:this.props.spec,formState:this.props.spec}
  }
  close = () => {
    this.setState({showModal:false});
  }
  open = () => {
    this.setState({showModal:true});
  }
  handleEvent = (e) => {
    e.stopPropagation();
    switch(e.type) {
      case "click":
        this.props.handleRasiaClick(this.props.id);
        break;
      case "dblclick":
      case "contextmenu":
        this.open();
        e.preventDefault();
        break;
      default:
        break;
    }
  }
  handleDelete = () => {
    this.props.handleDelete(this.props.id);
    this.close();
  }
  render() {
    const {left,top,type,spec} = this.props.inout;
    const {formHandlers,id,inout} = this.props;

    let style = {}
    if(this.props.selected) {
      style = {
        border:"2px dashed black"
      }
    }

    let className= `comp-${type}`;
    return (
      <div onDoubleClick={this.handleEvent}
            onContextMenu={this.handleEvent}
            onClick={this.handleEvent}>
          <DraggableComponent  className={className} style={style} left={left} top={top} id={id}>
            <Glyphicon glyph={Elements[type].glyph}/>{spec.name}
          </DraggableComponent>
          {this.state.showModal &&
            <ModalForm id={id} inout={inout} formHandlers={formHandlers} showModal={this.state.showModal} close={this.close}/>
          }

      </div>
    );
  }
}

export default Rasia;
