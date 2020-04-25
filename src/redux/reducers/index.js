import { combineReducers } from 'redux';
import PostReducer from './PostReducer';

const appReducer = combineReducers({
  post: PostReducer
});

const reducer = (state, action) => {
  // if (action.type === 'LOGOUT') {
  //   return appReducer(undefined, action);
  // }
  return appReducer(state, action);
};

export default reducer;
