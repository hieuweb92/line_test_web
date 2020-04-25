import React from 'react';
import moment from 'moment-timezone';
import { Badge, DatePicker, Space } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FORMAT_DATE, TIME_ZONE } from '../../../configs/App';
import * as PostActions from '../../../redux/actions/PostActions';

moment.tz.setDefault(TIME_ZONE);

const mapStateToProps = (state) => ({
  postDetail: state.post.postDetail,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...PostActions
  }, dispatch)
});

function DateTimePicker(props) {
  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

  const disabledTime = (current) => {
    if (current) {
      let currentHours = Number(current.format('HH'));
      let currentMinutes = Number(current.format('mm'));
      let nowHours = Number(moment().format('HH'));
      let days = current.diff(moment().startOf('day'), 'days');
      return {
        disabledHours: () => days < 1 && [...Array(24).keys()].splice(0, nowHours),
        disabledMinutes: () => (days < 1 && currentHours === nowHours)
          && [...Array(59).keys()].splice(0, currentMinutes),
      };
    }
  };

  const onChange = (value) => {
    if (value) {
      props.actions.changePostDetail({ scheduledTime: Number(value.format('x')) });
    } else {
      props.actions.changePostDetail({ scheduledTime: null });
    }
  };

  return (
    <Space className="picker-container">
      <DatePicker
        value={props.postDetail?.scheduledTime ? moment(props.postDetail.scheduledTime) : null}
        disabled={props.disabled}
        placeholder=""
        format={FORMAT_DATE}
        disabledDate={disabledDate}
        disabledTime={disabledTime}
        showTime={{ defaultValue: moment() }}
        allowClear={false}
        onChange={onChange}
      />
      <Badge>{TIME_ZONE}</Badge>
    </Space>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DateTimePicker);
