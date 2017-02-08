import React, { Component } from 'react';
import {Glyphicon, Modal, Button, Form} from 'react-bootstrap';
import Box,{BoxSetup} from './Box.js';
import In,{InSetup} from './In.js';
import Out,{OutSetup} from './Out.js';
import DraggableComponent from './DraggableComponent.js';


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
  handleChange = (event) => {
    var target = event.target;
    var val = target.value;

    if(target.type === 'checkbox') {
      val = target.checked;
    }
    var formState = {...this.state.formState, [target.name]:val};
    this.setState({formState});
  }
  handleDelete = () => {
    this.props.handleDelete(this.props.id);
    this.close();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.close();
    const {id} = this.props;
    const {formState} = this.state;
    this.props.handleSetupSubmit({id,formState});
    //var spec = {...this.state.spec, ...this.state.formState};
    //this.setState({spec})
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

    let dx = -0.015; // %-width and height of half of component
    let dy = -0.028;
    let style = {}
    if(this.props.selected) {
      style = {fontSize:"2em" }
      dx *= 2;
      dy *= 2;
    }
    let className= `comp-${type}`;
    return (
      <div onDoubleClick={this.handleEvent}
            onContextMenu={this.handleEvent}
            onClick={this.handleEvent}>
          <DraggableComponent  className={className} style={style} left={left+dx} top={top+dy} id={id}>
            <Glyphicon glyph={types[type]}/>{spec.name}
            {/* <Comp id={id} {...spec}/> */}
          </DraggableComponent>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {spec.name}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit} action="#">
          <Modal.Body>
            <Setup id={id} handleChange={this.handleChange}
              {...this.state.formState} />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onSubmit={this.handleSubmit}>OK</Button>
            <Button onClick={this.handleDelete}>
              <Glyphicon glyph="remove" />
              Remove
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Rasia;
