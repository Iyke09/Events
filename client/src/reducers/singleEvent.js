function singleEvent(state = {}, action) {
  switch(action.type) {
    case 'SET_SINGLE_EVENT' :
      return action.response.event;
  default:
      return state;
  }
}

export default singleEvent;
