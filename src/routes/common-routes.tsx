import { I_Route } from '@/def_types/route';

import { lazy } from 'react';
import { CommonLoadingSkeleton } from '@/components/skeleton';
import { role } from '@/utils';

const commonRoutes: I_Route[] = [
	{
		path: '/',
		component: lazy(() => import('@/pages/common/HomePage')),
		fallback: <CommonLoadingSkeleton />,
		auth: false,
		role: role.all(),
		title: 'Playground',
		exact: true,
	},

	{
		path: '/games',
		component: lazy(() => import('@/pages/common/GamesPage')),
		fallback: <CommonLoadingSkeleton />,
		auth: false,
		role: role.all(),
		title: 'Games · Play',
		exact: true,
	},

	{
		path: '/settings',
		component: lazy(() => import('@/pages/common/SettingsPage')),
		fallback: <CommonLoadingSkeleton />,
		auth: false,
		role: role.all(),
		title: 'Settings · Play',
		exact: true,
	},

	{
		path: '*',
		component: lazy(() => import('@/pages/common/PageNotFoundPage')),
		fallback: <CommonLoadingSkeleton />,
		auth: false,
		role: role.all(),
		title: '404 · Play',
		exact: false,
	},
];

export default commonRoutes;
