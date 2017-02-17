import React,{Component} from 'react';
import {default as ChecklistComponent} from '../Components/Checklist';

class Checklist extends Component {
  constructor(props) {
    super(props);
    this.state = { newTodo:'' };
  }
  addTodo = (value) => {
    this.props.add_todo(value);
    this.setState({
      newTodo:''
    });
  }
  handleCheckChange = (e,checkId) => {
    this.props.toggle_todo(checkId);
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
    this.props.remove_todo(checkId);
  }
  handleCloseChecklist = () => {
    this.props.toggle_checklist();
  }
  render() {
    const props = this.props;
    const {
      addTodo,
      handleCheckChange,
      handleTodoChange,
      handleKeyDown,
      handleRemove,
      handleCloseChecklist
    } = this;
    const {newTodo} = this.state;
    return (
      <ChecklistComponent
        {...props}
        newTodo={newTodo}
        addTodo={addTodo}
        handleCheckChange={handleCheckChange}
        handleTodoChange={handleTodoChange}
        handleKeyDown={handleKeyDown}
        handleRemove={handleRemove}
        handleCloseChecklist={handleCloseChecklist}
      />
    )
  }
}
export default Checklist;
