// 内置组件
import Sider from './Sider';
import PageContent from './PageContent';

// Scoped style
import classes from './style.module.scss';

export default function LayoutTemplate() {
	return (
		<div className={classes.layout}>
			<div className="box">
				<Sider />
				<PageContent />
			</div>
		</div>
	);
}
