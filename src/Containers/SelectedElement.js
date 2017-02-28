import {connect} from 'react-redux';
import AddElement from '../Components/AddElement';

import * as actions from '../actions/ui';
import {getSelectedElement} from '../reducers/rootReducer';

const mapStateToProps = (state) => {
  return {selectedElementType:getSelectedElement(state)}
}

const SelectedElement = connect(mapStateToProps,actions)(AddElement);

export default SelectedElement;
