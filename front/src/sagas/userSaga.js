import { 
  LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
 } from '@/reducer/user';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';

function loginAPI() {
  return axios.post('/login');
}

function logoutAPI() {
  return axios.post('/logout');
}

function* login(action) {
  yield delay(1000);
  // yield call(logoutAPI, action.data);
  try {
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    })
  }
}

function* logout() {
  yield delay(1000);
  // yield call(logoutAPI);
  try {
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout)
}

function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
  ])
}

export default userSaga;