import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loggedIn,loggedOut} from '../actions/api.js';
import Auth0Lock from 'auth0-lock';
import {Button,Glyphicon} from 'react-bootstrap';

class Lock extends Component {
  constructor(props) {
    super();
    let clientId = '0RWrxs2EnVmpS9Lol0AyoUSONbwBNF75';
    let domain = 'eliashoo.eu.auth0.com';
    // Instantiate Lock - without custom options
    this.lock = new Auth0Lock(clientId, domain);
    this.lock.on('authenticated', this.doAuthentication);
    if(localStorage.getItem('id_token')) {
      props.loggedIn();
    }
  }
  showLock = () => {
    this.lock.show();
  }
  logout = () => {
    localStorage.removeItem('id_token');
    this.props.loggedOut();
  }
  doAuthentication = (authResult) => {
    console.log(authResult);
    localStorage.setItem('id_token', authResult.idToken);
    this.props.loggedIn();
  }
  render() {
    const method = this.props.authenticated ? this.logout : this.showLock
    return (
      <Button onClick={method} title={this.props.authenticated ? 'Log out' : 'Log in'}>
        <Glyphicon glyph="lock"/>
    </Button>
    )

  }
}
const mapStateToProps = (state) => (
  {
    authenticated:state.session.loggedIn,
  }
)

export default connect(mapStateToProps,{loggedIn,loggedOut})(Lock);
