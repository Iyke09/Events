// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of current state

function centers(state = [], action) {
  switch(action.type) {
    case 'GET_CENTER' :
      console.log(action.response);
      return action.response.center;
    case 'SET_CENTER' :
      return [...state, action.response.center];
  default:
      return state;
  }
}

export default centers;
