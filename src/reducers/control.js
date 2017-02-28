// toggleInstructions: boolean
// selected: string
// VisibilityFilter: string
// showChecklist: boolean

import {combineReducers} from 'redux';

const selectedElement = (state = '', action) => {
  switch (action.type) {
    case 'ELEMENT_SELECT': {
      return action.selected === state ? '' : action.selected;
    }
    case 'SELECT_INOUT': {
      return '';
    }
    default: {
      return state;
    }
  }
}

const visibilityFilter = (state = 'all', action) => {
  switch (action.type) {
    case 'FILTER': {
      if(action.filter === state) {
        return 'all';
      }
      return action.filter
    }
    default: {
      return state;
    }
  }
}

const showChecklist = (state = false, action) => {
  if(action.type === 'TOGGLE_CHECKLIST') {
    return !state
  }
  return state;
}

const toggleInstructions = (state = false, action) => {
  if(action.type === 'TOGGLE_INSTRUCTIONS') {
    return !state
  }
  return state
}
const editStage = (state = false, action) => {
  if(action.type === 'EDIT_STAGE') {
    return !state
  }
  if(action.type === 'STAGE_NAME_EDIT') {
    return false
  }
  return state
}
const showStageList = (state = false, action) => {
  if(action.type === 'SHOW_STAGES') {
    return !state;
  }
  return state;
}
export default combineReducers(
  {
    selectedElement,
    visibilityFilter,
    showChecklist,
    toggleInstructions,
    editStage,
    showStageList,
  }
);
export const getVisibilityFilter = (state) => state.visibilityFilter
export const getSelectedElement = (state) => state.selectedElement
