export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';

export function userLoginRequest(email, password) {
  return {
    type: USER_LOGIN_REQUEST,
    payload: {
      email, password
    }
  }
}


export const GET_USERS_REQUEST='GET_USERS_REQUEST';
export const GET_USERS_REQUEST_SUCCESS='GET_USERS_REQUEST_SUCCESS';
export const GET_USERS_REQUEST_FAIL='GET_USERS_REQUEST_FAIL';

  export function getUsers(){
  return {
    type: GET_USERS_REQUEST,
    payload: {}
  }

}