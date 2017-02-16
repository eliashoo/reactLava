const selectedElement = (state = '', action) => {
  switch (action.type) {
    case 'ELEMENT_SELECT': {
      return action.selected === state ? '' : action.selected;
    }
    case 'SELECT_INOUT': {
      return '';
    }
    default: {
      return state;
    }
  }
}

export default selectedElement;
