import { 
  ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
} from "@/reducer/post";
const { all, takeLatest, call, delay, put, fork } = require("redux-saga/effects");
import axios from 'axios';

function postCardAPI(data) {
  return axios.post('/', data);
}

function* postCard(action) {
  // yield call(postCardAPI, action.data);
  yield delay(1000);
  try {
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.post('/', data);
}

function* removePost(action) {
  // yield call(removePostAPI, action.data);
  yield delay(1000);
  try {
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post('/', data);
}

function* addComment(action) {
  // yield call(addCommentAPI, action.data);
  yield delay(1000);
  try {
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchPostCard() {
  yield takeLatest(ADD_POST_REQUEST, postCard);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* postSaga() {
  yield all([
    fork(watchPostCard),
    fork(watchRemovePost),
    fork(watchAddComment),
  ])
}

export default postSaga;