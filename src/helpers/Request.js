import axios from 'axios';

const failure = (error) => (
  error.request.response ? JSON.parse(error.request.response) : {
    resultCode: 0,
    resultData: null,
    errorDisplay: true,
    errorMessage: error.message
  }
);

export const Request = {
  post: (url, body = {}, config = {}) => (
    axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json'
      },
      ...config
    })
      .then((response) => (response.data))
      .catch((error) => failure(error))
  ),
  get: (url, params = {}) => (
    axios.get(url, { params })
      .then((response) => (response.data))
      .catch((error) => failure(error))
  ),
  postWithAuth: (url, body = {}, config = {}) => (
    axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      ...config
    })
      .then((response) => (response.data))
      .catch((error) => failure(error))
  )
};
