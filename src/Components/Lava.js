import React,{Component} from 'react';
import {Col,Grid,Row,Glyphicon,Button,ButtonGroup} from 'react-bootstrap';
import SelectedElement from '../Containers/SelectedElement';
import ModalChecklistContainer from '../Containers/ModalChecklistContainer';
import Stage from '../Containers/Stage';
import SideFormContainer from '../Containers/SideFormContainer';
import VisibilityFilter from '../Components/VisibilityFilter';
import InstructionsContainer from '../Containers/InstructionsContainer';
import Lock from './Lock';
import StageListContainer from '../Containers/StageListContainer';

class Lava extends Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col className="side-bar" md={2}>
              <Row>
                <Col xs={4} md={12}>
                  <SelectedElement/>
                </Col>
                <Col xs={4} md={12}>
                  <VisibilityFilter />
                </Col>
                <Col xs={4} md={12}>
                  <ButtonGroup>
                    <Button
                      title={this.props.saveDisabled ? "You must login to save stage" : "Save"}
                      bsSize="lg"
                      disabled={this.props.saveDisabled}
                      onClick={this.props.save_stage}
                    >
                      <Glyphicon glyph="upload"/>
                    </Button>
                    <Button
                      title="toggle checklist"
                      bsSize="lg"
                      active={this.props.showChecklist}
                      onClick={this.props.toggle_checklist}
                    >
                      <Glyphicon glyph="list"/>
                    </Button>
                    <Button
                      title="Add new stage"
                      bsSize="lg"
                      onClick={this.props.add_stage}
                    >
                      <Glyphicon glyph="plus"/>
                    </Button>

                  </ButtonGroup>
                </Col>
                <Col xs={12}>
                  <ModalChecklistContainer/>
                </Col>
                <Col xs={12}>
                  <SideFormContainer/>
                  <ButtonGroup>
                    <Lock />
                    <Button
                      title="Edit stage name"
                      // bsSize="lg"
                      onClick={this.props.edit_stage}
                    >
                      <Glyphicon glyph="cog"/>
                    </Button>
                    <Button
                      title="Show stages"
                      // bsSize="lg"
                      onClick={this.props.show_stages}
                    >
                      <Glyphicon glyph="list"/>
                    </Button>

                  </ButtonGroup>

                </Col>
                <Col xs={12}>
                  <StageListContainer />
                </Col>

                </Row>
              </Col>
            <Col md={10}>
              <Stage/>
            </Col>
          </Row>
        </Grid>
        <InstructionsContainer/>
      </div>
    )
  }
}
export default Lava;
