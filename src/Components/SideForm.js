import React,{Component} from 'react';

import {Glyphicon,Button,Form,FormGroup} from 'react-bootstrap';

import ElementSetup from './ElementSetup';

class SideForm extends Component {
  render() {
    let {spec,type,handleSubmit,handleDelete,handleChange} = this.props;

    return (
      <Form onSubmit={handleSubmit} action="#">
        <ElementSetup type={type} spec={spec} handleChange={handleChange}/>
        <FormGroup id="submit" className="footer">
            <Button type="submit">OK</Button>
            <Button onClick={handleDelete}>
              <Glyphicon glyph="trash" />
              Remove
            </Button>
          </FormGroup>
      </Form>
    )
  }
}

export default SideForm;
