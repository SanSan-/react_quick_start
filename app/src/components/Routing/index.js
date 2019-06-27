import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../Layout';
import Roster from '../Roster';

export const routes = [
  {
    path: '/',
    component: Layout
  },
  {
    path: '/roster',
    component: Roster
  },
  {
    path: '/schedule',
    component: Layout
  }
];

const Routing = () =>
  <Switch>
    {/* eslint-disable-next-line react/jsx-key */}
    {routes.map(({ path, component }) => <Route exact key={path} path={path}
      component={component}/>)}
    <Route component={Layout}/>
  </Switch>;

export default Routing;
