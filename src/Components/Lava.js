import React,{Component} from 'react';
import {Col,Grid,Row,Glyphicon,Button,ButtonGroup} from 'react-bootstrap';
import SelectedElement from '../Containers/SelectedElement';
import ModalChecklistContainer from '../Containers/ModalChecklistContainer';
import Stage from '../Containers/Stage';
import SideFormContainer from '../Containers/SideFormContainer';
import VisibilityFilter from '../Components/VisibilityFilter';
import InstructionsContainer from '../Containers/InstructionsContainer';
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
                        title="Download sample config"
                        bsSize="lg"
                        onClick={this.props.fetch_stage}
                      >
                        <Glyphicon glyph="download"/>
                      </Button>
                      <Button
                        title="toggle checklist"
                        bsSize="lg"
                        active={this.props.showChecklist}
                        onClick={this.props.toggle_checklist}
                      >
                        <Glyphicon glyph="list"/>
                      </Button>
                    </ButtonGroup>
                  </Col>
                  <Col xs={12}>
                    <ModalChecklistContainer/>
                  </Col>
                  <Col xs={12}>
                    <SideFormContainer/>
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
