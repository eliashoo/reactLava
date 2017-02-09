import React,{Component} from 'react';

import {Glyphicon,Button,Form,Modal} from 'react-bootstrap';

import {BoxSetup} from './Box.js';
import {InSetup} from './In.js';
import {OutSetup} from './Out.js';

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {formState:props.spec}
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
  handleSubmit = (e) => {
    this.props.close();
    e.preventDefault();
    e.stopPropagation();
    const id = this.props.id;
    const {formState} = this.state;
    this.props.handleSetupSubmit({id,formState});
  }
  handleDelete = (e) => {
    this.props.close();
    this.props.handleDelete(this.props.id);
  }
  render() {
    const setups = {
      in: InSetup,
      out: OutSetup,
      box: BoxSetup
    }
    let {type} = this.props;

    let Setup = setups[type];

    return (
      <Modal show={this.props.showModal} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {this.props.spec.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit} action="#">
        <Modal.Body>
          <Setup horizontal id={this.props.id} handleChange={this.handleChange}
            {...this.state.formState} />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">OK</Button>
          <Button onClick={this.handleDelete}>
            <Glyphicon glyph="remove" />
            Remove
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}
export default ModalForm
