import React,{Component} from 'react';
import {Col,Grid,Row,Glyphicon,Button,ButtonGroup} from 'react-bootstrap';
import SelectedElement from '../Containers/SelectedElement';
import ToggleModal from '../Containers/ToggleModal'
import Checklist from '../Checklist';
import Stage from '../Stage';
import SideFormContainer from '../Containers/SideFormContainer';
import VisibilityFilter from '../VisibilityFilter';

class Lava extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col className="side-bar" md={2}>
              <Row>
                <Col xs={4} md={12}>
                  <SelectedElement/>
                </Col>
                <Col xs={4} md={12}>
                  <VisibilityFilter />
                </Col>
                <Col xs={2} md={12}>
                  <ToggleModal name="open modal"/>
                </Col>
                <Col xs={2} md={12}>
                    <ButtonGroup>
                      {/* <Button title="Upload config(Only works in localhost)" bsSize="lg" onClick={() => this.props.handleUploadClick('upload')}>
                        <Glyphicon glyph="upload"/>
                      </Button> */}
                      <Button
                        title="Download config(Works only in localhost)"
                        bsSize="lg"
                        onClick={this.props.fetch_stage}
                      >
                        <Glyphicon glyph="download"/>
                      </Button>
                      <Button
                        title="toggle checklist"
                        bsSize="lg"
                        onClick={this.props.toggle_checklist}
                      >
                        <Glyphicon glyph="ok"/>
                      </Button>
                    </ButtonGroup>
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
            <Checklist show={this.props.showChecklist} closeChecklist={this.props.toggle_checklist}/>
          </div>
        )

  }
}
export default Lava;
