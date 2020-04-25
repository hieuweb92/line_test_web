import React, { Fragment, useEffect } from 'react';
import { PageHeader } from 'antd';
import PostFrom from './components/PostForm';
import '../../assets/scss/pages/post.scss';

function PostCreate() {
  useEffect(() => {
    document.title = 'Timeline post create';
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <PageHeader ghost={false} title="Timeline post" />
      <PostFrom />
    </Fragment>
  );
}

export default PostCreate;
