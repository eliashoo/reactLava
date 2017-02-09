import React, { Component } from 'react';
import lavaPic from './lava2.jpg';
import Rasia from './Rasia.js';
import {Col,Grid,Row,Glyphicon,Button,ButtonGroup,Label} from 'react-bootstrap';
import AddElement from './AddElement.js';
import Toggle from './Toggle.js'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { DropTarget } from 'react-dnd';

const rasiaTarget = {
  drop(props, monitor, component) {
    // x,y in viewport coordinates
    const {x:diffX,y:diffY} = monitor.getDifferenceFromInitialOffset()
    const {x,y} = monitor.getInitialSourceClientOffset();
    const {id} = monitor.getItem();
    props.moveTo(id,x+diffX,y+diffY);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
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
              <Col className="side-bar" md={2}>
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
                        <ButtonGroup>
                          <Button title="Upload config" bsSize="lg" onClick={() => this.props.handleUploadClick('upload')}>
                            <Glyphicon glyph="upload"/>
                          </Button>
                          <Button title="Download config" bsSize="lg" onClick={() => this.props.handleUploadClick('download')}>
                            <Glyphicon glyph="download"/>
                          </Button>
                      </ButtonGroup>
                    </Col>
                    <Col xsHidden>
                      <Label>{this.props.selected}</Label>
                    </Col>
                  </Row>
              </Col>
              <Col md={10}>
                <div style={{position:"relative"}} ref={div => this.props.setDiv(div) } >
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
