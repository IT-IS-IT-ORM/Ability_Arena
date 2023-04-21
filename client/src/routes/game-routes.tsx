import { I_Route } from '@/def_types/route';

import { lazy } from 'react';
import { CommonLoadingSkeleton } from '@/components/skeleton';
import { role } from '@/utils';

const gameRoutes: I_Route[] = [
	{
		path: '/games/liar-card',
		component: lazy(() => import('@/pages/game/LiarCard')),
		fallback: <CommonLoadingSkeleton />,
		auth: false,
		role: role.all(),
		title: 'Playground',
		exact: true,
	},
];

export default gameRoutes;
