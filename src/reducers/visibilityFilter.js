const visibilityFilter = (state = 'all', action) => {
  switch (action.type) {
    case 'FILTER': {
      return action.filter;
    }
    default: {
      return state;
    }
  }
}

export default visibilityFilter;
