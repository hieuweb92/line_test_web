import React from 'react';
import { Empty } from 'antd';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { CDN_ENDPOINT } from '../../../configs/App';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ImageContent(props) {
  if (props.images && props.images.length) {
    const sliderProps = {
      className: 'slider-images',
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Slider {...sliderProps}>
        {
          props.images.map(image => (
            <div key={image.id} className="image-item">
              <img src={`${CDN_ENDPOINT}/${image.original}`} alt="" />
            </div>
          ))
        }
      </Slider>
    );
  }
  return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);
}

ImageContent.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ImageContent;
