import React,{Component} from 'react';
import {Modal,Button,FormControl,FormGroup,ControlLabel,InputGroup,Checkbox,Glyphicon} from 'react-bootstrap';

let checks = 0;

class Checklist extends Component {
  constructor(props) {
    super(props);
    this.state = { newTodo:'',showModal: false,checks:[] };
  }
  addTodo = (value) => {
    let todos = this.state.checks.concat({name:value,checked:false,id:checks++});
    this.setState({checks:todos});
  }
  handleCheckChange = (e,checkId) => {
    let checks = this.state.checks.slice();
    let check = checks.find( ({id}) => id === checkId);
    check.checked = e.target.checked;
    this.setState({checks:checks});
  }
  handleTodoChange = (e) => {
    this.setState({newTodo:e.target.value});
  }
  handleKeyDown = (e) => {
    if(e.keyCode !== 13 ) {
      return;
    }
    e.preventDefault();
    this.addTodo(e.target.value);
    this.setState({newTodo:''});
  }
  handleRemove = (checkId) => {
    let checks = this.state.checks.slice();
    checks = checks.filter( ({id}) => id !== checkId);
    this.setState({checks:checks});
  }
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.closeChecklist}>
          <Modal.Header closeButton>
            <Modal.Title>Checklist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddCheck addTodo={this.addTodo} handleKeyDown={this.handleKeyDown} handleChange={this.handleTodoChange} newTodo={this.state.newTodo}/>
            <ul className="check-list">
              {this.state.checks.map( ({name,checked,id}) =>
                <Check handleRemove={this.handleRemove} onChange={this.handleCheckChange} key={id} id={id} name={name} checked={checked}/>)}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeChecklist}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
const AddCheck = ({newTodo,handleChange,addTodo,handleKeyDown}) => {
    return (
      <FormGroup controlId="addCheck">
          <FormControl id="addCheck" value={newTodo}
            placeholder="Add todo"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
      </FormGroup>
    )
}

const Check = ({name,checked,id,onChange,handleRemove}) =>  {
  return (
    <li>
      <FormGroup controlId="check" className="check-group">
          <Checkbox className="check-checked" checked={checked} onChange={(e) => { onChange(e,id); }}>
            {name}
          </Checkbox>
          <Button className="remove-check" onClick={() => { handleRemove(id); }}>
            <Glyphicon glyph="trash"/>
          </Button>
      </FormGroup>
    </li>
  )
}
export default Checklist;
