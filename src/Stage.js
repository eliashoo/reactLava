import React,{PropTypes} from 'react';

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
    const {x:diffX,y:diffY} = monitor.getDifferenceFromInitialOffset()
    const {x,y} = monitor.getInitialSourceClientOffset();
    const {id} = monitor.getItem();
    props.stageHandlers.moveTo(id,x+diffX,y+diffY);
  }
};

function Stage(props) {
  let {connectDropTarget} = props;

  return(
    connectDropTarget(
      <div onClick={props.stageHandlers.handleStageClick} style={{position:"relative"}} ref={div => props.stageHandlers.setDiv(div) } >
        <img  src={lavaPic} alt="Stage map"
              style={{opacity:0.5,width:"100%"}}/>
        {props.inouts.map( ({id, ...r}) => (
          <Rasia  handleRasiaClick={props.stageHandlers.handleRasiaClick}
                  selected={props.selected === id}
                  shoulOpenModal={props.toggle}
                  formHandlers={props.formHandlers}
                  inout={r}
                  id={id}
                  key={id}/>
        ))}
      </div>
    )
  )
}
export default DragDropContext(HTML5Backend)(
  DropTarget("RASIA", rasiaTarget, collect)(Stage));

Stage.propTypes = {
  stageHandlers: PropTypes.objectOf(PropTypes.func) //{
    //handleStageClick: PropTypes.func.isRequired,
    //moveTo: PropTypes.func.isRequired
  //}
}
