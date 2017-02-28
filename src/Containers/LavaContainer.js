import { connect } from 'react-redux'

import Lava from '../Components/Lava.js';
import {add_stage} from '../actions/inout';
import {toggle_checklist,edit_stage,show_stages} from '../actions/ui';
import {save_stage} from '../actions/api';

const mapStateToProps = (state) => {
  return {
    showChecklist:state.control.showChecklist,
    saveDisabled:!state.session.loggedIn,
    error:state.communication.stage.error
  }
}

export default connect(mapStateToProps,{toggle_checklist,save_stage,add_stage,edit_stage,show_stages})(Lava);
