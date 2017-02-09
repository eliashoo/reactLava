import React, { Component } from 'react';
import {Glyphicon, Modal, Button, Form} from 'react-bootstrap';
import Box,{BoxSetup} from './Box.js';
import In,{InSetup} from './In.js';
import Out,{OutSetup} from './Out.js';
import DraggableComponent from './DraggableComponent.js';
import ModalForm from './ModalForm.js';

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
        this.props.handleRasiaClick(e,this.props.id);
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
    const {type,id,left,top,spec} = this.props;
    //const spec = this.state.spec;

    const components = {
      in: In,
      out: Out,
      box: Box
    }
    const setups = {
      in: InSetup,
      out: OutSetup,
      box: BoxSetup
    }
    const types = {
      "in":"music",
      "box":"th",
      "out":"bullhorn"
    }


    const Comp = components[type];
    const Setup = setups[type];

    let dx = 0;//"-15px";
    let dy = 0;//"-12px";
    let style = {
      marginLeft:dx,
      marginTop:dy
    }
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
            <Glyphicon glyph={types[type]}/>{spec.name}
            {/* <Comp id={id} {...spec}/> */}
          </DraggableComponent>
          {this.state.showModal &&
            <ModalForm {...this.props} showModal={this.state.showModal} close={this.close}/>
          }

      </div>
    );
  }
}

export default Rasia;
