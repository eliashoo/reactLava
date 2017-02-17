import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {ControlLabel} from 'react-bootstrap';
import {filter} from '../actions/actions';

 const VisibilityFilter = ({selected,filter}) => {
    const fields = ['in','out'];
    return (
      <div>
        <ControlLabel>Hide</ControlLabel>
      {fields.map( field => (
        <a key={field}
          className={`filter-link${selected===field ? ' selected' : ''}`}
          name={field}
          onClick={(e) => filter(e.target.name)}
          href="#">{field}
        </a>
      ))}
    </div>
    )
}

const mapStateToProps = (state) => {
  return {
    selected: state.visibilityFilter,
  }
}
export default connect(mapStateToProps,{filter})(VisibilityFilter);

VisibilityFilter.propTypes = {
  filter: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}
