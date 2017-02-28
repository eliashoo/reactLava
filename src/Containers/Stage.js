import React,{Component} from 'react';

import lavaPic from '../../images/lava2.jpg';
import Rasia from '../Components/Rasia';
import {connect} from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import DraggableComponent from '../Components/DraggableComponent'
import ComponentAdjuster from '../Components/ComponentAdjuster'
import {add_inout,move_inout,select_inout} from '../actions/inout';
import {getVisibleInouts,getVisibilityFilter,getSelectedId,getSelectedElement,getStageIsFetching}  from '../reducers/rootReducer';

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
  handleClick = (e) => {

    const {left,top} = this.clientToDivPct(e.clientX,e.clientY);

    if(this.props.selectedId !== null) {
      this.props.move_inout(this.props.selectedId,left,top);
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
    const {left,top,width,height} = this.stage.getBoundingClientRect();
    return {
      left:(x-left)/width,
      top:(y-top)/height
    }
  }

  mapPctToDivCoordinates = (inout) => {
    return {...inout,...this.pctToDiv(inout.left,inout.top)}
  }

  handleMove = (id) => (x,y) => {
    const {left,top} = this.clientToDivPct(x,y)
    this.props.moveTo(id,left,top)
  }

  handleRasiaClick = (id) => (e) => { e.stopPropagation(); this.props.select_inout(id) }

  render() {
    let {loading,connectDropTarget,inouts} = this.props;
    let className = loading && 'loading'
    return(
      <div>
        {connectDropTarget(
          <div onClick={this.handleClick} className={className} ref={ (div) => { this.stage = div} } >
            <img  src={lavaPic} alt="Stage map"
              style={{opacity:0.5,width:"100%"}}
            />
            {inouts.map( ({id, left,top,...r}) => (
              <ComponentAdjuster left={left} top={top} key={id}>
                <DraggableComponent id={id}  hideWhenDrag>
                  <Rasia
                    selected={id === this.props.selectedId}
                    handleClick={this.handleRasiaClick(id)}
                    inout={r}
                  />
                </DraggableComponent>
              </ComponentAdjuster>
              ))
            }
          </div>
        )}
        {loading && <div className="spinner spinner-stage"></div>}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
    return {
      inouts: getVisibleInouts(state,getVisibilityFilter(state)),
      selectedId: getSelectedId(state),
      selected: getSelectedElement(state),
      loading: getStageIsFetching(state),
    }
}

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps,{add_inout,move_inout,select_inout})(DropTarget("RASIA", rasiaTarget, collect)(Stage)));
