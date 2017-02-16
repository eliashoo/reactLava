import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {FormGroup,Radio} from 'react-bootstrap';

 const VisibilityFilter = ({selected,handleChange}) => (
  <FormGroup>
    <Radio inline name="out" onChange={handleChange} checked={selected === "out"}>Out</Radio>
    <Radio inline name="in" onChange={handleChange} checked={selected === "in"}>In</Radio>
    <Radio inline name="all" onChange={handleChange} checked={selected === "all"}>All</Radio>
  </FormGroup>
);

const mapStateToProps = (state) => {
  return {
    selected: state.visibilityFilter,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) => {
      dispatch({
        type:'FILTER',
        filter:e.target.name
      });
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(VisibilityFilter);

VisibilityFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}
