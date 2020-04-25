import React, { Fragment, useEffect } from 'react';
import { Button, PageHeader, Pagination, Spin, Timeline, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import { ClockCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment-timezone';
import * as PostActions from '../../redux/actions/PostActions';
import * as RoutesName from '../../constants/RoutesName';
import '../../assets/scss/pages/home.scss';
import { FORMAT_DATE, TIME_ZONE } from '../../configs/App';
import { POST_STATUS, POST_TYPES } from '../../redux/constants/PostConstants';
import ImageContent from './components/ImageContent';

moment.tz.setDefault(TIME_ZONE);

const mapStateToProps = (state) => ({
  loading: state.post.loading,
  listPosts: state.post.listPosts,
  total: state.post.total,
  filters: state.post.filters,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...PostActions
  }, dispatch)
});

const renderPostContent = (post) => {
  switch (post.type) {
    case POST_TYPES.IMAGE:
      return <ImageContent images={post.images} />;
    case POST_TYPES.VIDEO:
    case POST_TYPES.STICKER:
    case POST_TYPES.COUPON:
    case POST_TYPES.LINK:
    case POST_TYPES.SURVEY:
      return <div>Not available</div>;
    default:
      return <div>Post type not available</div>;
  }
};

function Home(props) {
  const history = useHistory();
  useEffect(() => {
    document.title = 'Timeline';
    window.scrollTo(0, 0);
    props.actions.getListPosts();
  }, []);

  return (
    <Fragment>
      <PageHeader
        ghost={false}
        title="Timeline"
        extra={[
          <Button
            key="btn-create"
            onClick={() => history.push(RoutesName.POST_CREATE)}
            className="btn-success"
          >
            Add post
          </Button>,
        ]}
      />
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        {props.loading.list ?
          <Spin />
          :
          <Fragment>
            <Timeline className="posts-timeline" mode="left">
              {
                props.listPosts.map((post) => {
                  if (post.scheduledTime) {
                    return (
                      <Timeline.Item
                        key={post.id}
                        color="red"
                        dot={<ClockCircleOutlined />}
                        label={
                          <Tooltip title="Edit post">
                            <Button
                              type="link"
                              onClick={() => history.push(RoutesName.POST_UPDATE.replace(':id', post.id))}
                            >
                              {moment(post.scheduledTime).format(FORMAT_DATE)}
                            </Button>
                          </Tooltip>
                        }
                      >
                        {renderPostContent(post)}
                      </Timeline.Item>
                    );
                  }
                  return (
                    <Timeline.Item
                      key={post.id}
                      color={post.status === POST_STATUS.PUBLISHED ? '#00b900' : 'grey'}
                      label={
                        <Tooltip title="Edit post">
                          <Button
                            type="link"
                            onClick={() => history.push(RoutesName.POST_UPDATE.replace(':id', post.id))}
                          >
                            {moment(post.createdAt).format(FORMAT_DATE)}
                          </Button>
                        </Tooltip>
                      }
                    >
                      {renderPostContent(post)}
                    </Timeline.Item>
                  );
                })
              }
            </Timeline>
            {(props.total / props.filters.limit) > 1 && <Pagination
              simple
              onChange={(page) => props.actions.setPostFilters({ page })}
              pageSize={props.filters.limit}
              defaultCurrent={props.filters.page}
              total={props.total}
            />}
          </Fragment>
        }
      </div>
    </Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
