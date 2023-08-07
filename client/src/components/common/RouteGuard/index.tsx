import { I_Route } from "@/def_types/route";

// React & React 路由
import { Suspense } from "react";
import {
  Switch,
  Route,
  useLocation,
  Redirect,
  matchPath,
} from "react-router-dom";

// 工具函数 & 用户状态
import { localStorage } from "@/utils";
import { defaultUserState } from "@/store";

// 登录页 路径
const loginURL = "/settings";

interface RouteGuradProps {
  routes: I_Route[];
}
// 路由守卫 V5
export default function RouteGuard({ routes }: RouteGuradProps) {
  // 当前用户
  const user = localStorage.get("user", defaultUserState);
  // 当前路径
  const { pathname } = useLocation();

  // 匹配路由
  let matchRoute = routes.find(({ path }) => {
    const match = matchPath(pathname, { path, exact: true });

    return match?.isExact;
  }) as I_Route;

  // 路由需要登陆 && 但用户未登录
  if (matchRoute.auth && !Boolean(user.token)) {
    return (
      <Redirect
        to={{
          pathname: loginURL,
          state: { redirectURL: pathname },
        }}
      />
    );
  }

  // 路由需要权限 && 但用户没有指定权限
  if (!matchRoute.role.includes(user.role)) {
    return (
      <Redirect
        to={{
          pathname: loginURL,
          state: { redirectURL: pathname },
        }}
      />
    );
  }

  return (
    <Switch>
      {routes.map((route, idx) => (
        <Route
          key={idx}
          exact={route.exact}
          path={route.path}
          render={() => {
            const Component = route.component;
            // @TODO: before mound page
            return (
              <Suspense fallback={route.fallback}>
                <Component />
              </Suspense>
            );
          }}
        />
      ))}
    </Switch>
  );
}
