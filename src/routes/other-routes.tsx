import { I_Route } from '@/def_types/route';

import { lazy } from 'react';
import { CommonLoadingSkeleton } from '@/components/skeleton';
import { role } from '@/utils';

const otherRoutes: I_Route[] = [
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

export default otherRoutes;
