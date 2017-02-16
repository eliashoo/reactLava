import React, { Component } from 'react';
import './App.css';
import LavaContainer from './Containers/LavaContainer.js';

var INOUTS = [
  {id: 0, left:850, top:100,type:"out",spec:{name:"mon 3",ch:3}},
  {id: 1, left:100, top:10,type:"box",spec:{name:"1-8,1-2"}},
  {id: 2, left:220, top:50, type:"out",spec:{name:"mon 1",ch:1}},
  {id: 3, left:300, top:200,type:"in",spec:{name:"2",ch:2}},
  {id: 4, left:450, top:300,type:"out",spec:{name:"mon 2",ch:2}},
  {id: 5, left:70, top:250,type:"box",spec:{name:"9-18,3-4",}}
]
class App extends Component {
  constructor() {
    super();
    this.state = {inouts:INOUTS};
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Stage Map</h1>
        </div>
        <LavaContainer inouts={INOUTS} />
      </div>
    );
  }
}

export default App;
