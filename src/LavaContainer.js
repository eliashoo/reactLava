import React, { Component } from 'react';

import Lava from './Lava.js';

var id = 0;
class LavaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inouts:[],
      show:false,
      clientX:0,
      clientY:0,
      selected:null,
      showAddElement:false,
      selectedElement:null,
      toggle:false
    };
  }
  setDiv = (div) => {
    this.div = div;
  }
  handleStageClick = (e) => {
    if(this.state.selected !== null) {
      var {width,height} = this.div.getBoundingClientRect();
      const divLeft = this.div.getBoundingClientRect().left;
      const divTop = this.div.getBoundingClientRect().top;
      const idx = this.state.inouts.findIndex( inout => inout.id === this.state.selected);
      let {left,top} = this.state.inouts[idx];
      left *= width;
      top *= height;
      this.moveTo(this.state.selected, e.clientX-divLeft-left,e.clientY-divTop-top);
      return;
    }
    if(this.state.selectedElement !== null) {
      this.addNew(e);
      return;
    }
    this.setState({
      showAddElement:!this.state.showAddElement,
      clientX:e.clientX,
      clientY:e.clientY});
  }
  handleRasiaClick = (e,id) => {
    e.stopPropagation();
    if(id === this.state.selected) {
      this.setState({selected:null});
    } else {
      this.setState({selected:id});
    }
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
  addNew = (e) => {
    e.stopPropagation();
    var inouts = this.state.inouts.slice();
    var {left,top,width,height} = this.div.getBoundingClientRect();
    left = (e.clientX - left)/width;
    top = (e.clientY - top)/height;
    inouts.push({
      id:id++,
      left:left,
      top:top,
      type:this.state.selectedElement,
      spec:{}
    });
    this.setState({inouts,showAddElement:false});
  }
  handleDelete = (id) => {
    var inouts = this.state.inouts.filter( inout => inout.id !== id);
    this.setState({inouts,selected:null});
  }
  moveTo = (id, dx, dy) => {
    let inouts = this.state.inouts.slice();
    const idx = inouts.findIndex( inout => inout.id === id);
    const {width,height} = this.div.getBoundingClientRect();
    const {left,top} = inouts[idx];
    inouts[idx].left = left+dx/width;
    inouts[idx].top = top+dy/height;
    this.setState({inouts});
  }
  handleSetupSubmit = ({id, formState}) => {
    let inouts = this.state.inouts.slice();
    const idx = inouts.findIndex( inout => inout.id === id);
    inouts[idx].spec = formState;
    this.setState({inouts});
  }
  upload() {
    fetch('/upload', {
      method:"post",
      body:JSON.stringify(this.state),
    }).then( (response) => {
        console.log("response OK");
    });
    console.log("upload");
  }
  download() {
    fetch('/download').then( (response) => {
        response.json().then( (state) => {
          this.setState(state);
        });
    });
  }
  handleUploadClick = (type) => {
    if(type === 'upload') {
      this.upload()
    } else {
      this.download();
    }
  }
  render() {
    return <Lava {...this.state}
      handleModalToggle={this.handleModalToggle}
      moveTo={this.moveTo}
      handleStageClick={this.handleStageClick}
      setDiv={this.setDiv}
      handleElementSelect={this.handleElementSelect}
      handleRasiaClick={this.handleRasiaClick}
      handleDelete={this.handleDelete}
      handleUploadClick={this.handleUploadClick}
      handleSetupSubmit={this.handleSetupSubmit} />
  }
}
export default LavaContainer;
