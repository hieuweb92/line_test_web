export const POST_TYPES = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  STICKER: 'STICKER',
  COUPON: 'COUPON',
  LINK: 'LINK',
  SURVEY: 'SURVEY'
};

export const POST_STATUS = {
  DRAFTED: 'DRAFTED',
  PUBLISHED: 'PUBLISHED',
};

export const POST_INTERFACE = {
  id: null,
  type: '',
  status: '',
  scheduledTime: null,
  images: [],
  video: null,
  sticker: null,
  coupon: null,
  survey: null,
  link: null,
  createdAt: null,
  updatedAt: null
};

export const SET_GOTO_LIST_POSTS = 'SET_GOTO_LIST_POSTS';
export const SET_POST_LOADING = 'SET_POST_LOADING';
export const GET_LIST_POSTS = 'GET_LIST_POSTS';
export const SET_LIST_POSTS = 'SET_LIST_POSTS';
export const SET_POST_FILTERS = 'SET_POST_FILTERS';
export const GET_POST_DETAIL = 'GET_POST_DETAIL';
export const SET_POST_DETAIL = 'SET_POST_DETAIL';
export const CHANGE_POST_DETAIL = 'CHANGE_POST_DETAIL';
export const SAVE_POST = 'SAVE_POST';
