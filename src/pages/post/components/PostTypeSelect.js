import React from 'react';
import { Radio, Tooltip } from 'antd';
import {
  GiftOutlined,
  LinkOutlined,
  PictureOutlined,
  PlaySquareOutlined,
  ReconciliationOutlined,
  SmileOutlined
} from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PostConstants from '../../../redux/constants/PostConstants';
import * as PostActions from '../../../redux/actions/PostActions';

const mapStateToProps = (state) => ({
  postDetail: state.post.postDetail,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...PostActions
  }, dispatch)
});

function PostTypeSelect(props) {
  return (
    <Radio.Group
      className="post-type-select"
      value={props.value}
      onChange={(e) => props.actions.changePostDetail({ type: e.target.value })}
    >
      <Tooltip title="Image">
        <Radio.Button value={PostConstants.POST_TYPES.IMAGE}>
          <PictureOutlined />
        </Radio.Button>
      </Tooltip>
      <Tooltip title="Video">
        <Radio.Button value={PostConstants.POST_TYPES.VIDEO}>
          <PlaySquareOutlined />
        </Radio.Button>
      </Tooltip>
      <Tooltip title="Sticker">
        <Radio.Button value={PostConstants.POST_TYPES.STICKER}>
          <SmileOutlined />
        </Radio.Button>
      </Tooltip>
      <Tooltip title="Coupon">
        <Radio.Button value={PostConstants.POST_TYPES.COUPON}>
          <GiftOutlined />
        </Radio.Button>
      </Tooltip>
      <Tooltip title="Link">
        <Radio.Button value={PostConstants.POST_TYPES.LINK}>
          <LinkOutlined />
        </Radio.Button>
      </Tooltip>
      <Tooltip title="Survey">
        <Radio.Button value={PostConstants.POST_TYPES.SURVEY}>
          <ReconciliationOutlined />
        </Radio.Button>
      </Tooltip>
    </Radio.Group>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PostTypeSelect);
