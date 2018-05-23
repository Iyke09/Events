// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of current state

function centers(state = {center: [], singleCenter: {}}, action) {
  // console.log('from saga middleware events', action.response);
  switch(action.type) {
    case 'GET_CENTER' :
      return {center: action.response.centers, singleCenter: state.singleCenter};
    case 'SET_CENTER' :
      return {center: [...state.center, action.response.center], singleCenter: state.singleCenter};
    case 'SET_SINGLE' :
      return {center: state.center, singleCenter: action.response.center};
  default:
      return state;
  }
}

export default centers;
