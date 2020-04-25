import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router';
import * as RoutesName from '../../constants/RoutesName';

function Page404() {
  const history = useHistory();

  const goHome = () => {
    history.push(RoutesName.HOME);
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button className="btn-sucess" size="large" onClick={goHome} type="primary">
          GO HOME
        </Button>
      }
    />
  );
}

export default Page404;
