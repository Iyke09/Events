function Notification(state = {error: '', loader: false, success: false}, action) {
  switch(action.type) {
    case 'ERROR' :
      return  {error: action.error, loader: state.loader, success: state.success};
    case 'LOAD' :
      return {error: state.error, loader: true, success: state.success};
    case 'UNLOAD' :
      return {error: state.error, loader: false, success: state.success};
    case 'SUCCESS' :
      return  {error: state.error, loader: state.loader, success: true};
    case '!SUCCESS' :
      return {error: state.error, loader: state.loader, success: false};
  default:
      return state;
  }
}

export default Notification;
