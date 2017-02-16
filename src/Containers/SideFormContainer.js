import SideFormHandler from './SideFormHandler';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => {
  return {
    inout: state.inouts.find( inout => inout.selected),
  }
}

export default connect(mapStateToProps,actions)(SideFormHandler);
