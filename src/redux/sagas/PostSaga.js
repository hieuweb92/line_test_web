import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import * as PostActions from '../actions/PostActions';
import { getListPosts, getPostDetail, savePost } from '../../services/PostService';
import * as PostConstants from '../constants/PostConstants';

function * watchGetListPostsAction({ payload }) {
  const filters = payload?.filters || (yield select((state) => state.post.filters));
  yield put(PostActions.setLoading({ list: true }));
  const response = yield call(getListPosts, filters);
  const { resultCode, resultData, errorMessage } = response;
  if (resultCode) {
    yield put(PostActions.setListPosts({
      listPosts: resultData.data,
      total: resultData.total
    }));
  } else {
    message.error(errorMessage);
  }
  yield put(PostActions.setLoading({ list: false }));
}

function * watchSetPostFiltersAction() {
  yield delay(500);
  yield put(PostActions.getListPosts());
}

function * watchGetPostDetailAction({ payload }) {
  yield put(PostActions.setLoading({ detail: true }));
  const response = yield call(getPostDetail, payload.postId);
  const { resultCode, resultData, errorMessage } = response;
  if (resultCode) {
    yield put(PostActions.setPostDetail(resultData));
  } else {
    message.error(errorMessage);
    yield put(PostActions.setGotoList(true));
  }
  yield put(PostActions.setLoading({ detail: false }));
}

function * watchSavePostAction({ payload }) {
  yield put(PostActions.setLoading({ save: true }));
  const response = yield call(savePost, payload.postData);
  const { resultCode, errorMessage } = response;
  if (resultCode) {
    yield put(PostActions.setGotoList(true));
    message.success(errorMessage);
  } else {
    message.error(errorMessage);
  }
  yield put(PostActions.setLoading({ save: false }));
}

export function * postSaga() {
  yield takeLatest(
    PostConstants.GET_LIST_POSTS,
    watchGetListPostsAction
  );
  yield takeLatest(
    PostConstants.SET_POST_FILTERS,
    watchSetPostFiltersAction
  );
  yield takeLatest(
    PostConstants.GET_POST_DETAIL,
    watchGetPostDetailAction
  );
  yield takeLatest(
    PostConstants.SAVE_POST,
    watchSavePostAction
  );
}
