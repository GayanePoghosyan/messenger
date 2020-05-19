import {
  GET_USERS_REQUEST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS
} from "../actions/users";
import {NotificationManager} from "react-notifications";

const initialState = {
  token: localStorage.getItem('token') || '',
  requestStatus:'',
  list:[],
  errors:[],
};
export default function reducer(state = initialState, action) {


  switch (action.type) {

    case USER_LOGIN_SUCCESS: {

      const { token ,account} = action.payload.data;
      localStorage.setItem('token', token);
      localStorage.setItem("account",JSON.stringify(account));
      return {
        ...state,
        token,
      }
    }
    case USER_LOGIN_FAIL: {
      localStorage.removeItem('token');
      NotificationManager.error("Error",action.error);
      return {
        ...state,
        token: '',
        errors:action.error
      }
    }
    case GET_USERS_REQUEST_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        requestStatus: 'ok',
        list:data
      }
    }
    default: {
      return state
    }
  }
}
