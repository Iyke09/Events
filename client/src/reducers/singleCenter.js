function singleCenter(state = {}, action) {
  switch(action.type) {
    case 'SET_SINGLE' :
      return action.response.center;
  default:
      return state;
  }
}

export default singleCenter;
