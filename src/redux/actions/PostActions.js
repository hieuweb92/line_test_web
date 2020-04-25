import * as PostConstants from '../constants/PostConstants';

export const setGotoList = (value) => ({
  type: PostConstants.SET_GOTO_LIST_POSTS,
  payload: { value }
});

export const setLoading = (loading) => ({
  type: PostConstants.SET_POST_LOADING,
  payload: { loading }
});

export const setPostFilters = (filter) => ({
  type: PostConstants.SET_POST_FILTERS,
  payload: { filter }
});

export const getListPosts = (filters = null) => ({
  type: PostConstants.GET_LIST_POSTS,
  payload: { filters }
});

export const setListPosts = ({ listPosts, total }) => ({
  type: PostConstants.SET_LIST_POSTS,
  payload: {
    listPosts,
    total
  }
});

export const getPostDetail = (postId) => ({
  type: PostConstants.GET_POST_DETAIL,
  payload: { postId }
});

export const setPostDetail = (postDetail) => ({
  type: PostConstants.SET_POST_DETAIL,
  payload: { postDetail }
});

export const changePostDetail = (data) => ({
  type: PostConstants.CHANGE_POST_DETAIL,
  payload: { data }
});

export const savePost = (postData) => ({
  type: PostConstants.SAVE_POST,
  payload: { postData }
});
