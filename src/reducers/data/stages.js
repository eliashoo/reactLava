const initialState = [];

const stages = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_STAGE_NAMES':
    return action.stages

    case 'LOGGED_OUT':
    return initialState

    case 'STAGE_SAVED':
    return [...state.filter( ({_id}) => _id !== action.stage._id),
      {
        name:action.stage.name,
        _id:action.stage._id
      }
    ]

    default:
    return state
  }
}

export default stages;
