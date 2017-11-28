function events(state = [], action) {
  switch(action.type) {
    case 'SET_EVENTS' :
      return [...action.response.event];
  default:
      return state;
  }
}

export default events;
