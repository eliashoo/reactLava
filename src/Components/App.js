import React, { Component } from 'react';
import '../App.css';
import LavaContainer from '../Containers/LavaContainer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Stage Map</h1>
        </div>
        <LavaContainer/>
      </div>
    );
  }
}

export default App;
