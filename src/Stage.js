import React,{PropTypes,Component} from 'react';

import lavaPic from './lava2.jpg';
import Rasia from './Rasia';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { DropTarget } from 'react-dnd';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

const rasiaTarget = {
  drop(props, monitor, component) {
    // x,y in viewport coordinates
    const {x,y} = monitor.getSourceClientOffset();
    const {id} = monitor.getItem();

    let left = x-props.stageProps.stage.left;
    let top = y-props.stageProps.stage.top;
    const divToPct = (x,y) => {
      const {width,height} = props.stageProps.stage;
      return {left:x/width,top:y/height}
    }
    const {left:leftPct,top:topPct} = divToPct(left,top);
    props.stageProps.moveTo(id,leftPct,topPct);
  }
};

class Stage extends Component {
  forceResizeUpdate = () => {
    this.props.stageProps.handleStageChange(this.stage.getBoundingClientRect());
  }
  componentDidMount() {
    window.addEventListener("resize", this.forceResizeUpdate);
  }
  componentWillUnmount() {
    window.removeEventListener("resize",this.forceResizeUpdate);
  }
  handleClick = (e) => {
    const {left,top} = this.props.stageProps.stage;
    this.props.stageProps.handleStageClick(this.divToPct(
      e.pageX-left,
      e.pageY-top
    ));
  }
  divToPct(x,y) {
    const {width,height} = this.props.stageProps.stage;
    return {left:x/width,top:y/height}
  }
  pctToDiv(x,y) {
    const {width,height} = this.props.stageProps.stage;
    return {left:x*width,top:y*height}
  }
  mapPctToDivCoordinates = (inout) => {
    return {...inout,...this.pctToDiv(inout.left,inout.top)}
  }
  render() {
    let {connectDropTarget,stageProps,inouts,selected,toggle,formHandlers} = this.props;
    inouts = inouts.map(this.mapPctToDivCoordinates)
    return(
      connectDropTarget(
        <div onClick={this.handleClick} style={{position:"relative"}} ref={ (div) => {this.stage = div} } >
          <img  onLoad={this.forceResizeUpdate} src={lavaPic} alt="Stage map"
            style={{opacity:0.5,width:"100%"}}/>
            {inouts.map( ({id, ...r}) => (
              <Rasia  handleRasiaClick={stageProps.handleRasiaClick}
                selected={selected === id}
                shoulOpenModal={toggle}
                formHandlers={formHandlers}
                inout={r}
                id={id}
                key={id}/>
              ))}
            </div>
          )
        )
  }
}
export default DragDropContext(HTML5Backend)(
  DropTarget("RASIA", rasiaTarget, collect)(Stage));
