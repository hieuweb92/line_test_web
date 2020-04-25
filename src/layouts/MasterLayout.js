import React from 'react';
import PropTypes from 'prop-types';
import { BackTop, Layout } from 'antd';

const { Header, Content, Footer } = Layout;

function MasterLayout(props) {
  return (
    <Layout className="main-wrapper">
      <BackTop />
      <Header />
      <Content className="container">
        {props.children}
      </Content>
      <Footer />
    </Layout>
  );
}

MasterLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default MasterLayout;
