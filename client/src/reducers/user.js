import { browserHistory } from 'react-router';

function users(state = [], action) {
  switch(action.type) {
    case 'INCOMING_TOKEN' :
      console.log(action.response);
       localStorage.setItem('token', action.response.token);
      return '';
    case 'REDIRECT' :
      browserHistory.push('/');
      return '';
    default:
      return state;
  }
}

export default users;
