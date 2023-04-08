// 组件
import { RouteGuard } from '@/components/common';

// Scoped style
import classes from './style.module.scss';

// 路由表
import routes from '@/routes';

export default function PageContent() {
	return (
		<div className={classes.pageContent}>
			<RouteGuard routes={routes} />
		</div>
	);
}
