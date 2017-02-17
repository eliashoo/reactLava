import {fieldsToSpec} from '../Elements';

export function add_inout(id,left,top,type) {
  return {
    type:'ADD_INOUT',
    left,
    top,
    id,
    inoutType:type,
    inoutSpec:fieldsToSpec(type)
  }
}

export function move_inout(id,left,top) {
  return {
    type:'MOVE_INOUT',
    left,
    top,
    id
  }
}

export function select_inout(id) {
  return {
    type:'SELECT_INOUT',
    id
  }
}

export function deselect_inouts() {
  return {
    type:'DESELECT_INOUT',
  }
}

export function remove_inout(id) {
  return {
    type:'REMOVE_INOUT',
    id
  }
}

export function edit_inout(id,spec) {
  return {
    type:'EDIT_INOUT',
    id,
    spec
  }
}

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

export function request_stage(stage) {
  return {
    type: 'REQUEST_STAGE',
    stage
  }
}

export function receive_stage(stage) {
  return {
    type: 'RECEIVE_INOUTS',
    inouts:stage.inouts
  }
}

export function fetch_stage() {
  return dispatch => {
    return fetch('https://stage-8195.restdb.io/rest/stages/58a5daef455247680000169e', {
      headers: {
        'x-apikey':'58a5d5be41e63fcf222c9c4f'
      }
    })
    .then( response => response.json())
    .then(json => dispatch(receive_stage(json.stage)));
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
