import React,{Component} from 'react';

import {Glyphicon,Button,Form,Modal} from 'react-bootstrap';

import ElementSetup from './ElementSetup';

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {formState:props.inout.spec}
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
    const id = this.props.id;
    const {formState} = this.state;
    this.props.formHandlers.submit({id,formState});
  }
  handleDelete = (e) => {
    this.props.close();
    this.props.formHandlers.delete(this.props.id);
  }
  render() {
    const {inout} = this.props;
    const {type} = inout;

    return (
      <Modal show={this.props.showModal} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {inout.spec.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit} action="#">
        <Modal.Body>
          <ElementSetup horizontal type={type} handleChange={this.handleChange}
            spec={this.state.formState} />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">OK</Button>
          <Button onClick={this.handleDelete}>
            <Glyphicon glyph="trash" />
            Remove
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}
export default ModalForm
