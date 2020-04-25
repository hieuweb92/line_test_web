import { Request } from '../helpers/Request';
import { API_ENDPOINT } from '../configs/App';

export async function getListPosts(filters) {
  return await Request.get(`${API_ENDPOINT}post/list`, filters);
}

export async function getPostDetail(postId) {
  return await Request.get(`${API_ENDPOINT}post/detail`, { id: postId });
}

export async function savePost(postData) {
  let api = `${API_ENDPOINT}post/create`;
  if (postData.id) {
    api = `${API_ENDPOINT}post/update`;
  }
  return await Request.post(api, postData);
}
