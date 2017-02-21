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

export function add_stage() {
  return {
    type: 'ADD_NEW'
  }
}
