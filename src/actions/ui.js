import {fetch_stage_names} from './api'
export function select_element(type) {
  return {
    type:'ELEMENT_SELECT',
    selected:type
  }
}

export function toggle_checklist() {
  return {
    type:'TOGGLE_CHECKLIST'
  }
}

export function filter(target) {
  return {
    type:'FILTER',
    filter:target
  }
}

export function toggle_instructions() {
  return {
    type:'TOGGLE_INSTRUCTIONS'
  }
}

export function edit_stage() {
  return {
    type:'EDIT_STAGE'
  }
}

export function show_stages() {
  return (dispatch) => {
    dispatch(fetch_stage_names())
    dispatch({type:'SHOW_STAGES'})
  }
}
