import React, { Component } from 'react';
import {Glyphicon, Modal, Button, Form} from 'react-bootstrap';
import Box,{BoxSetup} from './Box.js';
import In,{InSetup} from './In.js';
import Out,{OutSetup} from './Out.js';
import DraggableComponent from './DraggableComponent.js';


class Rasia extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal:true,spec:this.props.spec,formState:{}}
  }
  close = () => {
    this.setState({showModal:false});
  }
  open = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({showModal:true});
  }
  handleChange = (event) => {
    var target = event.target;
    var val = target.value;

    if(target.type === 'checkbox') {
      val = target.checked;
    }

    this.setState( prevState => {
      var formState = Object.assign({}, prevState.formState, {[target.name]:val} )
      return {formState}
    });
  }
  handleClick = (e) => {
    this.props.handleSelect(this.props.id);
    e.stopPropagation();
  }
  handleDelete = () => {
    this.props.handleDelete(this.props.id);
    this.close();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.close();
    var spec = Object.assign({}, this.state.spec, this.state.formState);
    this.setState({spec})
  }
  render() {
    const {type,id,left,top} = this.props;
    const spec = this.state.spec;

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

    const Comp = components[type];
    const Setup = setups[type];
    var style = {}
    if(this.props.selected) {
      style = {fontSize:"2em" }
    }
    return (
      <div>
        <div onDoubleClick={this.open} onContextMenu={this.open} onClick={this.handleClick} >
          <DraggableComponent  style={style} left={left} top={top} id={id}>
            <Comp id={id} {...spec}/>
          </DraggableComponent>
        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {name}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit} action="#">
          <Modal.Body>
            <Setup id={id} handleChange={this.handleChange} opts={spec} />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onSubmit={this.handleSubmit}>OK</Button>
            <Button onClick={this.handleDelete}><Glyphicon glyph="remove" />Remove</Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Rasia;
