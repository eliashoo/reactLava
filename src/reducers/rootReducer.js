import {combineReducers} from 'redux';
import data from './data/data';
import control from './control';
import session from './session';
import communication from './communication';

const rootReducer = combineReducers({data,control,session,communication});

export default rootReducer;

// const reducers = combineReducers({
//   inouts,
//   toggleInstructions,
//   selected: selectedElement,
//   visibilityFilter,
//   showChecklist,
//   todos,
//   auth,
//   stages
// });
