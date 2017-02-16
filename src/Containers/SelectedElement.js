import {connect} from 'react-redux';
import AddElement from '../Components/AddElement';

import * as actions from '../actions/actions';

const mapStateToProps = (state) => {
  return {selectedElement:state.selected}
}

const SelectedElement = connect(mapStateToProps,actions)(AddElement);

export default SelectedElement;
