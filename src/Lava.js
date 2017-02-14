import React,{Component} from 'react';
import {Col,Grid,Row,Glyphicon,Button,ButtonGroup} from 'react-bootstrap';
import AddElement from './AddElement.js';
import Toggle from './Toggle.js'
import Checklist from './Checklist';

import Stage from './Stage';
import SideForm from './SideForm.js';
import VisibilityFilter from './VisibilityFilter';

class Lava extends Component {
  constructor(props) {
    super(props);
    this.state = {showChecklist:false}
  }
  closeChecklist = () => {
    this.setState({showChecklist:false});
  }
  open() {
    this.setState({showChecklist:true});
  }
  render() {
    let inout = (this.props.selected != null) && this.props.inouts.find( (inout) => inout.id === this.props.selected);
    const {addElementProps,toggle,handleModalToggle,
      visibilityFilter,handleVisibilityFilterChange} = this.props;
    return (
      <div>
        <Grid>
          <Row>
            <Col className="side-bar" md={2}>
              <Row>
                <Col xs={4} md={12}>
                  <AddElement {...addElementProps}/>
                </Col>
                <Col xs={4} md={12}>
                  <Toggle name="open modal"
                    on={toggle}
                    onToggle={handleModalToggle}/>
                  </Col>
                  <Col xs={4} md={12}>
                    <ButtonGroup>
                      <Button title="Upload config(Only works in localhost)" bsSize="lg" onClick={() => this.props.handleUploadClick('upload')}>
                        <Glyphicon glyph="upload"/>
                      </Button>
                      <Button title="Download config(Works only in localhost)" bsSize="lg" onClick={() => this.props.handleUploadClick('download')}>
                        <Glyphicon glyph="download"/>
                      </Button>
                      <Button title="toggle checklist" bsSize="lg" onClick={() => this.setState({showChecklist:!this.state.showChecklist})}>
                        <Glyphicon glyph="ok"/>
                      </Button>
                    </ButtonGroup>
                  </Col>
                  <Col xs={3} md={12}>
                    <VisibilityFilter selected={visibilityFilter}
                      handleChange={handleVisibilityFilterChange}/>
                  </Col>
                  <Col xsHidden md={12}>
                    {inout && <SideForm inout={inout} formHandlers={this.props.formHandlers}/>}
                  </Col>
                </Row>
              </Col>
              <Col md={10}>
                <Stage
                  stageProps={this.props.stageProps}
                  selected={this.props.selected}
                  inouts={this.props.inouts}
                  toggle={this.props.toggle}
                  formHandlers={this.props.formHandlers}/>
                </Col>
              </Row>
            </Grid>
            <Checklist show={this.state.showChecklist} closeChecklist={this.closeChecklist}/>
          </div>
        )

  }
}
export default Lava;
