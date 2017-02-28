import React from 'react';
import {connect} from 'react-redux';
import StageList from '../Components/StageList';
import {fetch_stage,stage_name_edit} from '../actions/api';

const mapStateToProps = (state) => (
    {
      stages:state.data.stages,
      loading:state.communication.stageNames.fetching,
      currentId:state.data.currentStage.currentStage.id,
      editStage:state.control.editStage,
      show:state.control.showStageList,
    }
)
export default connect(mapStateToProps,{fetch_stage,stage_name_edit})(StageList)
