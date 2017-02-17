import React,{Component} from 'react';

import lavaPic from '../../images/lava2.jpg';
import Rasia from '../Components/Rasia';
import {connect} from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import * as inout_actions from '../actions/actions';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

const rasiaTarget = {
  drop(props, monitor, component) {
    let {x,y} = monitor.getClientOffset();
    const {id} = monitor.getItem();
    const {left,top} = component.clientToDivPct(x,y);
    props.move_inout(id, left,top);
  }
};

class Stage extends Component {
  forceResizeUpdate = () => {
    const {left,top,width,height} = this.stage.getBoundingClientRect();
    this.stageRect = {left,top,width,height};
  }
  componentDidMount() {
    window.addEventListener('resize',this.forceResizeUpdate);
  }
  componentWillUnmount() {
    window.addEventListener('resize',this.forceResizeUpdate);
  }
  handleClick = (e) => {

    const {left,top} = this.clientToDivPct(e.clientX,e.clientY);

    const inout = this.props.inouts.find( inout => inout.selected);
    if(inout) {
      this.props.move_inout(inout.id,left,top);
      return;
    }
    if(this.props.selected) {
      const {inouts} = this.props;

      let maxId = Math.max(...inouts.map( inout => inout.id));

      maxId = inouts.length > 0 ? maxId+1 : 0;

      this.props.add_inout(maxId,left,top,this.props.selected);
    }
  }
  clientToDivPct(x,y) {
    const {width,height,left,top} = this.stageRect;
    return {
      left:(x-left)/width,
      top:(y-top)/height
    }
  }

  mapPctToDivCoordinates = (inout) => {
    return {...inout,...this.pctToDiv(inout.left,inout.top)}
  }
  render() {
    let {connectDropTarget,inouts} = this.props;
    return(
      connectDropTarget(
        <div onClick={this.handleClick} className="stage" ref={ (div) => { this.stage = div} } >
          <img  onLoad={this.forceResizeUpdate} src={lavaPic} alt="Stage map"
            style={{opacity:0.5,width:"100%"}}
          />
          {inouts.map( ({id, ...r}) => (
            <Rasia
              handleClick={this.props.select_inout}
              inout={r}
              id={id}
              key={id}/>
            ))}
          </div>
      )
    )
  }
}
const mapStateToProps = (state) => {
    return {
      inouts: state.inouts.filter( inout => inout.type != state.visibilityFilter)
        // inout.type !== {all:'',in:'out',out:'in'}[state.visibilityFilter]
      ,
      selected: state.selected,
    }
}

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps,inout_actions)(DropTarget("RASIA", rasiaTarget, collect)(Stage)));
