function events(state = {event: [], singleEvent: {}}, action) {
  switch(action.type) {
    case 'SET_EVENTS' :
      return {event: [...action.response.event], singleEvent: state.singleEvent};
    case 'SET_SINGLE_EVENT' :
      return {event: state.event, singleEvent: action.response.event};
  default:
      return state;
  }
}

export default events;
