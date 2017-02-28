const initialState = {
  stageNames: {
    fetching:false,
    error:null
  },
  stage: {
    fetching:false,
    error:null
  }
}
export default function communication(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_STAGE_NAMES': {
      return {
        ...state,
        stageNames: {
          fetching:true,
          error:null
        }
      }
    }
    case 'RECEIVE_STAGE_NAMES': {
      return {
        ...state,
        stageNames: {
          fetching:false,
          error:null
        }
      }
    }
    case 'REQUEST_STAGE_NAMES_FAILED': {
      return {
        ...state,
        stageNames: {
          fetching:false,
          error:action.reason
        }
      }
    }
    case 'REQUEST_STAGE': {
      return {
        ...state,
        stage: {
          fetching:true,
          error:null
        }
      }
    }
    case 'RECEIVE_STAGE': {
      return {
        ...state,
        stage: {
          fetching:false,
          error:null
        }
      }
    }
    case 'REQUEST_STAGE_FAILED': {
      return {
        ...state,
        stage: {
          fetching:false,
          error:action.reason
        }
      }
    }
    case 'REQUEST_SAVE_STAGE': {
      return {
        ...state,
        stage: {
          fetching:true,
          error:null
        }
      }
    }
    case 'STAGE_SAVED': {
      return {
        ...state,
        stage: {
          fetching:false,
          error:null
        }
      }
    }
    case 'REQUEST_SAVE_STAGE_FAILED': {
      return {
        ...state,
        stage: {
          fetching:false,
          error:action.reason
        }
      }
    }
    case 'SAVE_STAGE_FAILED':
    return {
      ...state,
      stage: {
        fetching:false,
        error:action.reason,
      }
    }

    default: {
      return state;
    }
  }
}

export const getStageIsFetching = (state) => state.stage.fetching
