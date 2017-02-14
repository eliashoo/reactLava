import React, { Component } from 'react';

import Lava from './Lava.js';
import {fieldsToSpec} from './Elements.js';

var id = 0;
class LavaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inouts:[],
      show:false,
      selected:null,
      selectedElement:null,
      toggle:false,
      visibilityFilter:'all',
      stage:{
        width:0,
        height:0,
        left:0,
        top:0
      }
    };
  }
  handleStageClick = ({left,top}) => {
    console.log(left,top);
    if(this.state.selected !== null) {
      this.moveTo(this.state.selected, left,top);
      return;
    }
    if(this.state.selectedElement !== null) {
      this.addNew(left,top);
      return;
    }
  }
  handleRasiaClick = (id) => {
    if(id === this.state.selected) {
      this.setState({selected:null});
    } else {
      this.setState({selected:id});
    }
    this.setState({selectedElement:null});
  }
  handleElementSelect = (e) => {
    e.stopPropagation();
    this.setState({selected:null});
    if(this.state.selectedElement !== null) {
      if(e.currentTarget.name === this.state.selectedElement) {
        this.setState({selectedElement:null});
        return;
      }
    }
    this.setState({selectedElement:e.currentTarget.name});
  }
  handleModalToggle = (e) => {
    e.stopPropagation();
    this.setState({toggle:!this.state.toggle});
  }
  handleDelete = (id) => {
    var inouts = this.state.inouts.filter( inout => inout.id !== id);
    this.setState({inouts,selected:null});
  }
  handleSetupSubmit = ({id, formState}) => {
    console.log("submit");
    let inouts = this.state.inouts.slice();
    let  inout = inouts.find( inout => inout.id === id);
    inout.spec = formState;
    this.setState({inouts,selected:null});
  }
  handleVisibilityFilterChange = (e) => {
    this.setState({visibilityFilter:e.target.name});
  }
  handleUploadClick = (type) => {
    type === 'upload' ? this.upload() : this.download();
  }
  handleForceUpdate = () => {
    this.forceUpdate();
  }
  handleStageChange = ({left,top,width,height}) => {
    this.setState({stage:{left,top,width,height}});
  }
  addNew = (x,y) => {
    const type = this.state.selectedElement;

    // Transform fields to spec
    const spec = fieldsToSpec(type);

    const inouts = this.state.inouts.concat(
    {
      id:id,
      left:0, //To be set at moveTo
      top:0,
      type:type,
      spec:spec
    });
    this.moveTo(id, x, y, inouts);
    ++id;
  }
  moveTo = (id, x, y, newState) => {
    let inouts = newState ? newState : this.state.inouts.slice();

    let state = inouts.find( inout => inout.id === id);

    state.left = x;
    state.top = y;

    this.setState({inouts});
  }
  upload() {
    const stateString = JSON.stringify(this.state);
    fetch('/upload', {
      method:"post",
      body:stateString
    }).then( (response) => {
        console.log("response OK");
        if(response.code !== 200) {
          window.alert("Upload failed. Saved to localStorage");
          window.localStorage.setItem('state', JSON.stringify(this.state));
        }
    });
    console.log("upload");
  }
  download() {
    fetch('/download').then( (response) => {
      let state = null;
      if(response.code === 200) {
        state = response.text().then( (state) => state);
      } else {
        alert("Download failed. Loaded from localStorage");
        state = window.localStorage.getItem('state')
      }
      if(state) {
        state = JSON.parse(state);
        state = {...state, selected:null, selectedElement:null}
        this.setState(state);
      }
    });
  }

  render() {
    const formHandlers = {
      submit:this.handleSetupSubmit,
      delete:this.handleDelete
    }
    const stageProps = {
      moveTo:this.moveTo,
      handleStageClick:this.handleStageClick,
      setDiv:this.setDiv,
      handleRasiaClick:this.handleRasiaClick,
      handleStageChange:this.handleStageChange,
      stage:this.state.stage,
    }
    const addElementProps = {
      handleElementSelect:this.handleElementSelect,
      selectedElement:this.state.selectedElement
    }
    let inouts = this.state.inouts
      .filter( (el) => (
        el.type !== {all:'',in:'out',out:'in'}[this.state.visibilityFilter]
      ));
    return <Lava
      visibilityFilter={this.state.visibilityFilter}
      handleVisibilityFilterChange={this.handleVisibilityFilterChange}
      toggle={this.state.toggle}
      inouts={inouts}
      selected={this.state.selected}
      handleModalToggle={this.handleModalToggle}
      stageProps={stageProps}
      addElementProps={addElementProps}
      formHandlers={formHandlers}
      handleUploadClick={this.handleUploadClick}/>
  }
}
export default LavaContainer;
