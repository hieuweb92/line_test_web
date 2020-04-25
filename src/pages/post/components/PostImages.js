import React, { Fragment, useEffect, useState } from 'react';
import { Button, message, Modal, Spin, Upload } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { API_ENDPOINT, CDN_ENDPOINT } from '../../../configs/App';
import * as PostActions from '../../../redux/actions/PostActions';

const { Dragger } = Upload;

const mapStateToProps = (state) => ({
  postDetail: state.post.postDetail,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...PostActions
  }, dispatch)
});

function PostImages(props) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    return () => {
      props.actions.changePostDetail({ images: [] });
    };
  }, []);

  const onUpload = (res) => {
    if (res.file.status === 'uploading') {
      setUploadLoading(true);
    }
    if (res.file.status === 'done') {
      props.actions.changePostDetail({ images: [...props.postDetail.images, res.file.response.resultData] });
      setUploadLoading(false);
      setVisibleModal(false);
    }
    if (res.file.status === 'error') {
      message(res.file.response.errorMessage);
      setUploadLoading(false);
    }
  };

  const removeImage = (id) => {
    props.actions.changePostDetail({ images: props.postDetail.images.filter((image) => (image.id !== id)) });
  };

  return (
    <div className="post-images">
      {props.postDetail?.images?.length ?
        <div className="list-images">
          {
            props.postDetail?.images.map(image => (
              <div key={image.id} className="image-item">
                <Button onClick={() => removeImage(image.id)} className="btn-remove-image">
                  <CloseOutlined />
                </Button>
                <img src={`${CDN_ENDPOINT}/${image.thumb}`} alt="" />
              </div>
            ))
          }
          <div className="image-item">
            <Button
              type="link"
              className="upload-btn"
              onClick={() => setVisibleModal(true)}
            >
              <PlusOutlined />
            </Button>
          </div>
        </div>
        :
        <div className="upload-container">
          <Button
            type="link"
            className="upload-zone"
            onClick={() => setVisibleModal(true)}
          >
            <div className="upload-title">Upload photo</div>
            <div className="photo-icon" />
          </Button>
          <div className="upload-require">
            <div>Formats: JPG, JPEG, PNG</div>
            <div>File size: Up to 10 MB</div>
          </div>
        </div>}
      <Modal
        centered
        className="upload-photo-modal"
        title="Upload photo"
        visible={visibleModal}
        onCancel={() => setVisibleModal(false)}
        footer={[
          <Button
            key="cancel"
            className="btn-grey"
            onClick={() => setVisibleModal(false)}
          >
            Cancel
          </Button>
        ]}
      >
        <Dragger
          name="upload"
          accept="image/jpeg, image/png"
          showUploadList={false}
          action={`${API_ENDPOINT}upload/image`}
          onChange={onUpload}
        >
          {uploadLoading ?
            <Spin />
            :
            <Fragment>
              <p className="ant-upload-text">Drop your image here<br />or</p>
              <p className="ant-upload-browser">
                <span>Browser</span>
                <span><PlusOutlined /></span>
              </p>
            </Fragment>
          }
        </Dragger>
        <div className="upload-require">
          <div>Formats: JPG, JPEG, PNG</div>
          <div>File size: Up to 10 MB</div>
        </div>
      </Modal>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PostImages);
