import React,{PropTypes} from 'react';
import {FormGroup,Radio} from 'react-bootstrap';

 const VisibilityFilter = ({selected,handleChange}) => (
  <FormGroup>
    <Radio name="out" onChange={handleChange} checked={selected === "out"}>Outputs</Radio>
    <Radio name="in" onChange={handleChange} checked={selected === "in"}>Inputs</Radio>
    <Radio name="all" onChange={handleChange} checked={selected === "all"}>All</Radio>
  </FormGroup>
);

export default VisibilityFilter;

VisibilityFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}
