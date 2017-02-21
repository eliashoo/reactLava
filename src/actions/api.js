export function request_stage_names() {
  return {
    type: 'REQUEST_STAGE_NAMES'
    }
}

function receive_stage(data) {
  return {
    type: 'RECEIVE_STAGE',
    inouts:data.stage.inouts,
    id:data._id,
    name:data.name
  }
}

export function fetch_stage(id) {
  return (dispatch, getState) => {
    if(!getState().session.loggedIn) {
      dispatch(stage_request_failed('NO LOGGED IN'));
      return;
    }
    dispatch(request_stage());
    const token = localStorage.getItem('id_token');
    const init = {
      headers: new Headers({
        Authorization:`Bearer ${token}`
      }),
      method:'get'
    }
    return fetch(`https://stage-8195.restdb.io/rest/stages/${id}`, init)
    .then( response => {
      if(response.ok) return response.json()

      throw Error('Request failed');
    })
    .then(data => dispatch(receive_stage(data)))
    .catch( error => dispatch(stage_request_failed(error.message)));
  }
}
export function fetch_stage_names() {
  return (dispatch,getState) => {
    if(!getState().session.loggedIn) {
      return dispatch(stages_request_failed('NO LOGGED IN'));
    }
    dispatch(request_stage_names());
    return get_stage_names()
    .then( response => {
      if(response.ok) return response.json()
      throw Error('Network error');
    })
    .then(json => dispatch(receive_stage_names(json)))
    .catch( error => dispatch(stages_request_failed(error.message)));
  }
}
function get_stage_names() {
  const token = localStorage.getItem('id_token');

  const restUrl = "https://stage-8195.restdb.io/rest/stages";
  const hint =
  {
    $fields:
    {
      name:1,
      _id:1
    }
  };
  const headers = new Headers({
    Authorization:`Bearer ${token}`
  })
  const init = {
    method:'get',
    headers
  }
  return fetch(`${restUrl}?h=${JSON.stringify(hint)}`, init);
}
export function save_stage() {
  return (dispatch, getState) => {
    if(!getState().session.loggedIn) {
      return dispatch(save_stage_failed('NO LOGGED IN'));
    }
    const currentStage = getState().data.currentStage;
    const {local} = currentStage;
    dispatch(request_save_stage());
    if(local) {
      return dispatch(save_new_stage({currentStage}));
    } else {
      return dispatch(save_stage_changes({currentStage}));
    }
  }
}
function send_stage(restUrl,method,body,id) {
  const token = localStorage.getItem('id_token');
  let headers = new Headers({
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`,
  });
  const init = {
    method: method,
    headers,
    body:JSON.stringify(body)
  }
  return fetch(`${restUrl}${id || ''}`, init);
}
function save_stage_changes({currentStage}) {
  return (dispatch) => {
    const restUrl = "https://stage-8195.restdb.io/rest/stages/";
    const {id,inouts,local,name} = currentStage;
    const body = {
      stage:{
        inouts
      },
      name
    }
    return send_stage(restUrl, 'put', body,id)
    .then( (response) => {
      if(response.ok) return dispatch(stage_saved())
      throw new Error('Network error');
    }).catch( error => { return dispatch(save_stage_failed(error.message)) });
  }
}
function save_new_stage({currentStage}) {
  return (dispatch) => {
    const restUrl = "https://stage-8195.restdb.io/rest/stages";
    const {id,inouts,local} = currentStage;
    const body = {
      stage:{
        inouts
      },
      name:inouts.length
    }
    return send_stage(restUrl, 'post', body)
    .then( (response) => {
      if(response.ok) return dispatch(stage_saved())
      throw new Error('Network error');
    }).catch( error => { dispatch(save_stage_failed(error.message)) });
  }
}
function stage_saved() {
  return {
    type: 'STAGE_SAVED',
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
    dispatch(save_stage()).then( () => {
      dispatch(fetch_stage_names());
    });
  }
}
export function loggedIn() {
  return (dispatch) => {
    dispatch({type:'LOGGED_IN'});
    dispatch(fetch_stage_names());
  }
}
export function loggedOut() {
  return (dispatch) => {
    dispatch({type:'LOGGED_OUT'});
  }
}
