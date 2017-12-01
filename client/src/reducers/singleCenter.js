function singleCenter(state = {}, action) {
  switch(action.type) {
    case 'SET_SINGLE' :
    console.log(action.response.center);
      return action.response.center;
  default:
      return state;
  }
}

export default singleCenter;
