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

export function getCenters(index) {
  return {
    type: 'GET_ALL',
    index
  };
}

export function updateCenter(payload, index) {
  return {
    type: 'UPDATE_CENTER',
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

export function addCenter(payload) {
  return {
    type: 'ADD_CENTER',
    payload
  };
}

