function single(state = [], action) {
  switch(action.type) {
    case 'SET_SINGLE' :
    console.log(action.response.center[0]);
      return action.response.center[0];
  default:
      return state;
  }
}

export default single;
