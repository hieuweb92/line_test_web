import { all } from 'redux-saga/effects';
import { postSaga } from './PostSaga';

function * rootSaga() {
  yield all([
    postSaga()
  ]);
}

export default rootSaga;
