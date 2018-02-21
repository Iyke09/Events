export function signup(payload) {
  return {
    type: 'SIGN_UP',
    payload
  };
}

export function signin(payload) {
  return {
    type: 'SIGN_IN',
    payload
  };
}

export function changePassword(payload) {
  return {
    type: 'CHANGE_PASSWORD',
    payload
  };
}

export function loaders() {
  return {
    type: 'LOAD',
  };
}

export function errorAction(error) {
  return {
    type: 'ERROR',
    error
  };
}

export function getCenters(index) {
  return {
    type: 'GET_ALL',
    index
  };
}

export function retrieve(email) {
  return {
    type: 'RETRIEVE',
    email
  };
}

export function updateEvent(payload,index) {
  return {
    type: 'UPDATE_EVENT',
    payload,
    index
  };
}


export function getSingle(index) {
  return {
    type: 'GET_SINGLE',
    index
  };
}

export function getSingleEvents(index) {
  return {
    type: 'GET_SINGLE_EVENT',
    index
  };
}

export function getEvents() {
  return {
    type: 'GET_EVENTS',
  };
}

export function addCenter(payload) {
  return {
    type: 'ADD_CENTER',
    payload
  };
}

export function updateCenter(payload, index) {
  return {
    type: 'UPDATE_CENTER',
    payload,
    index
  };
}

export function addEvent(payload) {
  return {
    type: 'ADD_EVENT',
    payload
  };
}

export function deleteEvent(index) {
  return {
    type: 'DELETE_EVENT',
    index
  };
}


