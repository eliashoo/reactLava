import React from 'react';
import {Button,FormControl,FormGroup,Checkbox,Glyphicon} from 'react-bootstrap';

export default function Checklist({
  show,
  handleCloseChecklist,
  addTodo,
  handleKeyDown,
  handleTodoChange,
  newTodo,
  checks,
  handleRemove,
  handleCheckChange
}) {
  if(!show) {
    return null;
  }
  return (
    <div>
          <AddCheck addTodo={addTodo} handleKeyDown={handleKeyDown} handleChange={handleTodoChange} newTodo={newTodo}/>
          <ul className="check-list">
            {checks.map( ({text,completed,id}) =>
              <Check handleRemove={handleRemove} onChange={handleCheckChange} key={id} id={id} text={text} completed={completed}/>)}
          </ul>
    </div>
  );
}
const AddCheck = ({newTodo,handleChange,addTodo,handleKeyDown}) => {
    return (
      <FormGroup controlId="addCheck">
          <FormControl id="addCheck"
            value={newTodo}
            placeholder="Add todo"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
      </FormGroup>
    )
}

const Check = ({text,completed,id,onChange,handleRemove}) =>  {
  return (
    <li>
      <FormGroup controlId="check" className="check-group">
          <Checkbox className="check-checked" checked={completed} onChange={(e) => { onChange(e,id); }}>
            {text}
          </Checkbox>
          <Button className="remove-check" onClick={() => { handleRemove(id); }}>
            <Glyphicon glyph="trash"/>
          </Button>
      </FormGroup>
    </li>
  )
}
