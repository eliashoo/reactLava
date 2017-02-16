import {connect} from 'react-redux';
import Toggle from '../Components/Toggle';

const mapStateToProps = (state) => {
  return {
    on:state.toggle
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onToggle: () => {
      dispatch({
        type:'TOGGLE_MODAL'
      });
    }
  }
}
const ToggleModal = connect(mapStateToProps,mapDispatchToProps)(Toggle);
export default ToggleModal;
