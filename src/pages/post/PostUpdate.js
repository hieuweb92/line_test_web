import React, { Fragment, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { PageHeader } from 'antd';
import PostFrom from './components/PostForm';
import '../../assets/scss/pages/post.scss';

function PostUpdate() {
  const match = useRouteMatch();
  useEffect(() => {
    document.title = 'Timeline post update';
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <PageHeader ghost={false} title="Timeline post" />
      <PostFrom postId={Number(match.params.id)} />
    </Fragment>
  );
}

export default PostUpdate;
