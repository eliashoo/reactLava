const visibilityFilter = (state = 'all', action) => {
  switch (action.type) {
    case 'FILTER': {
      if(action.filter === state) {
        return 'all';
      }
      return action.filter
    }
    default: {
      return state;
    }
  }
}

export default visibilityFilter;
