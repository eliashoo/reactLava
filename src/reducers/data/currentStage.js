const inout = (state = {},action) => {
  if(action.type == 'ADD_INOUT') {
    return {
      id:action.id,
      left:action.left,
      top:action.top,
      type:action.inoutType,
      spec:action.inoutSpec
    }
  }
  if(action.type !== 'SELECT_INOUT' && action.id !== state.id) {
    return state
  }
  switch (action.type) {
    case 'ELEMENT_SELECT':
    case 'DESELECT_INOUT': {
      return {
        ...state,
        selected:false
      }
    }
    case 'MOVE_INOUT': {
      return {
        ...state,
        left:action.left,
        top:action.top,
      }
    }
    case 'SELECT_INOUT': {
      return {
        ...state,
        selected: action.id === state.id ? !state.selected : false
      }
    }
    case 'EDIT_INOUT': {
      return {
        ...state,
        selected:false,
        spec:action.spec,
      }
    }
    default: {
      return state;
    }
  }
}
const initialState = {
  id:null,
  local:true,
  inouts:[]
}
const currentStage = (state = initialState,action) => {
  switch (action.type) {
    case 'ADD_INOUT': {
      return {
        ...state,
        inouts:state.inouts.concat(inout(undefined, action))
      }
    }
    case 'ELEMENT_SELECT':
    case 'MOVE_INOUT':
    case 'SELECT_INOUT':
    case 'EDIT_INOUT':
    case 'DESELECT_INOUT': {
      return {
        ...state,
        inouts:state.inouts.map( i => inout(i, action))
      }
    }
    case 'REMOVE_INOUT': {
      return {
        ...state,
        inouts:state.inouts.filter( inout => inout.id !== action.id)
      }
    }
    case 'RECEIVE_STAGE': {
      return {
        id:action.id,
        inouts:action.inouts,
        local:false,
        name:action.name
      }
    }
    case 'LOGGED_OUT':
    case 'ADD_NEW': {
      return initialState
    }
    case 'STAGE_NAME_EDIT': {
      return {
        ...state,
        name:action.value
      }
    }
    default: {
      return state;
    }
  }
}
export default currentStage;
