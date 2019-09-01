// import Home from './Home';

// import loadData from './helpers/loadData';
import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";

import Loading from "@/component/loading"

export const RoutesArray = [
  {
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import("@/page/Hello"),
      loading: () => <Loading />,
    }),
  },
  {
    path: '/home',
    component: Loadable({
      loader: () => import("@/page/Home/Home"),
      loading: () => <Loading />,
    }),
  },
  {
    path: '/about',
    component: Loadable({
      loader: () => import("@/page/About"),
      loading: () => <Loading />,
    }),
  }
];

export const SetRoute = () => (
  <div>
    <Switch>
      {RoutesArray.map((route, index) => {
        if (route.component) {
          return <Route key={index} path={route.path} exact={route.exact} component={route.component} />
        }
      })}
    </Switch>
  </div>
)
