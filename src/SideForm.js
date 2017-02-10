import React,{Component} from 'react';

import {Glyphicon,Button,Form,FormGroup} from 'react-bootstrap';

import ElementSetup from './ElementSetup';

class SideForm extends Component {
  constructor(props) {
    super(props);
    this.state = {formState:props.inout && props.inout.spec}
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
  componentWillReceiveProps(nextProps) {

    this.setState({formState:nextProps.inout && nextProps.inout.spec});
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const id = this.props.inout.id;
    const {formState} = this.state;
    this.props.formHandlers.submit({id,formState});
  }
  handleDelete = (e) => {
    this.props.formHandlers.delete(this.props.inout.id);
  }
  render() {
    let {inout} = this.props;
    let {type} = inout;

    return (
      <Form onSubmit={this.handleSubmit} action="#">
        <ElementSetup type={type} spec={this.state.formState} handleChange={this.handleChange}/>
        <FormGroup id="submit" className="footer">
            <Button type="submit">OK</Button>
            <Button onClick={this.handleDelete}>
              <Glyphicon glyph="trash" />
              Remove
            </Button>
          </FormGroup>
      </Form>
    )
  }
}

export default SideForm;
