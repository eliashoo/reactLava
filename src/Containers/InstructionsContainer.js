import Instructions from '../Components/Instructions';
import {connect} from 'react-redux';
import {toggle_instructions} from '../actions/actions';

const mapStateToProps = (state) => (
    {
      showInstructions:state.toggleInstructions,
    }
);

export default connect(mapStateToProps,{toggle_instructions})(Instructions);
