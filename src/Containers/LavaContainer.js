import { connect } from 'react-redux'

import Lava from '../Components/Lava.js';

import {toggle_checklist,fetch_stage} from '../actions/actions';

const mapStateToProps = (state) => {
  return {
    showChecklist:state.showChecklist
  }
}

export default connect(mapStateToProps,{toggle_checklist,fetch_stage})(Lava);
