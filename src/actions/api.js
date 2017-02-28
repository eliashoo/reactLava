import {getAllInouts} from '../reducers/rootReducer'

export function request_stage_names() {
  return {
    type: 'REQUEST_STAGE_NAMES'
    }
}

function receive_stage(data) {
  return {
    type: 'RECEIVE_STAGE',
    inouts:data.stage.inouts || [],
    id:data._id,
    name:data.name
  }
}

export function fetch_stage(id) {
  return (dispatch, getState,{apiService}) => {
    dispatch(request_stage());
    return (
      apiService.get(id)
      .then( response => response.json()
        .then( json => dispatch( receive_stage(json))))
      .catch( ({message}) => dispatch(stages_request_failed(message)))
    )
  }
}
export function fetch_stage_names() {
  return (dispatch,getState,{apiService}) => {
    dispatch(request_stage_names())
    return (
      apiService.getAll()
      .then( response => response.json())
      .then( json => dispatch( receive_stage_names(json)))
      .catch( ({message}) => dispatch(stages_request_failed(message)))
    )
  }
}
export function save_stage() {
  return (dispatch, getState,{apiService}) => {
    if(!getState().session.loggedIn) {
      return dispatch(save_stage_failed('NO LOGGED IN'));
    }
    const currentStage = getState().data.currentStage;
    const {local} = currentStage.currentStage;
    dispatch(request_save_stage());

    const action = local ? save_new_stage({currentStage}) :
            save_stage_changes({currentStage})

    dispatch(action)
    .then( stage => dispatch(stage_saved(stage)))
    .catch( ({message}) => dispatch(save_stage_failed(message)))
  }
}
function save_stage_changes({currentStage}) {
  return (dispatch,getState,{apiService}) => {

    const inouts = getAllInouts(getState())

    const {id,name} = currentStage.currentStage;

    const body = {
      stage:{
        inouts
      },
      name
    }

    return apiService.update(id,body)
    .then( response => response.json())
  }
}
function save_new_stage({currentStage}) {
  return (dispatch,getState,{apiService}) => {
    const {inoutsById,allInoutsById} = currentStage
    const inouts = getAllInouts(getState())
    const body = {
      stage:{
        inouts
      },
      name:inouts.length
    }
    return apiService.saveNew(body)
    .then( response => response.json())
  }
}
function stage_saved(stage) {
  return {
    type: 'STAGE_SAVED',
    stage
  }
}
function request_stage() {
  return {
    type:'REQUEST_STAGE'
  }
}
function request_save_stage() {
  return {
    type:'REQUEST_SAVE_STAGE'
  }
}

function stages_request_failed(reason) {
  return {
    type:'REQUEST_STAGE_NAMES_FAILED',
    reason
  }
}
function stage_request_failed(reason) {
  return {
    type:'REQUEST_STAGE_FAILED',
    reason
  }
}
function receive_stage_names(json) {
    return {
      type:'RECEIVE_STAGE_NAMES',
      stages:json
    }
}

function save_stage_failed(reason) {
  return {
    type:'SAVE_STAGE_FAILED',
    reason
  }
}
export function stage_name_edit(value) {
  return (dispatch) => {
    dispatch({
      type:'STAGE_NAME_EDIT',
      value,
    });
    dispatch(save_stage())
  }
}
export function loggedIn(token) {
  return (dispatch,getState,{apiService}) => {
    dispatch({type:'LOGGED_IN'});
    apiService.setToken(token)
    dispatch(fetch_stage_names());
  }
}
export function loggedOut() {
  return (dispatch,_,{apiService}) => {
    apiService.setToken(null)
    dispatch({type:'LOGGED_OUT'});
  }
}
