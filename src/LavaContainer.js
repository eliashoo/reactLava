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
      this.moveTo(this.state.selected, e.clientX,e.clientY);
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
  viewportToDiv(x,y) {
    var {left:divLeft,top:divTop} = this.div.getBoundingClientRect();
    const left = (x - divLeft);
    const top = (y - divTop);
    return {left,top}
  }
  divToPct(x,y) {
    var {width,height} = this.div.getBoundingClientRect();
    return {left:x/width,top:y/height}
  }
  pctToDiv(x,y) {
    var {width,height} = this.div.getBoundingClientRect();
    return {left:x*width,top:y*height}
  }
  addNew = (e) => {
    e.stopPropagation();
    const inouts = this.state.inouts.concat(
    {
      id:id,
      left:0, //Set at moveTo
      top:0,
      type:this.state.selectedElement,
      spec:{}
    });
    let {clientX:x,clientY:y} = e;
    // Offset by width and height of new element
    this.moveTo(id, x-15, y-12, inouts);
    ++id;
  }
  handleDelete = (id) => {
    var inouts = this.state.inouts.filter( inout => inout.id !== id);
    this.setState({inouts,selected:null});
  }
  // x, y in viewport coordinates
  moveTo = (id, x, y, newState) => {
    let inouts = newState ? newState : this.state.inouts.slice();

    let state = inouts[inouts.findIndex( inout => inout.id === id)];

    const {left,top} = this.viewportToDiv(x, y);

    const posPct = this.divToPct(left,top);

    state.left = posPct.left;
    state.top = posPct.top;

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
  componentDidMount() {
    window.addEventListener("resize", () => {
      this.forceUpdate();
    });
  }
  mapPctToDivCoordinates = (inout) => {
    return {...inout,...this.pctToDiv(inout.left,inout.top)}
  }
  render() {
    let inouts = this.state.inouts.map(this.mapPctToDivCoordinates)
    return <Lava
      inouts={inouts}
      selected={this.state.selected}
      selectedElement={this.state.selectedElement}
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
