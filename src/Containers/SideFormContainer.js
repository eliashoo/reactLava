import SideFormHandler from './SideFormHandler';
import {connect} from 'react-redux';
import {edit_inout,remove_inout}  from '../actions/inout';
import {getSelectedInout} from '../reducers/rootReducer'

const mapStateToProps = (state) => {
  return {
    inout: getSelectedInout(state)
    // inout: state.data.currentStage.inouts.find( inout => inout.selected),
  }
}

export default connect(mapStateToProps,{edit_inout,remove_inout})(SideFormHandler);
