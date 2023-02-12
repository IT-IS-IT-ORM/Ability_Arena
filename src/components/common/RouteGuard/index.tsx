import { I_Route } from '@/def_types/route';

// React & React 路由
import { Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
// 全局状态
import { useRecoilValue } from 'recoil';
import { A_User } from '@/store';

// 业务库
import { useTitle } from 'ahooks';

// 登录页 路径
const loginURL = '/login';

interface RouteGuradProps {
	routes: I_Route[];
}
// 路由守卫 V5
export default function RouteGuard({ routes }: RouteGuradProps) {
	// 当前用户
	const user = useRecoilValue(A_User);
	// 当前路径
	const { pathname } = useLocation();
	// 匹配路由
	let matchRoute =
		routes.find(({ path }) => path === pathname) ||
		(routes.find(({ path }) => path === '*') as I_Route);

	// 修改网页名称
	useTitle(matchRoute?.title || document.title);

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
