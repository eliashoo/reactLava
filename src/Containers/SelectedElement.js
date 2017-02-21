import {connect} from 'react-redux';
import AddElement from '../Components/AddElement';

import * as actions from '../actions/ui';

const mapStateToProps = (state) => {
  return {selectedElementType:state.control.selectedElement}
}

const SelectedElement = connect(mapStateToProps,actions)(AddElement);

export default SelectedElement;
