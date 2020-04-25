import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Radio, Spin } from 'antd';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DateTimePicker from './DateTimePicker';
import PostTypeSelect from './PostTypeSelect';
import PostContent from './PostContent';
import * as PostActions from '../../../redux/actions/PostActions';
import * as RoutesName from '../../../constants/RoutesName';
import { POST_INTERFACE, POST_STATUS, POST_TYPES } from '../../../redux/constants/PostConstants';
import { TIME_ZONE } from '../../../configs/App';

moment.tz.setDefault(TIME_ZONE);

const mapStateToProps = (state) => ({
  loading: state.post.loading,
  postDetail: state.post.postDetail,
  gotoList: state.post.gotoList,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...PostActions
  }, dispatch)
});

function PostFrom(props) {
  const history = useHistory();
  const [form] = Form.useForm();
  const [allowPublish, setAllowPublish] = useState(false);
  const [publishNow, setPublishNow] = useState(1);

  useEffect(() => {
    if (props.gotoList) {
      history.push(RoutesName.HOME);
    }
  }, [props.gotoList]);

  useEffect(() => {
    props.actions.setPostDetail(POST_INTERFACE);
    if (props.postId) {
      props.actions.getPostDetail(props.postId);
    }
    return () => {
      props.actions.setGotoList(false);
      props.actions.setPostDetail(null);
    };
  }, []);

  useEffect(() => {
    if (props.postDetail) {
      setPublishNow(props.postDetail.scheduledTime ? 0 : 1);
    }
  }, [props.postDetail]);

  useEffect(() => {
    if (publishNow) {
      props.actions.changePostDetail({ scheduledTime: null });
    }
  }, [publishNow]);

  useEffect(() => {
    const { postDetail } = props;
    if (postDetail) {
      let conditionOne = !!publishNow;
      if (!publishNow && props.postDetail.scheduledTime) {
        conditionOne = true;
      }
      let conditionTwo = false;
      switch (postDetail.type) {
        case POST_TYPES.IMAGE:
          conditionTwo = !!postDetail.images.length;
          break;
        case POST_TYPES.VIDEO:
          conditionTwo = !!postDetail.video;
          break;
        case POST_TYPES.STICKER:
          conditionTwo = !!postDetail.sticker;
          break;
        case POST_TYPES.COUPON:
          conditionTwo = !!postDetail.coupon;
          break;
        case POST_TYPES.LINK:
          conditionTwo = !!postDetail.link;
          break;
        case POST_TYPES.SURVEY:
          conditionTwo = !!postDetail.survey;
          break;
      }
      setAllowPublish(conditionOne && conditionTwo);
    }
  }, [props.postDetail, publishNow]);

  const onSubmit = (postStatus) => {
    const now = Number(moment().format('x'));
    let postData = {
      ...props.postDetail,
      status: postStatus,
      updatedAt: now
    };
    if (!props.postDetail.id) {
      postData.createdAt = now;
    }
    props.actions.savePost(postData);
  };

  return (
    <Spin spinning={props.loading.detail || props.loading.save}>
      <Form
        className="post-form"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        gutter={20}
      >
        <div className="form-actions">
          <Button
            className="btn-grey"
            onClick={() => onSubmit(POST_STATUS.DRAFTED)}
          >
            Save draft
          </Button>
          <Button
            disabled={!allowPublish}
            className="btn-success"
            onClick={() => onSubmit(POST_STATUS.PUBLISHED)}
          >
            {publishNow ? 'Submit' : 'Schedule'}
          </Button>
        </div>
        <Form.Item className="publish-type" label="Publish date">
          <Radio.Group
            value={publishNow}
            onChange={(e) => setPublishNow(e.target.value)}
          >
            <Radio className="radio-block" value={1}>
              Publish now
            </Radio>
            <Radio value={0} />
            <DateTimePicker disabled={!!publishNow} />
          </Radio.Group>
        </Form.Item>
        <Divider />
        <div className="panel post-content">
          <div className="panel-heading">
            <PostTypeSelect value={props.postDetail?.type} />
          </div>
          <div className="panel-body">
            <PostContent postType={props.postDetail?.type || ''} />
          </div>
        </div>
        <div className="form-footer">
          <Button
            size="large"
            className="btn-grey"
            onClick={() => history.goBack(-1)}
          >
            Back
          </Button>
          <Button
            size="large"
            disabled={!allowPublish}
            className="btn-success"
            loading={props.loading.save}
            onClick={() => onSubmit(POST_STATUS.PUBLISHED)}
          >
            {publishNow ? 'Submit' : 'Schedule'}
          </Button>
        </div>
      </Form>
    </Spin>
  );
}

PostFrom.propTypes = {
  postId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostFrom);
