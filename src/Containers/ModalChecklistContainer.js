import {connect} from 'react-redux';
import * as todo_actions from '../actions/todos';
import {toggle_checklist} from '../actions/ui';
import Checklist from './Checklist'

const mapStateToProps = (state) => {''
  return {
    show:state.control.showChecklist,
    checks:state.data.todos,
  }
}

export default connect(mapStateToProps,{...todo_actions,toggle_checklist})(Checklist);
