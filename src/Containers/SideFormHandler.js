import React,{Component} from 'react';

import SideForm from '../Components/SideForm';

class SideFormHandler extends Component {
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
    const {formState:spec} = this.state;
    this.props.edit_inout(id,spec);
  }
  handleDelete = (e) => {
    this.props.remove_inout(this.props.inout.id);
  }
  render() {
    if(!this.props.inout) {
      return null;
    }
    let {type} = this.props.inout;

    return (
      <SideForm handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        handleChange={this.handleChange}
        spec={this.state.formState}
        type={type}
      />
    )
  }
}
export default SideFormHandler;
