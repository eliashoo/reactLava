import {combineReducers} from 'redux';

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
  if(action.id !== state.id) {
    return state
  }
  switch (action.type) {
    case 'MOVE_INOUT':
      return {
        ...state,
        left:action.left,
        top:action.top,
      }
    case 'EDIT_INOUT':
      return {
        ...state,
        spec:action.spec,
      }
    default:
      return state;
  }
}
const initialState = {
  id:null,
  local:true,
  selectedId:null,
}
const inoutsById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_INOUT':
    case 'MOVE_INOUT':
    case 'EDIT_INOUT':
    return {
      ...state,
      [action.id]:inout(state[action.id],action)
    }
    case 'RECEIVE_STAGE':
    return (
      action.inouts.reduce( (acc, curr) => {
        acc[curr.id] = curr;
        return acc
      },
      {})
    )
    case 'REMOVE_INOUT':
    delete state[action.id]
    default:
    return state
  }
}
const allInoutsById = (state = [], action) => {
  switch(action.type) {
    case 'ADD_INOUT':
    return [...state, action.id]

    case 'REMOVE_INOUT':
    return state.filter( id => id !== action.id)

    case 'RECEIVE_STAGE':
    return action.inouts.map( inout => inout.id)

    case 'ADD_NEW':
    return []

    default:
    return state
  }
}
const currentStageOld = (state = initialState,action) => {
  switch (action.type) {
    case 'SELECT_INOUT':
      return {
        ...state,
        selectedId : state.selectedId === action.id ? null : action.id,
      }
    case 'EDIT_INOUT':
    return {
      ...state,
      selectedId : null,
    }
    case 'ELEMENT_SELECT':
      return {
        ...state,
        selectedId : null,
      }
    case 'RECEIVE_STAGE':
      return {
        id:action.id,
        local:false,
        name:action.name
      }
    case 'LOGGED_OUT':
    case 'ADD_NEW':
      return initialState

    case 'STAGE_NAME_EDIT':
      return {
        ...state,
        name:action.value
      }

    default:
      return state;
  }
}
const currentStage = combineReducers({
  currentStage:currentStageOld,
  inoutsById,
  allInoutsById
});
export default currentStage;

export const getAllInouts = (state) => (
  state.allInoutsById.map( id => state.inoutsById[id] )
)
export const getSelectedInout = (state) => (
  state.currentStage.selectedId !== null && state.inoutsById[state.currentStage.selectedId]
)
export const getVisibleInouts = (state,filter) => (
  getAllInouts(state).filter( inout => inout.type !== filter)
)

export const getSelectedId = (state) => (
  state.currentStage.selectedId
)
