import React, { Component } from 'react';

import Lava from './Lava.js';
import Elements from './Elements.js';

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
    e.stopPropagation();

    if(this.state.selected !== null) {
      this.moveTo(this.state.selected, e.clientX-15,e.clientY-12);
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
    const type = this.state.selectedElement;

    // Transform fields to spec
    const spec = Elements[type].fields.reduce( (acc, cur, i) => {
      let {name,type} = cur;
      acc[name] = type === 'checkbox' ? false : '';
      return acc;
    },{});

    const inouts = this.state.inouts.concat(
    {
      id:id,
      left:0, //Set at moveTo
      top:0,
      type:type,
      spec:spec
    });
    let {clientX:x,clientY:y} = e;
    // Offset by width and height of new element
    this.moveTo(id, x-15, y-12, inouts);
    ++id;
  }
  // x, y in viewport coordinates
  moveTo = (id, x, y, newState) => {
    let inouts = newState ? newState : this.state.inouts.slice();

    let state = inouts.find( inout => inout.id === id);

    const {left,top} = this.viewportToDiv(x, y);

    const posPct = this.divToPct(left,top);

    state.left = posPct.left;
    state.top = posPct.top;

    this.setState({inouts});
  }
  handleDelete = (id) => {
    var inouts = this.state.inouts.filter( inout => inout.id !== id);
    this.setState({inouts,selected:null});
  }
  handleSetupSubmit = ({id, formState}) => {
    console.log("submit");
    let inouts = this.state.inouts.slice();
    const idx = inouts.findIndex( inout => inout.id === id);
    inouts[idx].spec = formState;
    this.setState({inouts,selected:null});
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
  handleUploadClick = (type) => {
    if(type === 'upload') {
      this.upload()
    } else {
      this.download();
    }
  }
  forceResizeUpdate = () => {
    this.forceUpdate();
  }
  componentWillMount() {
    //this.download();
    window.addEventListener("resize", this.forceResizeUpdate);
  }
  componentWillUnmount() {
    window.removeEventListener("resize",this.forceResizeUpdate);
  }
  mapPctToDivCoordinates = (inout) => {
    return {...inout,...this.pctToDiv(inout.left,inout.top)}
  }
  render() {
    const formHandlers = {
      submit:this.handleSetupSubmit,
      delete:this.handleDelete
    }
    const stageHandlers = {
      moveTo:this.moveTo,
      handleStageClick:this.handleStageClick,
      setDiv:this.setDiv,
      handleRasiaClick:this.handleRasiaClick
    }
    const addElementProps = {
      handleElementSelect:this.handleElementSelect,
      selectedElement:this.state.selectedElement
    }
    let inouts = this.state.inouts.map(this.mapPctToDivCoordinates)
    return <Lava
      toggle={this.state.toggle}
      inouts={inouts}
      selected={this.state.selected}
      handleModalToggle={this.handleModalToggle}
      stageHandlers={stageHandlers}
      addElementProps={addElementProps}
      formHandlers={formHandlers}
      handleUploadClick={this.handleUploadClick}/>
  }
}
export default LavaContainer;
