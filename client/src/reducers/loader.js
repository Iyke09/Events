// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of current state

function loader(state = false, action) {
  switch(action.type) {
    case 'LOAD' :
      console.log('loading.....');
      return true;
    case 'UNLOAD' :
      return false;
  default:
      return state;
  }
}

export default loader;
