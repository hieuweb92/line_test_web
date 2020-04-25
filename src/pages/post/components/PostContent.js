import React from 'react';
import PropTypes from 'prop-types';
import { POST_TYPES } from '../../../redux/constants/PostConstants';
import PostImages from './PostImages';

function PostContent(props) {
  switch (props.postType) {
    case POST_TYPES.IMAGE:
      return <PostImages />;
    case POST_TYPES.VIDEO:
    case POST_TYPES.STICKER:
    case POST_TYPES.COUPON:
    case POST_TYPES.LINK:
    case POST_TYPES.SURVEY:
      return <div>Not available</div>;
    default:
      return <div />;
  }
}

PostContent.propTypes = {
  postType: PropTypes.string.isRequired
};

export default React.memo(PostContent);
