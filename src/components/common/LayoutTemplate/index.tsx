// 内置组件
import Sider from './Sider';
import PageContent from './PageContent';
// 样式组件
import { LayoutTemplateStyled } from './style';

export default function LayoutTemplate() {
	return (
		<LayoutTemplateStyled>
			<div className="box">
				<Sider />
				<PageContent />
			</div>
		</LayoutTemplateStyled>
	);
}
