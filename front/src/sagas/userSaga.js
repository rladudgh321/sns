import { 
  LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
 } from '@/reducer/user';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';

function loginAPI() {
  return axios.post('/login');
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
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    })
  }
}

function logoutAPI() {
  return axios.post('/logout');
}

function* logout() {
  yield delay(1000);
  // yield call(logoutAPI);
  try {
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    })
  }
}

function signupAPI(data) {
  return axios.post('/signup');
}

function* signup(action) {
  yield delay(1000);
  // yield call(signupAPI, action.data);
  try {
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
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

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup)
}

function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
  ])
}

export default userSaga;