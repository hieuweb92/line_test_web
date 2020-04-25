import React, { Fragment, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { PageHeader } from 'antd';
import PostFrom from './components/PostForm';
import '../../assets/scss/pages/post.scss';


function PostUpdate() {
  const match = useRouteMatch();
  const history = useHistory();
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
