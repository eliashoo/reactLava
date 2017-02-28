import {combineReducers} from 'redux';
import data from './data/data';
import control from './control';
import session from './session';
import communication from './communication';
import * as fromCurrentStage from './data/currentStage';
import * as fromControl from './control'
import * as fromCommunication from './communication'

const rootReducer = combineReducers({data,control,session,communication});

export default rootReducer;

export const getVisibleInouts = (state, filter) => (
  fromCurrentStage.getVisibleInouts(state.data.currentStage,filter)
)
export const getVisibilityFilter = (state) => (
  fromControl.getVisibilityFilter(state.control)
)
export const getSelectedId = (state) => (
  fromCurrentStage.getSelectedId(state.data.currentStage)
)
export const getSelectedElement = (state) => (
  fromControl.getSelectedElement(state.control)
)
export const getStageIsFetching = (state) => (
  fromCommunication.getStageIsFetching(state.communication)
)

export const getSelectedInout = (state) => (
  fromCurrentStage.getSelectedInout(state.data.currentStage)
)
export const getAllInouts = (state) => (
  fromCurrentStage.getAllInouts(state.data.currentStage)
)
