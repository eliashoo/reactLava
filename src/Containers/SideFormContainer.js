import SideFormHandler from './SideFormHandler';
import {connect} from 'react-redux';
import {edit_inout,remove_inout}  from '../actions/inout';

const mapStateToProps = (state) => {
  return {
    inout: state.data.currentStage.inouts.find( inout => inout.selected),
  }
}

export default connect(mapStateToProps,{edit_inout,remove_inout})(SideFormHandler);
