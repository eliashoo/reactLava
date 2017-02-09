import React,{Component} from 'react';

import {Glyphicon,Button,Form,FormGroup,ButtonGroup,ButtonToolbar} from 'react-bootstrap';

import {BoxSetup} from './Box.js';
import {InSetup} from './In.js';
import {OutSetup} from './Out.js';

class SideForm extends Component {
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
  componentWillReceiveProps(nextProps) {
    this.setState({formState:nextProps.spec});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = this.props.id;
    const {formState} = this.state;
    this.props.onSubmit({id,formState});
  }
  handleDelete = (e) => {
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
      <Form onSubmit={this.handleSubmit} action="#">
        <Setup {...this.state.formState} handleChange={this.handleChange}/>
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
