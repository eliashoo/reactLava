import React, { Component } from 'react';
import lavaPic from './lava2.jpg';
import Rasia from './Rasia.js';
import {Col,Grid,Row,Glyphicon,Button} from 'react-bootstrap';
import AddElement from './AddElement.js';
import Toggle from './Toggle.js'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { DropTarget } from 'react-dnd';

const rasiaTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset();
    const {id} = monitor.getItem();
    props.moveTo(id,delta.x, delta.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}


const style = {
  marginTop:"3em"
}
class Lava extends Component {

  handleStageClick = (e) => {
    this.props.handleStageClick(e);
  }
  handleRasiaClick = (e,id) => {
    this.props.handleRasiaClick(e,id);
  }
  handleElementSelect = (e) => {
    this.props.handleElementSelect(e);
  }
  handleDelete = (id) => {
    this.props.handleDelete(id);
  }
  handleModalToggle = (e) => {
    this.props.handleModalToggle(e);
  }
  handleUploadClick = (type) => {
    this.props.handleUploadClick(type);
  }
  handleSetupSubmit = (data) => {
    this.props.handleSetupSubmit(data);
  }
  render() {
    const {connectDropTarget} = this.props;
    return (
      connectDropTarget(
        <div onClick={this.handleStageClick}>
          <Grid>
            <Row>
              <Col md={2}>
                  <Row>
                    <Col xs={4} md={12}>
                      <AddElement handleElementSelect={this.handleElementSelect}
                                  left={this.props.clientX}
                                  top={this.props.clientY}
                                  selectedElement={this.props.selectedElement}
                                  show={true}/>
                    </Col>
                    <Col xs={4} md={12}>
                      <Toggle name="open modal"
                              on={this.props.toggle}
                              onToggle={this.handleModalToggle}/>
                    </Col>
                    <Col xs={4} md={12}>
                      <div className="upload">
                        <Button bsSize="xs" onClick={() => this.props.handleUploadClick('upload')}>
                          <Glyphicon glyph="upload"/>
                        </Button>
                        <Button bsSize="xs" onClick={() => this.props.handleUploadClick('download')}>
                          <Glyphicon glyph="download"/>
                        </Button>
                      </div>
                    </Col>
                  </Row>
              </Col>
              <Col md={10} style={style}>
                <div ref={div => this.props.setDiv(div) } >
                  <img  src={lavaPic} alt="Stage map"
                        style={{opacity:0.5,width:"100%"}}/>
                  {this.props.inouts.map( ({id, ...r}) => (
                    <Rasia  handleRasiaClick={this.handleRasiaClick}
                            selected={this.props.selected === id}
                            shoulOpenModal={this.props.toggle}
                            handleDelete={this.handleDelete}
                            {...r}
                            handleSetupSubmit={this.handleSetupSubmit}
                            id={id}
                            key={id}/>
                  ))}
                </div>
              </Col>
            </Row>
          </Grid>
        </div>)
    )
  }
}
export default DragDropContext(HTML5Backend)(
  DropTarget("RASIA", rasiaTarget, collect)(Lava));
