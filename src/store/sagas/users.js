import { takeLatest, put, call } from 'redux-saga/effects';
import Api from '../../Api';
import {
GET_USERS_REQUEST, GET_USERS_REQUEST_FAIL, GET_USERS_REQUEST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS
} from "../actions/users";


export default function* watcher() {
  yield takeLatest(USER_LOGIN_REQUEST, handleCheck);
  yield takeLatest(GET_USERS_REQUEST, getList);
}


function* handleCheck(action) {
  try {

    const { email, password } = action.payload;
    const { data } = yield call(Api.login, email, password);
    yield put({
      type: USER_LOGIN_SUCCESS,
      payload: { data }
    })
  } catch (e) {

    yield put({
      type: USER_LOGIN_FAIL,
      message: e.message,
      error: e.response.data.error,
    })
  }
}



function* getList() {
  try {
    const { data } = yield call(Api.getUsers);
    yield put({
      type: GET_USERS_REQUEST_SUCCESS,
      payload: data
    })
  } catch (e) {
    yield put({
      type: GET_USERS_REQUEST_FAIL,
      payload: e.response.message
    })
  }


}
