const initialState = [];

const stages = (state = initialState, action) => {
  if(action.type === 'RECEIVE_STAGE_NAMES') {
    return action.stages
  }
  if(action.type === 'LOGGED_OUT') {
    return initialState
  }
  return state;
}

export default stages;
