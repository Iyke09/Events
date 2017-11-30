function message(state = {error: '', success: false}, action) {
  switch(action.type) {
    case 'ERROR' :
      return {...state, error: action.error}
    case 'SUCCESS' :
      return {...state, success: true};
    case '!SUCCESS' :
      return {...state, suucess: false};
  default:
      return state;
  }
}

export default message;
