export function add_todo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}

export function remove_todo(id) {
  return {
    type: 'REMOVE_TODO',
    id
  }
}
export function toggle_todo(id) {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
export function edit_todo(id,text) {
  return {
    type: 'EDIT_TODO',
    id,
    text
  }
}
