import * as PostConstants from '../constants/PostConstants';

const initialState = {
  gotoList: false,
  loading: {
    list: false,
    detail: false,
    save: false
  },
  filters: {
    page: 1,
    limit: 2
  },
  listPosts: [],
  postDetail: null,
  total: 0
};

const PostReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PostConstants.SET_GOTO_LIST_POSTS:
      return {
        ...state,
        gotoList: payload.value
      };
    case PostConstants.SET_POST_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          ...payload.loading
        }
      };
    case PostConstants.SET_POST_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...payload.filter
        }
      };
    case PostConstants.SET_LIST_POSTS:
      return {
        ...state,
        listPosts: payload.listPosts,
        total: payload.total
      };
    case PostConstants.SET_POST_DETAIL:
      return {
        ...state,
        postDetail: payload.postDetail
      };
    case PostConstants.CHANGE_POST_DETAIL:
      return {
        ...state,
        postDetail: {
          ...state.postDetail,
          ...payload.data
        }
      };
    default:
      return state;
  }
};

export default PostReducer;
