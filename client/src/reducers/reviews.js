// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of current state

function reviews(state = [], action) {
  switch(action.type) {
    case 'GET_REVIEWS' :
      return action.response.review;
    case 'SET_REVIEW' :
      if(state.length > 2){
        state.pop();
        return  [action.response.review, ...state];
      }
      return  [action.response.review, ...state];
  default:
      return state;
  }
}

export default reviews;
