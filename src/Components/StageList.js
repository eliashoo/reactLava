import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {FormControl} from 'react-bootstrap';

export default function StageList({stages,fetch_stage,loading,currentId,editStage,stage_name_edit,show}) {
  if(!show) {
    return null
  }
  if(loading) {
    return <div className="spinner spinner-side"></div>
  }
  if(editStage) {
    const stage = stages.find( stage => stage._id === currentId);
    return <EditStage {...stage} stage_name_edit={stage_name_edit}/>
  }
  if(stages.length === 0) {
    return <strong>No stages available</strong>
  }
  return (
    <ul>
      {stages.map( ({_id:id, name}) => (
        <StageListEntry key={id} id={id} name={name} currentId={currentId} fetch_stage={fetch_stage}/>
      ))}
  </ul>
)
}

function StageListEntry({id,currentId,name,fetch_stage}) {
  const visibleName = name === '' ? 'unnamed' : name
  return (
    <li>
      <a href="#" onClick={(e) => { e.preventDefault(); fetch_stage(id) }}>
        {currentId === id ?
          <strong>{visibleName}</strong> :
          visibleName
        }
      </a>
    </li>
  )
}

class EditStage extends Component {
  keyDown = (e) => {
    if(e.keyCode !== 13) {
      return;
    }
    const value = ReactDOM.findDOMNode(this.i).value;
    this.props.stage_name_edit(value);
  }
  render() {
    const {name} = this.props;
    return (
      <FormControl onKeyDown={this.keyDown} placeholder="Stage name" defaultValue={name} ref={ i => { this.i=i }}/>
    )
  }
}
