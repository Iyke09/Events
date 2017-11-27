function success(state = '', action) {
  switch(action.type) {
    case 'SUCCESS' :
      return action.message;
  default:
      return state;
  }
}

export default success;
