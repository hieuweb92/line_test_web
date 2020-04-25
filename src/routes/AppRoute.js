import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as RoutesName from '../constants/RoutesName';
import Home from '../pages/home';
import MasterLayout from '../layouts/MasterLayout';
import PostCreate from '../pages/post/PostCreate';
import PostUpdate from '../pages/post/PostUpdate';
import Page404 from '../pages/errors/404';

function AppRoute() {
  return (
    <MasterLayout>
      <Switch>
        <Route exact path={RoutesName.HOME} component={Home} />
        <Route exact path={RoutesName.POST_CREATE} component={PostCreate} />
        <Route exact path={RoutesName.POST_UPDATE} component={PostUpdate} />
        <Route exact path={RoutesName.ERROR_404} component={Page404} />
      </Switch>
    </MasterLayout>
  );
}

export default AppRoute;
