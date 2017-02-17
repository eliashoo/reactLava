import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../App.css';
import LavaContainer from '../Containers/LavaContainer.js';
import {toggle_instructions} from '../actions/actions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <a href="#" onClick={this.props.toggle_instructions}><h1>Stage Map</h1></a>
        </div>
        <LavaContainer/>
      </div>
    );
  }
}

export default connect(null,{toggle_instructions})(App);
