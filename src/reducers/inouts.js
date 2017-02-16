const inout = (state = {},action) => {
  switch (action.type) {
    case 'ADD_INOUT': {
      return {
        id:action.id,
        left:action.left,
        top:action.top,
        type:action.inoutType,
        spec:action.inoutSpec
      }
    }
    case 'DESELECT_INOUT': {
      return {
        ...state,
        selected:false
      }
    }
    case 'MOVE_INOUT': {
      if(state.id !== action.id) {
        return state
      }
      return {
        ...state,
        left:action.left,
        top:action.top,
      }
    }
    case 'SELECT_INOUT': {
      if(state.id !== action.id) {
        return {
          ...state,
          selected:false
        }
      }
      return {
        ...state,
        selected:!state.selected
      }
    }
    case 'EDIT_INOUT': {
      if(state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        spec:action.spec,
      }
    }
    default: {
      return state;
    }
  }
}
const inouts = (state = [],action) => {
    switch (action.type) {
      case 'ADD_INOUT': {
        return [
          ...state,
          inout(undefined, action)
        ]
      }
      case 'DESELECT_INOUT': {
        return state.map( i => inout(i, action));
      }
      case 'MOVE_INOUT': {
        return state.map( i => inout(i, action));
      }
      case 'SELECT_INOUT': {
        return state.map( i => inout(i, action));
      }
      case 'EDIT_INOUT': {
        return state.map( i => inout(i, action));
      }
      case 'REMOVE_INOUT': {
        return (
          state.filter( inout => inout.id !== action.id)
        )
      }
      case 'RECEIVE_INOUTS': {
        return (
          action.inouts
        )
      }
      default: {
        return state;
      }
    }
}
export default inouts;
