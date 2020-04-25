import React, { Fragment, useEffect } from 'react';
import { Button, PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';
import * as RoutesName from '../../constants/RoutesName';

function Home() {
  const history = useHistory();
  useEffect(() => {
    document.title = 'Timeline';
    window.scrollTo(0, 0);
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
    </Fragment>
  );
}

export default Home;
