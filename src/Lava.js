import React from 'react';
import {Col,Grid,Row,Glyphicon,Button,ButtonGroup} from 'react-bootstrap';
import AddElement from './AddElement.js';
import Toggle from './Toggle.js'

import Stage from './Stage';
import SideForm from './SideForm.js';

function Lava(props) {

  let inout = (props.selected != null) && props.inouts.find( (inout) => inout.id === props.selected);

  return (
        <div>
          <Grid>
            <Row>
              <Col className="side-bar" md={2}>
                  <Row>
                    <Col xs={4} md={12}>
                      <AddElement {...props.addElementProps}/>
                    </Col>
                    <Col xs={4} md={12}>
                      <Toggle name="open modal"
                              on={props.toggle}
                              onToggle={props.handleModalToggle}/>
                    </Col>
                    <Col xs={4} md={12}>
                        <ButtonGroup>
                          <Button title="Upload config(Only works in localhost)" bsSize="lg" onClick={() => props.handleUploadClick('upload')}>
                            <Glyphicon glyph="upload"/>
                          </Button>
                          <Button title="Download config(Works only in localhost)" bsSize="lg" onClick={() => props.handleUploadClick('download')}>
                            <Glyphicon glyph="download"/>
                          </Button>
                      </ButtonGroup>
                    </Col>
                    <Col xsHidden md={12}>
                      {inout && <SideForm inout={inout} formHandlers={props.formHandlers}/>}
                    </Col>
                  </Row>
              </Col>
              <Col md={10}>
                <Stage
                  stageHandlers={props.stageHandlers}
                  selected={props.selected}
                  inouts={props.inouts}
                  toggle={props.toggle}
                  formHandlers={props.formHandlers}/>
              </Col>
            </Row>
          </Grid>
        </div>
      )
}
export default Lava;
