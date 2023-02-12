// 组件
import { RouteGuard } from '@/components/common';
// 样式组件
import { PageContentStyled } from './style';

// 路由表
import routes from '@/routes';

export default function PageContent() {
	return (
		<PageContentStyled>
			<RouteGuard routes={routes} />
		</PageContentStyled>
	);
}
