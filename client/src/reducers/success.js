function message(state = false, action) {
  switch(action.type) {
    case 'SUCCESS' :
      return  true;
    case '!SUCCESS' :
      return false;
  default:
      return state;
  }
}

export default message;
