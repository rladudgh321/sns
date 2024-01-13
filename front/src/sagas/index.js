import { all, fork } from 'redux-saga/effects';
import userSaga from './userSaga';
import postSaga from './postSaga';

function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
  ])
}

export default rootSaga;