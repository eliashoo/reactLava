export default class ApiService {
  constructor(restEndpoint) {
    this.url = restEndpoint.replace(/\/$/, "");
  }
  _getHeaders() {
    if(this.token) {
      return new Headers({
        Authorization:`Bearer ${this.token}`,
        'Content-Type':'application/json',
      })
    }
    throw new Error("Need valid token");
  }
  _handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }
  setToken(token) {
    this.token = token
  }
  saveNew(data) {
    const headers = this._getHeaders()
    const init = {
      method: 'post',
      headers,
      body:JSON.stringify(data)
    }
    return fetch(this.url, init)
    .then(this._handleErrors);
  }
  update(stageId, data) {
    const headers = this._getHeaders()
    const init = {
      method: 'put',
      headers,
      body:JSON.stringify(data)
    }
    return fetch(`${this.url}/${stageId}`, init)
    .then(this._handleErrors)
  }
  get(stageId) {
    const headers = this._getHeaders()
    const init = {
      method:'get',
      headers
    }
    return fetch(`${this.url}/${stageId}`, init)
    .then(this._handleErrors);
  }
  getAll() {
    const hint =
    {
      $fields:
      {
        name:1,
        _id:1
      }
    };
    const headers = this._getHeaders()
    const init = {
      method:'get',
      headers
    }
    return fetch(`${this.url}?h=${JSON.stringify(hint)}`, init)
    .then(this._handleErrors)
  }
}
