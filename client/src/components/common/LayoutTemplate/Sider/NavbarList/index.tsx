// React 路由
import { useHistory } from 'react-router-dom';

// 全局状态
import { useRecoilValue } from 'recoil';
import { S_UserIsAuthenticated } from '@/store';

// i18n
import { useTranslation } from 'react-i18next';

// 图标库
import { BiHomeSmile } from 'react-icons/bi';
import { GrGamepad } from 'react-icons/gr';
import { AiOutlineSetting } from 'react-icons/ai';
// 自定义组件
import { Button } from '@/components/common';

// Scoped style
import classes from './style.module.scss';

const navbarItems = [
	{
		to: '/',
		icon: <BiHomeSmile />,
		text: 'Navigator__home',
	},
	{
		to: '/games',
		icon: <GrGamepad />,
		text: 'Navigator__games',
	},
	{
		to: '/settings',
		icon: <AiOutlineSetting />,
		text: 'Navigator__settings',
	},
];

export default function NavbarList() {
	// i18n
	const { t } = useTranslation();
	// 路由变量
	const { push } = useHistory();
	// 是否授权
	const isAuthenticated = useRecoilValue(S_UserIsAuthenticated);

	// 按钮点击事件
	const handleNavItemClick = (targetPath: string) => {
		push(targetPath);
	};

	return (
		<ul className={classes.navbarList}>
			{navbarItems.map((item, idx) => (
				<li key={item.to} className={classes.navbarItem}>
					<Button onClick={() => handleNavItemClick(item.to)}>
						<>
							{item.icon}
							{t(item.text) as string}
						</>
					</Button>
				</li>
			))}
		</ul>
	);
}
